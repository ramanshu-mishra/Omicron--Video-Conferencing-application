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
const ws_1 = require("ws");
const dotenv_1 = __importDefault(require("dotenv"));
const utils_1 = require("./utils");
const user_1 = require("./user");
dotenv_1.default.config();
const wss = new ws_1.WebSocketServer({ port: 8080 }, () => {
    console.log("WebSocket Server running at " + wss.options.port);
});
wss.on("connection", (ws, req) => __awaiter(void 0, void 0, void 0, function* () {
    const directIp = req.socket.remoteAddress;
    const cleanIp = directIp === null || directIp === void 0 ? void 0 : directIp.replace("::ffff:", "");
    const forwardedIP = req.headers['x-forwarded-for'] ||
        req.headers['x-real-ip'];
    const finalIp = cleanIp || forwardedIP;
    const geoLocation = yield (0, utils_1.getGeoLocation)(finalIp);
    console.log(geoLocation);
    //  either it will fetch some location or not;
    const user = new user_1.User(ws);
    if (geoLocation.location) {
        if (geoLocation.location.has("continent_name")) {
            user.continent = geoLocation.location.get("continent_name");
        }
        if (geoLocation.location.has("country_name")) {
            user.country = geoLocation.location.get("country_name");
        }
        if (geoLocation.location.has("city")) {
            user.city = geoLocation.location.get("city");
        }
        if (geoLocation.location.has("state_prov")) {
            user.state = geoLocation.location.get("state_prov");
        }
    }
    console.log("reach-1");
    // okay so the webSocket connection establishes but it starts finding new people only when we press start;
    // once press start WebSocket will place the user into a bunch of available users;
    // we'll start getting a match;
    //  if we get a match I'll create Room for both parties;
    // if anyone of them leaves ;
    // the connection gets deestablished between the peers;
    // so client sends a finNext request
    // existing room gets disconnected and new room establishes with a new partner;
}));
// okay so now there will be a priority based user selection also the users with more weight time should get a priority boost .. I think it will be a little complex. 
