"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const interface_1 = require("./interface");
const RoomManager_1 = require("./RoomManager");
class Room {
    getPartner(user) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            console.log("reach-3");
            const sender_socket = (_a = this.sender) === null || _a === void 0 ? void 0 : _a.ws;
            if (!sender_socket)
                return;
            console.log("reach-4");
            let cnt = 0;
            let partner = null;
            // RoomManager.getInstance().addUser(this.sender as User);
            while (cnt < 100000 && partner == null) {
                console.log("try - " + cnt);
                partner = yield RoomManager_1.RoomManager.getInstance().findMatch(this.sender, this.reciever);
                cnt++;
                yield new Promise(resolve => setTimeout(resolve, 2));
            }
            if (partner == null) {
                RoomManager_1.RoomManager.getInstance().removeUser(this.sender);
                sender_socket.send(JSON.stringify({ type: interface_1.MessageType.FAILURE, payload: {
                        error: interface_1.ErrorType.NO_MATCH_FOUND
                    } }));
                return;
            }
            sender_socket.send(JSON.stringify({ type: interface_1.MessageType.MATCHED, payload: { message: interface_1.MessageType.MATCHED } }));
            // as soon as client gets this message it creates an RTC peer connection (if not already created);
            // sends an offer to signaling server;
            // recieves an answer from signaling server;
            // connection gets established
            this.reciever = partner;
            this.setReciever(partner);
        });
    }
    constructor(user) {
        this.sender = null;
        this.reciever = null;
        console.log("reach-2");
        if (user == null) {
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
    setReciever(user) {
        this.reciever = user;
        this.init_handlers();
    }
    init_handlers() {
        var _a, _b;
        const sender_socket = (_a = this.sender) === null || _a === void 0 ? void 0 : _a.ws;
        const reciever_socket = (_b = this.reciever) === null || _b === void 0 ? void 0 : _b.ws;
        if (!sender_socket || !reciever_socket) {
            console.log("_____________SOCKET NA HAI BHAI___________________________________");
            return;
        }
        sender_socket.onmessage = (e) => __awaiter(this, void 0, void 0, function* () {
            console.log("MESSAGE_AAYA_____________________________________________");
            let d;
            try {
                d = JSON.parse(e.data.toString());
            }
            catch (_a) {
                sender_socket.send(JSON.stringify({ type: interface_1.MessageType.FAILURE, error: interface_1.ErrorType.NON_JSON_FORMAT }));
                return;
            }
            const type = d.type;
            const payload = d.payload;
            if (!type || !payload) {
                sender_socket.send(JSON.stringify({ type: interface_1.MessageType.FAILURE, error: interface_1.ErrorType.INVALID_PAYLOAD }));
                return;
            }
            if (type == interface_1.RequestType.OFFER) {
                console.log("OFFER AAYA ________________________________");
                const offer = payload.offer;
                if (!reciever_socket) {
                    console.log("no reciever socket baby");
                    sender_socket.send(JSON.stringify({ type: "NO reciever socket baby" }));
                }
                if (!offer) {
                    sender_socket.send(JSON.stringify({ type: interface_1.MessageType.FAILURE, error: interface_1.ErrorType.INVALID_PAYLOAD }));
                    return;
                }
                reciever_socket.send(JSON.stringify({ type: interface_1.RequestType.OFFER, payload: { offer: offer } }));
                console.log("offer sent to reciever boss");
            }
            else if (type == interface_1.RequestType.ANSWER) {
                const answer = payload.answer;
                if (!answer) {
                    sender_socket.send(JSON.stringify({ type: interface_1.MessageType.FAILURE, error: interface_1.ErrorType.INVALID_PAYLOAD }));
                    return;
                }
                reciever_socket.send(JSON.stringify({ type: interface_1.RequestType.ANSWER, payload: { answer } }));
            }
            else if (type == interface_1.RequestType.ADD_ICE_CANDIDATES) {
                const sdp = payload.sdp;
                if (!sdp) {
                    sender_socket.send(JSON.stringify({ type: interface_1.MessageType.FAILURE, error: interface_1.ErrorType.INVALID_PAYLOAD }));
                    return;
                }
                else {
                    reciever_socket.send(JSON.stringify({ type: interface_1.RequestType.ADD_ICE_CANDIDATES, payload: {
                            sdp
                        } }));
                }
            }
            else if (type == interface_1.RequestType.FIND_NEXT) {
                this.getPartner(this.sender);
                // room set ho gaya; 
                // when websocket will go down automatically this room will also get deleted;
                //  but we should still handle the ws.onclose event that removes user from Room Manager completely;
            }
        });
        sender_socket.onclose = () => {
            const manager = RoomManager_1.RoomManager.getInstance();
            manager.removeUser(this.sender);
            manager.removeMatched(this.sender);
            return;
        };
    }
}
exports.Room = Room;
// instead of creating new rooms on every connection lets create every person a room and we will keep changing the person's reciever whenever he pressess next on client side
