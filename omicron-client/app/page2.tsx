"use client";

import { MessageType, RequestType } from "@/interface";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const senderRef = useRef<HTMLVideoElement | null>(null);
  const receiverRef = useRef<HTMLVideoElement | null>(null);

  const [started, setStarted] = useState(false);

  const pc1 = useRef<RTCPeerConnection | null>(null); // caller
  const pc2 = useRef<RTCPeerConnection | null>(null); // callee
  const ws = useRef<WebSocket | null>(null);
  const localStream = useRef<MediaStream | null>(null);

  // candidate buffering
  const pc1RemoteDescSet = useRef(false);
  const pc2RemoteDescSet = useRef(false);
  const pc1Pending = useRef<RTCIceCandidateInit[]>([]);
  const pc2Pending = useRef<RTCIceCandidateInit[]>([]);

  const iceConfig: RTCConfiguration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'}]}

  useEffect(() => {
    initSocket();

    return () => {
      cleanupPeer(pc1.current);
      cleanupPeer(pc2.current);
      ws.current?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getLocalStream() {
    if (localStream.current) return localStream.current;

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    localStream.current = stream;

    // Wait for ref
    while (!senderRef.current) {
      await new Promise((r) => setTimeout(r, 1));
    }
    senderRef.current.srcObject = stream;
    return stream;
  }

  function initSocket() {
    const socket = new WebSocket("ws://localhost:8080");
    ws.current = socket;

    socket.addEventListener("open", () => {
      // prewarm camera
      getLocalStream().catch(console.error);
    });

    socket.addEventListener("close", () => {
      // simple reconnect
      setTimeout(() => initSocket(), 1000);
    });

    socket.onmessage = async (e) => {
      const data = JSON.parse(e.data.toString());
      const type = data.type;
      if (!type) {
        console.log("message without type");
        return;
      }

      if (type === "SKIP") {
        console.log("partner skipped");
        handleNext();
        return;
      }

      if (type === MessageType.MATCHED) {
        // we got a match, prepare caller side (pc1) and add our local tracks
        addTracksToPc1();
        return;
      }

      if (type === MessageType.OFFER) {
        const offer = data.payload?.offer as RTCSessionDescriptionInit | undefined;
        if (offer) {
          console.log("offer received");
          initPc2AndAnswer(offer);
        }
        return;
      }

      if (type === MessageType.ANSWER) {
        const answer = data.payload?.answer as RTCSessionDescriptionInit | undefined;
        if (answer && pc1.current) {
          console.log("answer received");
          await pc1.current.setRemoteDescription(new RTCSessionDescription(answer));
          pc1RemoteDescSet.current = true;
          // flush queued candidates for pc1
          for (const c of pc1Pending.current) {
            try {
              await pc1.current.addIceCandidate(c);
            } catch (err) {
              console.warn("pc1 queued addIceCandidate failed", err, c);
            }
          }
          pc1Pending.current = [];
        }
        return;
      }

      if (type === RequestType.ADD_ICE_CANDIDATES) {
        const sdp = data.payload?.sdp as RTCIceCandidateInit | undefined;
        const id = data.payload?.id as number | undefined; // 1 => to pc1, 2 => to pc2;
        if (!sdp) return;

        // ignore end-of-candidates markers
        if (!sdp.candidate || sdp.candidate === "") return;

        try {
          if (id === 1) {
            if (pc1RemoteDescSet.current) {
              await pc1.current?.addIceCandidate(sdp);
            } else {
              pc1Pending.current.push(sdp);
            }
          } else if (id === 2) {
            if (pc2RemoteDescSet.current) {
              await pc2.current?.addIceCandidate(sdp);
            } else {
              pc2Pending.current.push(sdp);
            }
          }
        } catch (err) {
          console.warn("addIceCandidate failed (likely early or mid mismatch)", err, sdp);
        }
        return;
      }

      console.log("unhandled message", data);
    };
  }

  
  
  

  function handleNext() {
    if (!ws.current) {
      console.log("ws not found");
      return;
    }
    if (!started) setStarted(true);

    cleanupPeer(pc1.current);
    cleanupPeer(pc2.current);
    pc1.current = null;
    pc2.current = null;

    pc1RemoteDescSet.current = false;
    pc2RemoteDescSet.current = false;
    pc1Pending.current = [];
    pc2Pending.current = [];

    // create fresh caller pc1
    const pc = new RTCPeerConnection(iceConfig);
    pc1.current = pc;

    initPc1Handlers(pc);
    ws.current.send(JSON.stringify({ type: RequestType.FIND_NEXT, payload: { message: "next" } }));
  }

  async function addTracksToPc1() {
    const stream = await getLocalStream();
    if (!pc1.current) {
      console.log("pc1 not found");
      return;
    }

    // dedupe senders
    const senders = pc1.current.getSenders();
    const a = stream.getAudioTracks()[0];
    const v = stream.getVideoTracks()[0];

    if (a && !senders.some((s) => s.track === a)) pc1.current.addTrack(a, stream);
    if (v && !senders.some((s) => s.track === v)) pc1.current.addTrack(v, stream);

    initPc1Handlers(pc1.current);
  }

  function initPc1Handlers(pc: RTCPeerConnection) {
    if (!ws.current) return;

    // display remote on caller side too
    // pc.ontrack = (e) => {
    //   if (receiverRef.current) receiverRef.current.srcObject = e.streams[0];
    // };

    pc.onnegotiationneeded = async () => {
      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        ws.current?.send(JSON.stringify({ type: RequestType.OFFER, payload: { offer } }));
        console.log("offer sent");
      } catch (err) {
        console.error("negotiationfailed", err);
      }
    };

    pc.onicecandidate = (e) => {
      const cand = e.candidate;
      if (!cand) return; // end-of-candidates
      if (!ws.current) return;
      ws.current.send(
        JSON.stringify({ type: RequestType.ADD_ICE_CANDIDATES, payload: { sdp: cand.toJSON(), id: 1 } })
      );
      // console.log("pc1 sent candidate", cand);
    };

    pc.onicecandidateerror = (e: any) => {
      console.warn("pc1 icecandidateerror", e);
    };
  }

  async function initPc2AndAnswer(offer: RTCSessionDescriptionInit) {
    if (!ws.current) return;

    const pc = new RTCPeerConnection(iceConfig);
    pc2.current = pc;

    // remote media from pc1 -> show it
    pc.ontrack = (e) => {
      if (receiverRef.current) receiverRef.current.srcObject = e.streams[0];
    };

    // **IMPORTANT**: add our local tracks too so pc1 receives remote
    const stream = await getLocalStream();
    const a = stream.getAudioTracks()[0];
    const v = stream.getVideoTracks()[0];
    if (a) pc.addTrack(a, stream);
    if (v) pc.addTrack(v, stream);

    // handle candidates (to pc2)
    pc.onicecandidate = (e) => {
      const cand = e.candidate;
      if (!cand) return;
      ws.current?.send(
        JSON.stringify({ type: RequestType.ADD_ICE_CANDIDATES, payload: { sdp: cand.toJSON(), id: 2 } })
      );
      // console.log("pc2 sent candidate", cand);
    };

    pc.onicecandidateerror = (e: any) => {
      console.warn("pc2 icecandidateerror", e);
    };

    // set offer, create+send answer
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    console.log("pc2: remote offer set");
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    ws.current?.send(JSON.stringify({ type: RequestType.ANSWER, payload: { answer } }));
    console.log("pc2: answer sent");

    pc2RemoteDescSet.current = true;

    // flush queued candidates for pc2
    for (const c of pc2Pending.current) {
      try {
        await pc.addIceCandidate(c);
      } catch (err) {
        console.warn("pc2 queued addIceCandidate failed", err, c);
      }
    }
    pc2Pending.current = [];
  }

  function handleStop() {
    if (!ws.current) return console.log("ws not found");
    ws.current.send(JSON.stringify({ type: RequestType.STOP }));
    cleanupPeer(pc1.current);
    cleanupPeer(pc2.current);
    pc1.current = null;
    pc2.current = null;
  }

  return (
    <div className="relative min-h-screen h-screen w-screen bg-neutral-200">
      <div className="relative h-3/4 flex bg-green-400 justify-between items-center">
        <div className="h-[90%] w-[49%] bg-red-500 m-4 rounded-2xl">
          <video ref={receiverRef} autoPlay playsInline className="h-full w-full" />
        </div>
        <div className="h-[90%] w-[49%] bg-red-500 m-4 rounded-2xl">
          {/* horizontal mirror for self-view */}
          <video ref={senderRef} muted autoPlay playsInline className="h-full w-full transform scale-x-[-1]" />
        </div>
      </div>

      <div className="w-full py-2 px-4 flex gap-4 bg-blue-400">
        <button
          className="h-15 w-30 py-2 rounded-2xl bg-neutral-400 flex justify-center items-center active:scale-90"
          onClick={handleNext}
        >
          {started ? "NEXT" : "START"}
        </button>

        <button
          className="h-15 w-30 py-2 rounded-2xl bg-neutral-400 flex justify-center items-center active:scale-90"
          onClick={() => {
            pc1.current
              ?.getStats()
              .then((report) => console.log(Array.from(report.values())))
              .catch(console.error);
            handleStop();
          }}
        >
          STOP
        </button>
      </div>
    </div>
  );
}
