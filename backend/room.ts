import { WebSocket } from "ws";
import { User } from "./user";
import { ErrorType, MessageType, RequestType } from "./interface";
import { RoomManager } from "./RoomManager";

export class Room{
    sender:User|null = null;
    reciever:User|null = null;

    private async getPartner(user:User){
        console.log("reach-3");
        const sender_socket = this.sender?.ws;
        if(!sender_socket)return;
        console.log("reach-4");
         let cnt = 0;
                let partner:User|null = null;
                RoomManager.getInstance().addUser(this.sender as User);
                while(cnt<100000 && partner == null){
                    console.log("try - "+cnt);
                     partner = await RoomManager.getInstance().findMatch(this.sender as User, this.reciever);
                     cnt++;
                     await new Promise(resolve=>setTimeout(resolve, 2));
                }
                if(partner == null){
                    RoomManager.getInstance().removeUser(this.sender as User);
                    sender_socket.send(JSON.stringify({type:MessageType.FAILURE, paylaod:{
                        error: ErrorType.NO_MATCH_FOUND
                    }}));
                    return;
                }
                sender_socket.send(JSON.stringify({type:MessageType.MATCHED, payload: {message: MessageType.MATCHED}}))
                // as soon as client gets this message it creates an RTC peer connection (if not already created);
                // sends an offer to signaling server;
                // recieves an answer from signaling server;
                // connection gets established
                this.reciever = partner;
        
    }

    constructor(user:User){
        console.log("reach-2");
        if(user == null){
            console.log("user is null");
        }
        // console.log(user);
        this.sender = user;
        this.getPartner(user);
        // ask manager to find a match;
        // setReciever to that match to initiate handlers 



        // aadmi asks for partner to RoomManager;
        // RoomManager calls addUser for aadmi;
        //  room manager aquires lock for aadmi;
        
        // if another person askes for partner at the same time;
        //  room manger calls addUser for him also;
        // but roomManager does aquire any lock;
        // since  lock is already assigned to addmi1;
        //  now aadmi1 matches with aadmi2 (or anyother aadmi trying to match);
        // 
    }

   
    setReciever(user:User){
        this.reciever = user;
        this.init_handlers();
    }

    init_handlers(){
        const sender_socket = this.sender?.ws;
        const reciever_socket = this.reciever?.ws
        if(!sender_socket || !reciever_socket)return;
        sender_socket.onmessage = async(e)=>{
            let d:any;
            try{
             d = JSON.parse(e.data.toString());
            }
            catch{
            sender_socket.send(JSON.stringify({type:MessageType.FAILURE, error: ErrorType.NON_JSON_FORMAT}))
            return;
            }
            const type = d.type;
            const payload = d.paylaod;
            if(!type || !payload){
                sender_socket.send(JSON.stringify({type:MessageType.FAILURE, error: ErrorType.INVALID_PAYLOAD}))
                return;
            }
            if(type == RequestType.OFFER){
                const offer = payload.offer;
                if(!offer){
                    sender_socket.send(JSON.stringify({type:MessageType.FAILURE, error: ErrorType.INVALID_PAYLOAD}))
                return;
                }
                reciever_socket.send(JSON.stringify({type:RequestType.OFFER, payload:{offer: offer}}));
            }
            else if(type == RequestType.ANSWER){
                const answer = payload.answer;
                if(!answer){
                    sender_socket.send(JSON.stringify({type:MessageType.FAILURE, error: ErrorType.INVALID_PAYLOAD}))
                    return;
                }
                reciever_socket.send(JSON.stringify({type:RequestType.ANSWER, payload:{answer}}));
            }
            else if(type == RequestType.ADD_ICE_CANDIDATES){
                const sdp = payload.sdp;
                if(!sdp){
                    sender_socket.send(JSON.stringify({type:MessageType.FAILURE, error: ErrorType.INVALID_PAYLOAD}));
                    return;
                }
                else{
                    reciever_socket.send(JSON.stringify({type: RequestType.ADD_ICE_CANDIDATES, payload:{
                        sdp
                    }}));
                }
            }
            else if(type == RequestType.FIND_NEXT){
                this.getPartner(this.sender as User);
                    // room set ho gaya; 

                    // when websocket will go down automatically this room will also get deleted;
                    //  but we should still handle the ws.onclose event that removes user from Room Manager completely;
            }
        }

        sender_socket.onclose = ()=>{
            const manager = RoomManager.getInstance();
            manager.removeUser(this.sender as User);
            manager.removeMatched(this.sender as User);
            return;
        }
    }
}


// instead of creating new rooms on every connection lets create every person a room and we will keep changing the person's reciever whenever he pressess next on client side