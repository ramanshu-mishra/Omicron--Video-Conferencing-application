import { WebSocket } from "ws";
import crypto from "crypto";
export class User{
    static count = 0;
    id:string;
    ws:WebSocket|null = null;
    city: string|null = null;
    state:string|null = null;
    country:string|null = null;
    continent:string|null = null;
    constructor(){
        const cuid = User.generateCUID();
        this.id = cuid;
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
}