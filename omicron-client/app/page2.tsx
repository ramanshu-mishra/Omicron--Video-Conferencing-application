"use client";

// this is the one chatGPT gave me .still not working
// fuck GPT

import { useEffect, useRef, useState } from "react";
import { MessageType, RequestType } from "@/interface";

export default function Page() {
  const localRef = useRef<HTMLVideoElement>(null);
  const remoteRef = useRef<HTMLVideoElement>(null);

  const ws = useRef<WebSocket | null>(null);
  const pc = useRef<RTCPeerConnection | null>(null);
  const localStream = useRef<MediaStream | null>(null);

  const [started, setStarted] = useState(false);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    ws.current = socket;

    socket.onmessage = async (e) => {
      const data = JSON.parse(e.data.toString());
      if (!data.type) return;

      if (data.type === RequestType.OFFER) {
        console.log("📥 Offer received");
        await handleOffer(data.payload.offer);
      } else if (data.type === RequestType.ANSWER) {
        console.log("📥 Answer received");
        await pc.current?.setRemoteDescription(data.payload.answer);
      } else if (data.type === RequestType.ADD_ICE_CANDIDATES) {
        console.log("📥 Candidate received");
        try {
          await pc.current?.addIceCandidate(new RTCIceCandidate(data.payload));
        } catch (err) {
          console.error("Error adding candidate", err);
        }
      }
    };

    initLocalStream();
  }, []);

  async function initLocalStream() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream.current = stream;
    if (localRef.current) {
      localRef.current.srcObject = stream;
    }
  }

  function createPeer() {
    const peer = new RTCPeerConnection();
    pc.current = peer;

    // Add local tracks
    localStream.current?.getTracks().forEach((track) => {
      peer.addTrack(track, localStream.current!);
    });

    // Handle remote tracks
    peer.ontrack = (e) => {
      console.log("📹 Remote track received");
      if (remoteRef.current) remoteRef.current.srcObject = e.streams[0];
    };

    // Handle ICE
    peer.onicecandidate = (e) => {
      if (e.candidate && ws.current) {
        ws.current.send(
          JSON.stringify({
            type: RequestType.ADD_ICE_CANDIDATES,
            payload: e.candidate,
          })
        );
        console.log("📤 Sent candidate");
      }
    };

    return peer;
  }

  async function handleOffer(offer: RTCSessionDescriptionInit) {
    const peer = createPeer();
    await peer.setRemoteDescription(offer);
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    ws.current?.send(JSON.stringify({ type: RequestType.ANSWER, payload: { answer } }));
    console.log("📤 Answer sent");
  }

  async function handleNext() {
    if (!ws.current) return;
    setStarted(true);

    const peer = createPeer();

    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    ws.current.send(JSON.stringify({ type: RequestType.OFFER, payload: { offer } }));
    console.log("📤 Offer sent");
  }

  return (
    <div className="relative min-h-screen bg-neutral-200">
      <div className="flex h-3/4 bg-green-400 justify-between items-center">
        <div className="h-[90%] w-[49%] bg-red-500 m-4 rounded-2xl">
          <video ref={remoteRef} autoPlay className="h-full w-full" />
        </div>
        <div className="h-[90%] w-[49%] bg-red-500 m-4 rounded-2xl">
          <video ref={localRef} muted autoPlay className="h-full w-full transform scale-x-[-1]" />
        </div>
      </div>

      <div className="w-full py-2 px-4 flex gap-4 bg-blue-400">
        <div
          className="h-15 w-30 py-2 rounded-2xl bg-neutral-400 flex justify-center items-center active:scale-90"
          onClick={handleNext}
        >
          {started ? "NEXT" : "START"}
        </div>
      </div>
    </div>
  );
}
