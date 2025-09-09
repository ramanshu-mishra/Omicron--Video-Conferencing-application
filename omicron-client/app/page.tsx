"use client";

import { MessageType, RequestType } from "@/interface";
import { useEffect, useRef, useState } from "react";



export default function Page(){
  const [lobby,setLobby] = useState(false);
  const [started,setStarted] = useState(false);
  const [wsConnecting, setWsConnecting] = useState(true);
  const senderRef = useRef<HTMLVideoElement|null>(null);
  const recieverRef = useRef<HTMLVideoElement|null>(null);
  const [localStream, setLocalStream] = useState<MediaStream|null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream|null>(null);
  const ws = useRef<WebSocket|null>(null);
  const senderPc = useRef<RTCPeerConnection|null>(null);
  const recieverPc = useRef<RTCPeerConnection|null>(null);
  const localPlayed = useRef(false);
  const configuration = {'iceServers': [{'urls': 'stun:stun.l.google.com:19302'},
                        {urls: "stun:turn.talksy.fun:3478"},
                          {
            urls: "turn:turn.talksy.fun:5349?transport=tcp",
            username: "guest",
            credential: "somepassword"
        }
  ]}

  useEffect(()=>{
    if(localPlayed.current)return;
    if(senderRef.current){
        init_localStream().then((stream) => {
          if (senderRef.current && stream) {
            senderRef.current.srcObject = stream;
            senderRef.current.play();
            localPlayed.current = true;
          }
        });
    }
  },[senderRef.current]);

  useEffect(()=>{
    if(!ws.current || ws.current.readyState == ws.current.CLOSED){
      setWsConnecting(true);
      // const socket = new WebSocket("wss://omicron-video-conferencing-application-1.onrender.com");
      const socket = new WebSocket("wss://app.talksy.fun");


      ws.current = socket;
      
      socket.onopen = () => {
        console.log("web socket connected");
        setWsConnecting(false);
      };
      
      socket.onerror = () => {
        setWsConnecting(false);
      };
      
      init_socketHandlers(socket);
    }
  },[ws.current]);

  function cleanupPeer(pc: RTCPeerConnection | null) {
    if (!pc) return;
    try {
      pc.onicecandidate = null;
      pc.ontrack = null;
      pc.onnegotiationneeded = null;
      pc.close();
    } catch {}
  }

  function init_socketHandlers(socket:WebSocket){
    socket.onmessage = (e)=>{
      const data = JSON.parse(e.data.toString());
      const type = data.type;
      if(type == MessageType.MATCHED){
        sendOffer(socket);
      }
      else if(type == RequestType.OFFER){
        const offer = data.payload.offer;
        handleOffer(offer as RTCSessionDescription, socket);
      }
      else if(type == RequestType.ADD_ICE_CANDIDATES){
        const sdp  = data.payload.sdp;
        const id = data.payload.id;
        if(sdp && id)
        handleiceCandidates(sdp as RTCIceCandidate, id);
      }
      else if(type == RequestType.ANSWER){
        const answer = data.payload.answer;
        handleAnswer(answer as RTCSessionDescription);
      }   
      else if(type == RequestType.SKIP){
          handleSkip();
      }
      else {
        console.log(data);
      }
    }
  }

  async function handleSkip(){
    await new Promise(resolve=>setTimeout(resolve, 200));
    console.log("partner skipped");
    handleNext(RequestType.SKIP);
  }

  async function sendOffer(socket:WebSocket){
    const stream = await init_localStream();
    if(!stream){
      console.log("no localStream");
      return;
    }

    const pc = new RTCPeerConnection(configuration);
       
    try{
      stream.getTracks().forEach(track => pc.addTrack(track, stream));
    }
    catch(e){
      console.log(e);
    }
  
    pc.onicecandidate = (e)=>{
      const sdp = e.candidate;
      if(sdp && ws.current){
        ws.current.send(JSON.stringify({type: RequestType.ADD_ICE_CANDIDATES, payload: {sdp, id:1}}));
      }
    }

    pc.onconnectionstatechange = ()=>{
      console.log("connection state: "+ pc.connectionState);
      if(pc.connectionState == "connected"){
        setLobby(false);
      }
      else if(pc.connectionState == "disconnected" || pc.connectionState == "failed"){
        setLobby(false);
        handleNext(RequestType.SKIP);
      }
      return;
    }
     
    senderPc.current = pc;

    const offer = await senderPc.current.createOffer();
    await senderPc.current.setLocalDescription(offer);
    socket.send(JSON.stringify({type: RequestType.OFFER, payload:{offer}}));
  }

  async function handleOffer(offer: RTCSessionDescription, socket:WebSocket){
    let pc:RTCPeerConnection;
    if(!recieverPc.current){
       pc = new RTCPeerConnection(configuration);
       pc.ontrack = (e)=>{
        const remoteVideo = new MediaStream();
        remoteVideo.addTrack(e.streams[0].getAudioTracks()[0]);
        remoteVideo.addTrack(e.streams[0].getVideoTracks()[0]);
        setRemoteStream(remoteVideo);
        console.log("remote track addded");
       }

       pc.onicecandidate = (e)=>{
        const sdp = e.candidate;
        if(sdp){
          socket.send(JSON.stringify({type:RequestType.ADD_ICE_CANDIDATES, payload: {sdp, id:2}}));
          console.log("send ice candidates by 2");
        }
       }
      
       pc.onconnectionstatechange = ()=>{
        console.log("reciever pc state => "+pc.connectionState);
       }
       
      recieverPc.current = pc;
    }
    else pc = recieverPc.current;

    await pc.setRemoteDescription(offer);
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);
    socket.send(JSON.stringify({type: RequestType.ANSWER, payload:{answer}}));
    console.log("answer sent");
  }

  useEffect(()=>{
    if(recieverPc && recieverRef.current && remoteStream){
      recieverRef.current.srcObject = remoteStream;
      recieverRef.current.muted = false;
      recieverRef.current.play();
    }
  }, [recieverPc.current, recieverRef.current, remoteStream])

  async function handleAnswer(answer:RTCSessionDescription){
      if(!senderPc.current){
        console.log("no senderPc");
        return;
      }
      await senderPc.current.setRemoteDescription(answer);
      console.log("remote answer set");
  }

  async function handleiceCandidates(sdp:RTCIceCandidate, id:number){
    if(id == 1 && recieverPc.current){
      await recieverPc.current.addIceCandidate(sdp);
      console.log("ice candidates set for reciever");
    }
    else if(senderPc.current){
      await senderPc.current.addIceCandidate(sdp);
      console.log("ice candidates set for sender");
    }
    else console.log("ice candidate mein gadbadi");
  }

  useEffect(()=>{
    if(!localStream){
      init_localStream();
    }
  },[localStream]);

  async function init_localStream(){
    if(localStream)return localStream;
      const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true});
      setLocalStream(stream);
      return stream;
  }
  
   function handleNext(message:string){
    if( !ws.current || !(ws.current.readyState == ws.current.OPEN) ){
      console.log("websocket not initialized");
      return;}
    if(lobby && message == RequestType.FIND_NEXT){
    console.log("already i lobby");return;
    }
    if(lobby && message == RequestType.SKIP){
      setLobby(false);
    }
    setLobby(true);
    if(!started){setStarted(true)};
     if(senderPc.current)cleanupPeer(senderPc.current);
    if(recieverPc.current)cleanupPeer(recieverPc.current);
     senderPc.current = null;
     recieverPc.current = null;

    ws.current.send(JSON.stringify({type:RequestType.FIND_NEXT, payload:{message: "something"}}));
    console.log("finding next... ");
  }

  function handleStop(){
    if(!ws.current || !(ws.current.readyState == ws.current.OPEN)){
      console.log("webSocket not initialized yet");return;
    }
    if(senderPc.current)cleanupPeer(senderPc.current);
    if(recieverPc.current)cleanupPeer(recieverPc.current);
    ws.current.send(JSON.stringify({type:RequestType.STOP, payload:{message: "stop"}}));
    console.log("stopped");
  }

  // Spinner component
  const Spinner = () => (
    <div className="absolute h-full w-full inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
    </div>
  );
 
  return(
    <div className="min-h-screen bg-yellow-100 text-white flex flex-col">
     

      {/* Main video area */}
     <div className=" flex">
        {/* Stranger's video (left side) */}
        <div className="w-1/2 h-full bg-gray-900 relative border-r border-gray-700">
          <div className="absolute top-4 left-4 bg-black bg-opacity-70 px-3 py-1 rounded text-sm">
            Stranger
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <video 
              ref={recieverRef}  
              playsInline 
              className=" h-120 w-full object-cover"
            />
            {lobby && (
              <Spinner />
            )}
            {!remoteStream && !lobby && (
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <div className="text-4xl mb-2">👤</div>
                  <div>No stranger connected</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Your video (right side) */}
        <div className="w-1/2 h-full bg-gray-800 relative">
          <div className="absolute top-4 right-4 bg-black bg-opacity-70 px-3 py-1 rounded text-sm z-10">
            You
          </div>
          <div className="w-full h-full flex items-center justify-center">
            <video 
              ref={senderRef} 
              muted  
              playsInline 
              className=" h-120 w-full object-cover transform scale-x-[-1]"
            />
            {wsConnecting && (
              <Spinner />
            )}
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-yellow-100 p-4 flex justify-center gap-4 flex-1">
        <button
          className={`px-6 py-3 h-35 w-35 rounded-lg font-semibold text-white transition-all duration-200 transform active:scale-95 ${
            lobby 
              ? 'bg-gray-600 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          onClick={() => handleNext(RequestType.FIND_NEXT)}
          disabled={lobby || wsConnecting}
        >
          {started ? "Next" : "Start"}
        </button>
        
        <button
          className="px-6 py-3 h-35 w-35 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-white transition-all duration-200 transform active:scale-95"
          onClick={handleStop}
          disabled={wsConnecting}
        >
          Stop
        </button>
      </div>

      {/* Status bar */}
      <div className="bg-yellow-100 p-2 text-center text-sm text-gray-400 ">
        {wsConnecting ? (
          <span className="text-yellow-400">Connecting...</span>
        ) : lobby ? (
          <span className="text-blue-400">Looking for someone to chat with...</span>
        ) : remoteStream ? (
          <span className="text-green-400">Connected to stranger</span>
        ) : (
          <span>Click Start to begin chatting</span>
        )}
      </div>
    </div>
  )
}