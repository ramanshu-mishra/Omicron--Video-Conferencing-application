"use client";

import { MessageType, RequestType } from "@/interface";
import { useEffect, useRef, useState } from "react";

export default function Page(){
  const [lobby,setLobby] = useState(false);
  const [started,setStarted] = useState(false);
    const senderRef = useRef<HTMLVideoElement|null>(null);
    const recieverRef = useRef<HTMLVideoElement|null>(null);
    const [localStream, setLocalStream] = useState<MediaStream|null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream|null>(null);
    const ws = useRef<WebSocket|null>(null);
    const senderPc = useRef<RTCPeerConnection|null>(null);
    const recieverPc = useRef<RTCPeerConnection|null>(null);
    const localPlayed = useRef(false);
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
        // const socket = new WebSocket("ws://localhost:8080");
        // const socket = new WebSocket("ws://192.168.1.86:8080");
        const socket = new WebSocket("wss://omicron-video-conferencing-application-1.onrender.com");

        ws.current =  socket;
        init_socketHandlers(socket);
      }
    },[ws.current]);


    function cleanupPeer(pc: RTCPeerConnection | null) {
    if (!pc) return;
    try {
      pc.onicecandidate = null;
      pc.ontrack = null;
      pc.onnegotiationneeded = null;
      // pc.getSenders().forEach((s) => {
      //   try {
      //     if (s.track) s.track.stop();
      //   } catch {}
      // });
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

    const pc = new RTCPeerConnection();
       
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
      // pc.onnegotiationneeded = async()=>{
      //     const offer = await pc.createOffer();
      //     await pc.setLocalDescription(offer);
      //     if(ws.current && ws.current.readyState == ws.current?.OPEN){
      //       ws.current.send(JSON.stringify({type: RequestType.OFFER,payload: {offer}}))
      //     }
      //     console.log("offer sent");
      // }

      pc.onconnectionstatechange = ()=>{
        console.log("connection state: "+ pc.connectionState);
        if(pc.connectionState == "connected"){
          setLobby(false);
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
         pc = new RTCPeerConnection();
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
         
        // setRecieverPc(pc);
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
        recieverRef.current.srcObject  = remoteStream;
     

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
        // it is for reciever
        await recieverPc.current.addIceCandidate(sdp);
        console.log("ice candidates set for reciever");
      }
      else if(senderPc.current){
        //  it is for sender
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
   
    
    return(
    <div className="relative min-h-screen min-w-screen h-screen w-screen bg-neutral-200 ">

      <div className="relative h-3/4 flex bg-green-400 justify-between items-center">
      <div className="h-[90%] w-[49%] bg-red-500 m-4 rounded-2xl"  >
          <video ref={recieverRef}  playsInline className="h-full w-full"></video>
      </div>
      <div className=" h-[90%] w-[49%]  bg-red-500 m-4 rounded-2xl">
        <video ref={senderRef} muted  playsInline className="h-full transform scale-x-[-1]"></video>
      </div>
      </div>
      <div className="w-full py-2 px-4 flex gap-4 bg-blue-400">
          <div className="h-15 w-30 py-2 rounded-2xl bg-neutral-400 flex justify-center items-center active:scale-90" onClick={()=>handleNext(RequestType.FIND_NEXT)}>{started? "NEXT":"START"}</div>
          <div className="h-15 w-30 py-2 rounded-2xl bg-neutral-400 flex justify-center items-center active:scale-90" onClick={()=>{
            handleStop();
          }}>STOP</div>
      </div>

    </div>
  )
}