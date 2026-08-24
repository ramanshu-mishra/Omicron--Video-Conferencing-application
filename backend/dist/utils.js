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
exports.getGeoLocation = getGeoLocation;
function getGeoLocation(ip) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Skip geolocation if no API key or localhost IP
            if (!process.env.API_KEY || process.env.API_KEY === 'your_api_key_here' || ip === '127.0.0.1' || ip === '::1') {
                console.log('Skipping geolocation (no API key or localhost)');
                return { location: new Map() };
            }
            const res = yield fetch(`https://api.ipgeolocation.io/v2/ipgeo?apiKey=${process.env.API_KEY}&ip=${ip}`);
            if (!res.ok) {
                console.log('Geolocation API error:', res.status);
                return { location: new Map() };
            }
            const data = yield res.json();
            // Convert to Map format
            const locationMap = new Map();
            if (data.continent_name)
                locationMap.set('continent_name', data.continent_name);
            if (data.country_name)
                locationMap.set('country_name', data.country_name);
            if (data.city)
                locationMap.set('city', data.city);
            if (data.state_prov)
                locationMap.set('state_prov', data.state_prov);
            return { location: locationMap };
        }
        catch (error) {
            console.error('Geolocation fetch error:', error);
            return { location: new Map() };
        }
    });
}
