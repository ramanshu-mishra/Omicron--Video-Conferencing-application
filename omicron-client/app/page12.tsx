"use client";

import { MessageType, RequestType } from "@/interface";
import { useEffect, useRef, useState } from "react";

export default function Page(){
  const [lobby, setLobby] = useState(false);
  const [started, setStarted] = useState(false);
  const senderRef = useRef<HTMLVideoElement|null>(null);
  const recieverRef = useRef<HTMLVideoElement|null>(null);
  const [localStream, setLocalStream] = useState<MediaStream|null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream|null>(null);
  const [ws, setWs] = useState<WebSocket|null>(null);
  const senderPc = useRef<RTCPeerConnection|null>(null);
  const recieverPc = useRef<RTCPeerConnection|null>(null);
  
  // Initialize local stream first
  useEffect(() => {
    if (!localStream) {
      init_localStream();
    }
  }, []);

  // Initialize WebSocket only after local stream is ready
  useEffect(() => {
    if (localStream && (!ws || ws.readyState === WebSocket.CLOSED)) {
      const socket = new WebSocket("ws://192.168.1.19:8080");
      setWs(socket);
      init_socketHandlers(socket);
    }
  }, [localStream, ws]);

  async function init_localStream() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
      setLocalStream(stream);
      console.log("Local stream initialized");
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  }

  function init_socketHandlers(socket: WebSocket) {
    socket.onmessage = (e) => {
      const data = JSON.parse(e.data.toString());
      const type = data.type;
      
      if (type === MessageType.MATCHED) {
        console.log("Matched! Sending offer...");
        sendOffer(socket);
      }
      else if (type === RequestType.OFFER) {
        const offer = data.payload.offer;
        console.log("Received offer, creating answer...");
        handleOffer(offer as RTCSessionDescription, socket);
      }
      else if (type === RequestType.ADD_ICE_CANDIDATES) {
        const sdp = data.payload.sdp;
        const id = data.payload.id;
        if (sdp && id) {
          handleIceCandidates(sdp as RTCIceCandidate, id);
        }
      }
      else if (type === RequestType.ANSWER) {
        const answer = data.payload.answer;
        console.log("Received answer, setting remote description...");
        handleAnswer(answer as RTCSessionDescription);
      } 
      else if (type === RequestType.SKIP) {
        handleNext();
      }
      else {
        console.log("Unknown message:", data);
      }
    }

    socket.onopen = () => {
      console.log("WebSocket connected");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket closed");
    };
  }

  // Set up local video
  useEffect(() => {
    if (localStream && senderRef.current) {
      senderRef.current.srcObject = localStream;
    }
  }, [localStream]);

  // Set up remote video  
  useEffect(() => {
    if (remoteStream && recieverRef.current) {
      recieverRef.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  async function sendOffer(socket: WebSocket) {
    if (!localStream) {
      console.error("No local stream for creating offer");
      return;
    }

    // Close existing sender connection
    if (senderPc.current) {
      senderPc.current.close();
    }

    // Create new sender peer connection
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    // Add local tracks
    localStream.getTracks().forEach(track => {
      pc.addTrack(track, localStream);
    });

    // Handle ICE candidates for sender
    pc.onicecandidate = (e) => {
      if (e.candidate && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
          type: RequestType.ADD_ICE_CANDIDATES, 
          payload: { sdp: e.candidate, id: 1 }
        }));
        console.log("Sent ICE candidate from sender");
      }
    };

    pc.onconnectionstatechange = () => {
      console.log("Sender connection state:", pc.connectionState);
      if (pc.connectionState === 'connected') {
        setLobby(false);
      }
    };

    senderPc.current = pc;

    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      
      socket.send(JSON.stringify({
        type: RequestType.OFFER, 
        payload: { offer }
      }));
      console.log("Offer sent successfully");
    } catch (error) {
      console.error("Error creating/sending offer:", error);
    }
  }

  async function handleOffer(offer: RTCSessionDescription, socket: WebSocket) {
    if (!localStream) {
      console.error("No local stream for handling offer");
      return;
    }

    // Close existing receiver connection
    if (recieverPc.current) {
      recieverPc.current.close();
    }

    // Create new receiver peer connection
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    // Add local tracks
    // localStream.getTracks().forEach(track => {
    //   pc.addTrack(track, localStream);
    // });

    // Handle remote stream
    pc.ontrack = (event) => {
      console.log("Received remote track");
      const [stream] = event.streams;
      setRemoteStream(stream);
    };

    // Handle ICE candidates for receiver
    pc.onicecandidate = (e) => {
      if (e.candidate && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
          type: RequestType.ADD_ICE_CANDIDATES, 
          payload: { sdp: e.candidate, id: 2 }
        }));
        console.log("Sent ICE candidate from receiver");
      }
    };

    pc.onconnectionstatechange = () => {
      console.log("Receiver connection state:", pc.connectionState);
      if (pc.connectionState === 'connected') {
        setLobby(false);
      }
    };

    recieverPc.current = pc;

    try {
      await pc.setRemoteDescription(offer);
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      
      socket.send(JSON.stringify({
        type: RequestType.ANSWER, 
        payload: { answer }
      }));
      console.log("Answer sent successfully");
    } catch (error) {
      console.error("Error handling offer/creating answer:", error);
    }
  }

  async function handleAnswer(answer: RTCSessionDescription) {
    if (!senderPc.current) {
      console.error("No sender peer connection for answer");
      return;
    }

    if (senderPc.current.signalingState !== 'have-local-offer') {
      console.error(`Wrong signaling state for answer: ${senderPc.current.signalingState}`);
      return;
    }

    try {
      await senderPc.current.setRemoteDescription(answer);
      console.log("Remote answer set successfully on sender");
    } catch (error) {
      console.error("Error setting remote answer:", error);
    }
  }

  async function handleIceCandidates(candidate: RTCIceCandidate, id: number) {
    try {
      if (id === 1 && recieverPc.current) {
        // ICE candidate for receiver
        await recieverPc.current.addIceCandidate(candidate);
        console.log("ICE candidate added to receiver");
      }
      else if (id === 2 && senderPc.current) {
        // ICE candidate for sender
        await senderPc.current.addIceCandidate(candidate);
        console.log("ICE candidate added to sender");
      }
      else {
        console.warn(`Cannot add ICE candidate - PC not ready. ID: ${id}`);
      }
    } catch (error) {
      console.error("Error adding ICE candidate:", error);
    }
  }

  function handleNext() {
    if (lobby) return;
    
    if (!localStream) {
      console.error("No local stream available for next connection");
      return;
    }

    console.log("Looking for next peer...");
    setLobby(true);
    setRemoteStream(null);
    
    if (!started) {
      setStarted(true);
    }

    // Close existing connections
    if (senderPc.current) {
      senderPc.current.close();
      senderPc.current = null;
    }
    if (recieverPc.current) {
      recieverPc.current.close();
      recieverPc.current = null;
    }

    // Create new sender connection for next peer
    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    // Add local tracks
    localStream.getTracks().forEach(track => {
      pc.addTrack(track, localStream);
    });

    // Handle ICE candidates
    pc.onicecandidate = (e) => {
      if (e.candidate && ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({
          type: RequestType.ADD_ICE_CANDIDATES, 
          payload: { sdp: e.candidate, id: 1 }
        }));
      }
    };

    pc.onconnectionstatechange = () => {
      console.log("New sender connection state:", pc.connectionState);
    };

    senderPc.current = pc;

    // Request next peer
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({
        type: RequestType.FIND_NEXT, 
        payload: { message: "finding next peer" }
      }));
      console.log("Sent find next request");
    }
  }

  function handleStop() {
    console.log("Stopping...");
    
    // Close peer connections
    if (senderPc.current) {
      senderPc.current.close();
      senderPc.current = null;
    }
    if (recieverPc.current) {
      recieverPc.current.close();
      recieverPc.current = null;
    }

    // Clear streams
    setRemoteStream(null);
    
    // Close WebSocket
    if (ws) {
      ws.close();
      setWs(null);
    }

    setLobby(false);
    setStarted(false);
  }

  return (
    <div className="relative min-h-screen min-w-screen h-screen w-screen bg-neutral-200">
      <div className="relative h-3/4 flex bg-green-400 justify-between items-center">
        <div className="h-[90%] w-[49%] bg-red-500 m-4 rounded-2xl">
          <video 
            ref={recieverRef} 
            autoPlay 
            playsInline 
            className="h-full w-full rounded-2xl object-cover"
          />
          {!remoteStream && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
              Waiting for peer...
            </div>
          )}
        </div>
        <div className="h-[90%] w-[49%] bg-red-500 m-4 rounded-2xl">
          <video 
            ref={senderRef} 
            muted 
            autoPlay 
            playsInline 
            className="h-full w-full transform scale-x-[-1] rounded-2xl object-cover"
          />
          {!localStream && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-lg">
              Loading camera...
            </div>
          )}
        </div>
      </div>
      
      <div className="w-full py-2 px-4 flex gap-4 bg-blue-400">
        <button 
          className="h-15 w-30 py-2 px-4 rounded-2xl bg-neutral-400 flex justify-center items-center active:scale-90 hover:bg-neutral-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleNext}
          disabled={lobby || !localStream}
        >
          {!localStream ? "LOADING..." : (lobby ? "SEARCHING..." : (started ? "NEXT" : "START"))}
        </button>
        
        <button 
          className="h-15 w-30 py-2 px-4 rounded-2xl bg-red-400 flex justify-center items-center active:scale-90 hover:bg-red-300 transition-all text-white"
          onClick={handleStop}
        >
          STOP
        </button>
      </div>
    </div>
  );
}