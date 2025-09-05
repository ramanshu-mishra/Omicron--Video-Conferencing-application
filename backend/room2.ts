import { User } from "./user";
import { RequestType, MessageType,ErrorType } from "./interface";
import crypto from "crypto";
import { RoomManager } from "./roomManager2";

export class Room{
    id:string;
    user1:User;
    user2:User;
    static count = 0;
    
    constructor(user1:User, user2:User){
        this.user1 = user1;
        this.user2 = user2;
        const cuid = Room.generateCUID();
        this.id = cuid
    }
    private static generateCUID(){
                const timeStamp = Date.now().toString(36);
                const random = crypto.randomBytes(4).toString("hex");
                console.log(random);
                const counter = (this.count++).toString(36);
                const pid  = process.pid.toString(36);
                const cuid = `${timeStamp}-${random}-${counter}-${pid}`;
                return cuid;
            }

    init_handlers(){
        const ws1 = this.user1.ws;
        const ws2 = this.user2.ws;
        
        ws1.onmessage = (e)=>{
            const data = JSON.parse(e.data.toString());
            const type = data.type;
            const payload = data.paylaod;
            if(!type)return;
            if(!payload){
                ws1.send(JSON.stringify({type: MessageType.FAILURE, payload: {error: ErrorType.INVALID_PAYLOAD}}));
            }
            
            if(type == RequestType.OFFER){
                            console.log("OFFER AAYA ________________________________");
                            const offer = payload.offer;
                            if(!ws2){
                                console.log("no reciever socket baby");
                                ws1.send(JSON.stringify({type: "NO reciever socket baby"}))
                            }
                            if(!offer){
                                ws1.send(JSON.stringify({type:MessageType.FAILURE, error: ErrorType.INVALID_PAYLOAD}));
                            return;
                            }
                            ws2.send(JSON.stringify({type:RequestType.OFFER, payload:{offer: offer}}));
                            console.log("offer sent to reciever boss");
                        }
                        else if(type == RequestType.ANSWER){
                            const answer = payload.answer;
                            if(!answer){
                                ws1.send(JSON.stringify({type:MessageType.FAILURE, error: ErrorType.INVALID_PAYLOAD}))
                                return;
                            }
                            ws2.send(JSON.stringify({type:RequestType.ANSWER, payload:{answer}}));
                        }
                        else if(type == RequestType.ADD_ICE_CANDIDATES){
                            const sdp = payload.sdp;
                            if(!sdp){
                                ws1.send(JSON.stringify({type:MessageType.FAILURE, error: ErrorType.INVALID_PAYLOAD}));
                                return;
                            }
                            else{
                                ws2.send(JSON.stringify({type: RequestType.ADD_ICE_CANDIDATES, payload:{
                                    sdp
                                }}));
                            }
                        }
        }

         ws2.onmessage = (e)=>{
            const data = JSON.parse(e.data.toString());
            const type = data.type;
            const payload = data.paylaod;
            if(!type)return;
            if(!payload){
                ws2.send(JSON.stringify({type: MessageType.FAILURE, payload: {error: ErrorType.INVALID_PAYLOAD}}));
            }
            
            if(type == RequestType.OFFER){
                            console.log("OFFER AAYA ________________________________");
                            const offer = payload.offer;
                            if(!ws1){
                                console.log("no reciever socket baby");
                                ws2.send(JSON.stringify({type: "NO reciever socket baby"}))
                            }
                            if(!offer){
                                ws2.send(JSON.stringify({type:MessageType.FAILURE, error: ErrorType.INVALID_PAYLOAD}));
                            return;
                            }
                            ws1.send(JSON.stringify({type:RequestType.OFFER, payload:{offer: offer}}));
                            console.log("offer sent to reciever boss");
                        }
                        else if(type == RequestType.ANSWER){
                            const answer = payload.answer;
                            if(!answer){
                                ws2.send(JSON.stringify({type:MessageType.FAILURE, error: ErrorType.INVALID_PAYLOAD}))
                                return;
                            }
                            ws1.send(JSON.stringify({type:RequestType.ANSWER, payload:{answer}}));
                        }
                        else if(type == RequestType.ADD_ICE_CANDIDATES){
                            const sdp = payload.sdp;
                            if(!sdp){
                                ws2.send(JSON.stringify({type:MessageType.FAILURE, error: ErrorType.INVALID_PAYLOAD}));
                                return;
                            }
                            else{
                                ws1.send(JSON.stringify({type: RequestType.ADD_ICE_CANDIDATES, payload:{
                                    sdp
                                }}));
                            }
                        }
        }

        this.addRoom();
    }

    addRoom(){
        RoomManager.getInstance().addRoom(this);
    }

    removeRoom(){
        RoomManager.getInstance().removeRoom(this);
    }



    
}