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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const crypto_1 = __importDefault(require("crypto"));
const interface_1 = require("./interface");
const roomManager2_1 = require("./roomManager2");
class User {
    constructor(ws) {
        this.city = null;
        this.state = null;
        this.country = null;
        this.continent = null;
        this.room = null;
        this.partner = null;
        const cuid = User.generateCUID();
        this.ws = ws;
        this.id = cuid;
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
        if (!this.ws) {
            console.log("no websocket found here");
            return;
        }
        this.ws.addEventListener("message", (e) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const data = JSON.parse(e.data.toString());
            const type = data.type;
            if (!type) {
                console.log("type not found");
                (_a = this.ws) === null || _a === void 0 ? void 0 : _a.send(JSON.stringify({ type: interface_1.MessageType.FAILURE, payload: { error: interface_1.ErrorType.INVALID_PAYLOAD } }));
                return;
            }
            if (type == "FIND_NEXT") {
                // if already in a room; to wo room se disconnect karo; find it through roomManager class
                if (this.room) {
                    roomManager2_1.RoomManager.getInstance().removeRoom(this.room);
                    const ws1 = this.room.user1.ws;
                    const ws2 = this.room.user2.ws;
                    // doosre partner ko skipped ka message bhejo
                    if (ws1 != this.ws) {
                        const us1 = this.room.user1;
                        us1.room = null;
                        ws1.send(JSON.stringify({ type: interface_1.RequestType.SKIP }));
                    }
                    if (ws2 != this.ws) {
                        const us2 = this.room.user2;
                        us2.room = null;
                        ws2.send(JSON.stringify({ type: interface_1.RequestType.SKIP }));
                    }
                    this.room = null;
                }
                // next find karo 
                const partner = yield this.getPartner(this.ws);
                if (!partner) {
                    this.ws.send(JSON.stringify({ type: interface_1.MessageType.FAILURE, payload: { error: interface_1.ErrorType.NO_MATCH_FOUND } }));
                    return;
                }
                // unka room banao;
                // const room = new Room(this,partner);
                // this.room = room;
                this.ws.send(JSON.stringify({ type: interface_1.MessageType.MATCHED }));
                // this creates a room  constructor adds itself to the roomManager 
                // roomManager has a map of Roomid: room;
                // through this we add and delete a room
            }
            // else if(type == RequestType.STOP)
        }));
    }
    getPartner(sender_socket) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("reach-3");
            if (!sender_socket)
                return;
            console.log("reach-4");
            let cnt = 0;
            let partner = null;
            // RoomManager.getInstance().addUser(this.sender as User);
            while (cnt < 100000 && partner == null) {
                console.log("try - " + cnt);
                partner = yield roomManager2_1.RoomManager.getInstance().findMatch(this, null);
                cnt++;
                yield new Promise(resolve => setTimeout(resolve, 2));
            }
            if (partner == null) {
                roomManager2_1.RoomManager.getInstance().removeUser(this);
                sender_socket.send(JSON.stringify({ type: interface_1.MessageType.FAILURE, payload: {
                        error: interface_1.ErrorType.NO_MATCH_FOUND
                    } }));
                return;
            }
            // sender_socket.send(JSON.stringify({type:MessageType.MATCHED, payload: {message: MessageType.MATCHED}}))
            // as soon as client gets this message it creates an RTC peer connection (if not already created);
            // sends an offer to signaling server;
            // recieves an answer from signaling server;
            // connection gets established
            console.log("____________________________________");
            console.log(roomManager2_1.RoomManager.getInstance().getStats());
            console.log("____________________________________");
            this.partner = partner;
            return partner;
        });
    }
}
exports.User = User;
User.count = 0;
