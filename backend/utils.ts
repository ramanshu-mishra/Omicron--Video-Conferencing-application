export async function getGeoLocation(ip:string){
    const res = await fetch(`https://api.ipgeolocation.io/v2/ipgeo?apiKey=${process.env.API_KEY}&ip=${ip}`);
    const data = await res.json();
    return data;
}


