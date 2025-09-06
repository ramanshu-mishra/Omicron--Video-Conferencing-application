"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const interface_1 = require("./interface");
const crypto_1 = __importDefault(require("crypto"));
const roomManager2_1 = require("./roomManager2");
class Room {
    constructor(user1, user2) {
        this.user1 = user1;
        this.user2 = user2;
        const cuid = Room.generateCUID();
        this.id = cuid;
        console.log(`room generated between userid ${user1.id} and ${user2.id}`);
        this.init_handlers();
    }
    static generateCUID() {
        const timeStamp = Date.now().toString(36);
        const random = crypto_1.default.randomBytes(4).toString("hex");
        console.log(random);
        const counter = (this.count++).toString(36);
        const pid = process.pid.toString(36);
        const cuid = `${timeStamp}-${random}-${counter}-${pid}`;
        return cuid;
    }
    init_handlers() {
        const ws1 = this.user1.ws;
        const ws2 = this.user2.ws;
        ws1.onmessage = (e) => {
            const data = JSON.parse(e.data.toString());
            const type = data.type;
            const payload = data.payload;
            if (!type)
                return;
            if (!payload) {
                console.log("payload 2 not found");
                console.log("message is: " + data);
                Object.keys(data).map((key) => {
                    console.log(data[key]);
                });
                ws1.send(JSON.stringify({ type: interface_1.MessageType.FAILURE, payload: { error: interface_1.ErrorType.INVALID_PAYLOAD } }));
                return;
            }
            if (type == interface_1.RequestType.OFFER) {
                console.log("OFFER AAYA ________________________________");
                const offer = payload.offer;
                if (!ws2) {
                    console.log("no reciever socket baby");
                    ws1.send(JSON.stringify({ type: "NO reciever socket baby" }));
                }
                if (!offer) {
                    console.log("offer 2 not found");
                    ws1.send(JSON.stringify({ type: interface_1.MessageType.FAILURE, error: interface_1.ErrorType.INVALID_PAYLOAD }));
                    return;
                }
                ws2.send(JSON.stringify({ type: interface_1.RequestType.OFFER, payload: { offer: offer } }));
                console.log("offer sent to reciever boss");
            }
            else if (type == interface_1.RequestType.ANSWER) {
                const answer = payload.answer;
                if (!answer) {
                    console.log("answer 2 not found");
                    ws1.send(JSON.stringify({ type: interface_1.MessageType.FAILURE, error: interface_1.ErrorType.INVALID_PAYLOAD }));
                    return;
                }
                ws2.send(JSON.stringify({ type: interface_1.RequestType.ANSWER, payload: { answer } }));
            }
            else if (type == interface_1.RequestType.ADD_ICE_CANDIDATES) {
                const sdp = payload.sdp;
                const id = payload.id;
                if (!sdp || !id) {
                    console.log("sdp 2 not found");
                    ws1.send(JSON.stringify({ type: interface_1.MessageType.FAILURE, error: interface_1.ErrorType.INVALID_PAYLOAD }));
                    return;
                }
                else {
                    ws2.send(JSON.stringify({ type: interface_1.RequestType.ADD_ICE_CANDIDATES, payload: {
                            sdp, id
                        } }));
                }
            }
        };
        ws2.onmessage = (e) => {
            const data = JSON.parse(e.data.toString());
            const type = data.type;
            const payload = data.payload;
            if (!type)
                return;
            if (!payload) {
                console.log("payload 1 not found");
                ws2.send(JSON.stringify({ type: interface_1.MessageType.FAILURE, payload: { error: interface_1.ErrorType.INVALID_PAYLOAD } }));
                return;
            }
            if (type == interface_1.RequestType.OFFER) {
                console.log("OFFER AAYA ________________________________");
                const offer = payload.offer;
                if (!ws1) {
                    console.log("no reciever socket baby");
                    ws2.send(JSON.stringify({ type: "NO reciever socket baby" }));
                }
                if (!offer) {
                    console.log("offer 1 not found");
                    ws2.send(JSON.stringify({ type: interface_1.MessageType.FAILURE, error: interface_1.ErrorType.INVALID_PAYLOAD }));
                    return;
                }
                ws1.send(JSON.stringify({ type: interface_1.RequestType.OFFER, payload: { offer: offer } }));
                console.log("offer sent to reciever boss");
            }
            else if (type == interface_1.RequestType.ANSWER) {
                const answer = payload.answer;
                if (!answer) {
                    console.log("answer 1 not found");
                    ws2.send(JSON.stringify({ type: interface_1.MessageType.FAILURE, error: interface_1.ErrorType.INVALID_PAYLOAD }));
                    return;
                }
                ws1.send(JSON.stringify({ type: interface_1.RequestType.ANSWER, payload: { answer } }));
            }
            else if (type == interface_1.RequestType.ADD_ICE_CANDIDATES) {
                const sdp = payload.sdp;
                const id = payload.id;
                if (!sdp || !id) {
                    console.log("sdp 1 not found");
                    ws2.send(JSON.stringify({ type: interface_1.MessageType.FAILURE, error: interface_1.ErrorType.INVALID_PAYLOAD }));
                    return;
                }
                else {
                    ws1.send(JSON.stringify({ type: interface_1.RequestType.ADD_ICE_CANDIDATES, payload: {
                            sdp, id
                        } }));
                }
            }
        };
        this.addRoom();
    }
    addRoom() {
        roomManager2_1.RoomManager.getInstance().addRoom(this);
    }
    removeRoom() {
        roomManager2_1.RoomManager.getInstance().removeRoom(this);
    }
}
exports.Room = Room;
Room.count = 0;
