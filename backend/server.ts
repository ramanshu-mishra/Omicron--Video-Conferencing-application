import { WebSocketServer } from "ws";
import dotenv from "dotenv";
import { getGeoLocation } from "./utils";
import { User } from "./user";

dotenv.config();

const wss = new WebSocketServer({port:8080}, ()=>{
    console.log("WebSocket Server running at "+wss.options.port );
});

wss.on("connection", async(ws, req)=>{
    const directIp = req.socket.remoteAddress;
    const cleanIp = directIp?.replace("::ffff:", "");
     const forwardedIP = req.headers['x-forwarded-for'] || 
                      req.headers['x-real-ip'];
    const finalIp:string = cleanIp || forwardedIP as string;
  
    const geoLocation= await getGeoLocation(finalIp);
    console.log(geoLocation);  
    //  either it will fetch some location or not;
    const user = new User(ws);
    
    if(geoLocation.location){
        if(geoLocation.location.has("continent_name")){
            user.continent = geoLocation.location.get("continent_name");
        }
        if(geoLocation.location.has("country_name")){
            user.country = geoLocation.location.get("country_name");
        }
        if(geoLocation.location.has("city")){
            user.city = geoLocation.location.get("city");
        }
        if(geoLocation.location.has("state_prov")){
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
});


// okay so now there will be a priority based user selection also the users with more weight time should get a priority boost .. I think it will be a little complex. 






