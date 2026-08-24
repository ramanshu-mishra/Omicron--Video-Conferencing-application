export async function getGeoLocation(ip:string){
    try {
        // Skip geolocation if no API key or localhost IP
        if (!process.env.API_KEY || process.env.API_KEY === 'your_api_key_here' || ip === '127.0.0.1' || ip === '::1') {
            console.log('Skipping geolocation (no API key or localhost)');
            return { location: new Map() };
        }
        
        const res = await fetch(`https://api.ipgeolocation.io/v2/ipgeo?apiKey=${process.env.API_KEY}&ip=${ip}`);
        
        if (!res.ok) {
            console.log('Geolocation API error:', res.status);
            return { location: new Map() };
        }
        
        const data = await res.json();
        
        // Convert to Map format
        const locationMap = new Map();
        if (data.continent_name) locationMap.set('continent_name', data.continent_name);
        if (data.country_name) locationMap.set('country_name', data.country_name);
        if (data.city) locationMap.set('city', data.city);
        if (data.state_prov) locationMap.set('state_prov', data.state_prov);
        
        return { location: locationMap };
    } catch (error) {
        console.error('Geolocation fetch error:', error);
        return { location: new Map() };
    }
}


