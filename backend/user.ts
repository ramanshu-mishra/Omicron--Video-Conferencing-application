    import { WebSocket } from "ws";
    import crypto from "crypto";
    import { ErrorType, MessageType, RequestType } from "./interface";
import { Room } from "./room2";
import { RoomManager } from "./roomManager2";
    export class User{
        static count = 0;
        id:string;
        ws:WebSocket;
        city: string|null = null;
        state:string|null = null;
        country:string|null = null;
        continent:string|null = null;
        room:Room|null = null;
        partner: User|null = null;
        constructor(ws:WebSocket){
            const cuid = User.generateCUID();
            this.ws = ws;
            this.id = cuid;
            this.init_handlers();
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
            if(!this.ws){
                console.log("no websocket found here");
                return;
            }

            this.ws.addEventListener("message", async (e)=>{
                const data = JSON.parse(e.data.toString());

                const type = data.type;
                if(!type){
                    this.ws?.send(JSON.stringify({type:MessageType.FAILURE, payload: {error:ErrorType.INVALID_PAYLOAD}}))
                    return;
                }

                if(type == "FIND_NEXT"){
                    // if already in a room; to wo room se disconnect karo; find it through roomManager class
                    if(this.room){
                        RoomManager.getInstance().removeRoom(this.room);
                        const ws1 = this.room.user1.ws;
                        const ws2 = this.room.user2.ws;

                         // doosre partner ko skipped ka message bhejo
                        if(ws1 != this.ws){
                            ws1.send(JSON.stringify({type: RequestType.SKIP}));
                        }
                        if(ws2 != this.ws){
                            ws2.send(JSON.stringify({type: RequestType.SKIP}));
                        }
                        this.room = null;
                    }
                    // next find karo 
                    const partner = await this.getPartner(this.ws);
                    if(!partner){
                        this.ws.send(JSON.stringify({type:MessageType.FAILURE,payload:{error:ErrorType.NO_MATCH_FOUND}}));
                        return;
                    }

                     // unka room banao;
                    const room = new Room(this,partner);
                    this.room = room;

                    this.ws.send(JSON.stringify({type:MessageType.MATCHED}));
                    // this creates a room  constructor adds itself to the roomManager 

                    // roomManager has a map of Roomid: room;
                    // through this we add and delete a room
                }
            })
            
        }



        private async getPartner(sender_socket:WebSocket){
                console.log("reach-3");
                if(!sender_socket)return;
                console.log("reach-4");
                 let cnt = 0;
                        let partner:User|null = null;
                        // RoomManager.getInstance().addUser(this.sender as User);
                        while(cnt<100000 && partner == null){
                            console.log("try - "+cnt);
                             partner = await RoomManager.getInstance().findMatch(this as User, this.partner);
                             cnt++;
                             await new Promise(resolve=>setTimeout(resolve, 2));
                        }
                        if(partner == null){
                            RoomManager.getInstance().removeUser(this as User);
                            sender_socket.send(JSON.stringify({type:MessageType.FAILURE, payload:{
                                error: ErrorType.NO_MATCH_FOUND
                            }}));
                            return;
                        }
                        sender_socket.send(JSON.stringify({type:MessageType.MATCHED, payload: {message: MessageType.MATCHED}}))
                        // as soon as client gets this message it creates an RTC peer connection (if not already created);
                        // sends an offer to signaling server;
                        // recieves an answer from signaling server;
                        // connection gets established
                        this.partner= partner;
                        return partner;
            }

    }