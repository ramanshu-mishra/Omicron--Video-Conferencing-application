"use client";

import { MessageType, RequestType } from "@/interface";
import { useEffect, useRef, useState } from "react";
//  og one

export default function Page(){
  const senderRef = useRef<null|HTMLVideoElement>(null);
  const recieverRef = useRef<null|HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const pc1 = useRef<RTCPeerConnection|null>(null);
  const pc2 = useRef<RTCPeerConnection|null>(null);
  const ws = useRef<WebSocket|null>(null);
  const localStream = useRef<MediaStream|null>(null);
  // const pendingCandidates= useRef< RTCIceCandidateInit[]>([]);
  const iceConfig = {
    iceServers: [
        {
            urls: "stun:stun.services.mozilla.com"
        },
        {
            urls: "stun:stun.l.google.com:19302"
        },
        {
            urls: "stun:stun1.l.google.com:19302"
        },
        {
            urls: "stun:stun2.l.google.com:19302"
        },
        {
            urls: "stun:stun3.l.google.com:19302"
        },
        {
            urls: "stun:stun4.l.google.com:19302"
        }
    ]
}

function init_socket(){
   const socket = new WebSocket("ws://localhost:8080");
    // setWs(socket);
    ws.current = socket;
    getLocalStream();

    

    socket.onmessage = async(e)=>{
      const data = JSON.parse(e.data.toString());
      const type = data.type;
      if(!type){
        console.log("message without type recieved");
        return;
      }
      if(type == "SKIP"){
        console.log("partner skipped");
         handleNext();
      }
      else if(type == MessageType.MATCHED){
        addVideoTrack();
      }
      else if(type == MessageType.OFFER){
        const offer = data.payload.offer;
        if(offer){
          console.log("offer recieved");
          init_pc2(offer as RTCSessionDescriptionInit);
        }
      }
      else if(type == MessageType.ANSWER){
        const answer = data.payload.answer;
        if(answer && pc1.current){
          console.log("answer recieved");
          await pc1.current.setRemoteDescription(new RTCSessionDescription(answer));
        }
      }
      else if(type == RequestType.ADD_ICE_CANDIDATES){
        const sdp = data.payload.sdp;
        const id = data.payload.id;
        if(sdp){
          try{
            if(id == 1)
          await pc1.current?.addIceCandidate(new RTCIceCandidate(sdp));
        else{
          await pc2.current?.addIceCandidate(new RTCIceCandidate(sdp));
        }
          
          }
          catch{
            console.log("not yet");
          }
          console.log("ice candidates recieved");
        }
      }
      else{
        console.log(data);
      }
    }
}
  
  useEffect(()=>{
   init_socket();
   ws.current?.addEventListener("close", ()=>{
    setTimeout(()=>{init_socket()}, 1000);
   })
  },[]);

  async function getLocalStream(){
    const stream = await navigator.mediaDevices.getUserMedia({video:true, audio:true});
    // setLocalStream(stream);
    localStream.current = stream;
    while(!senderRef.current){
      await new Promise((resolve)=>setTimeout(resolve, 1));
    }
    senderRef.current.srcObject = stream;
  }

  function handleNext(){
    if(!ws.current){
      console.log("ws not found"); return;
    }
    if(!started)setStarted(true);
    if(pc1.current) {pc1.current.close(); console.log("closed existing connections")};
    if(pc2.current)pc2.current.close();
    const pc = new RTCPeerConnection(iceConfig);
    // setpc1(pc);
    pc1.current = pc;
    ws.current.send(JSON.stringify({type:RequestType.FIND_NEXT, payload: {message: "something"}}));
  }

  // function handleSkip(){
  //   if(pc1)pc1.close();
  //   const pc = new RTCPeerConnection();
  //   setpc1(pc1);
  //   ws?.send(JSON.stringify({type: RequestType.SKIP}));
  //   ws?.send(JSON.stringify({type:RequestType.FIND_NEXT}));
  // }

 async function addVideoTrack(){
   if(!localStream.current){
    console.log("localstream not found");
    return;
   }
   if(!pc1.current){
    console.log("pc1 not found");return;
   }
  
   
     const senders = pc1.current.getSenders();

  const audioTrack = localStream.current.getAudioTracks()[0];
  const videoTrack = localStream.current.getVideoTracks()[0];

  const hasAudio = senders.some(s => s.track === audioTrack);
  const hasVideo = senders.some(s => s.track === videoTrack);

  if (!hasAudio && audioTrack) {
    pc1.current.addTrack(audioTrack, localStream.current);
  }

  if (!hasVideo && videoTrack) {
    pc1.current.addTrack(videoTrack, localStream.current);
  }
   init_pc1Handlers(pc1.current);
  }


  function handleWSnotfound(){
    console.log("ws not found");
  }
   function init_pc1Handlers(pc:RTCPeerConnection){
    if(!ws.current){
      handleWSnotfound();
      return;
    }
    pc.onnegotiationneeded = async()=>{
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      if(ws.current)
    ws.current.send(JSON.stringify({type:RequestType.OFFER, payload:{offer:offer}}));
    console.log("offer sent");
    }

    pc.onicecandidate = (e)=>{
      const sdp = e.candidate;
      console.log(sdp);
      if(!ws.current || !sdp)return;
      ws.current.send(JSON.stringify({type: RequestType.ADD_ICE_CANDIDATES, payload:{sdp:sdp, id:1}}));
      console.log("sent ice candidates");
    }

  }
  function handleStop(){
    if(!ws.current){
      handleWSnotfound();return;
    }
    // not implemented on backend yet;
    ws.current.send(JSON.stringify({type:RequestType.STOP}));
  }



  // reciever pc functions;
  function init_pc2(offer: RTCSessionDescriptionInit){
    const pc = new RTCPeerConnection(iceConfig);
    // setpc2(pc);'
    pc2.current = pc;
      pc.ontrack = (e)=>{
      // dekh loonga ye bhi 
      recieverRef.current!.srcObject = e.streams[0];  
    }
    init_pc2Handlers(pc, offer);
  
  }

 async function init_pc2Handlers(pc:RTCPeerConnection, offer:RTCSessionDescriptionInit ){
  if(!ws.current){
    handleWSnotfound();return;
  }
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      console.log("remote offer set");
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      ws.current.send(JSON.stringify({type:RequestType.ANSWER, payload:{answer}}));
      console.log("answer sent");

      pc.onicecandidate = (e)=>{
        const sdp = e.candidate;
        if(!ws.current || !sdp)return;
        ws.current.send(JSON.stringify({type:RequestType.ADD_ICE_CANDIDATES, payload:{sdp, id:2}}));
        console.log("ice candidate 2 sent");  
      }

  }

  return(
    <div className="relative min-h-screen min-w-screen h-screen w-screen bg-neutral-200 ">

      <div className="relative h-3/4 flex bg-green-400 justify-between items-center">
      <div className="h-[90%] w-[49%] bg-red-500 m-4 rounded-2xl"  >
          <video ref={recieverRef} autoPlay playsInline className="h-full w-full"></video>
      </div>
      <div className=" h-[90%] w-[49%]  bg-red-500 m-4 rounded-2xl">
        <video ref={senderRef} muted autoPlay playsInline className="h-full transform scale-x-[-1]"></video>
      </div>
      </div>
      <div className="w-full py-2 px-4 flex gap-4 bg-blue-400">
          <div className="h-15 w-30 py-2 rounded-2xl bg-neutral-400 flex justify-center items-center active:scale-90" onClick={handleNext}>{started? "NEXT":"START"}</div>
          <div className="h-15 w-30 py-2 rounded-2xl bg-neutral-400 flex justify-center items-center active:scale-90" onClick={()=>{

         
pc1.current?.getStats().then(d=>console.log(d.values));

          }}>STOP</div>
      </div>

    </div>
  )
}