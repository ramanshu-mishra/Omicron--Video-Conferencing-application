import { Room } from "./room2";
import { User } from "./user";

export class RoomManager{
    static instance:RoomManager;

    roomMap = new Map<string, Room>;
     // Geographic storage maps
        private city: Map<string, User[]> = new Map();
        private state: Map<string, User[]> = new Map();
        private country: Map<string, User[]> = new Map();
        private continent: Map<string, User[]> = new Map();
        private others: Set<User> = new Set();
    
    
        private matched = new Map<User, User>;
        
        private match_mutex = false;
        
        // Tier probabilities (must sum to 100%)
         private tierProbabilities = {
            SAME_CITY: 0.125,        
            SAME_COUNTRY: 0.125,     
            SAME_CONTINENT: 0.25,  
            DIFFERENT_CONTINENT: 0.5  
        };

    
    static getInstance(){
        if(this.instance)return this.instance;
        this.instance = new RoomManager();
        return this.instance;
    }

    constructor(){

    }


    addRoom(room:Room){
        const id = room.id;
        this.roomMap.set(id, room);
    }

    removeRoom(room:Room){
        const id = room.id;
        this.roomMap.delete(id);
    }



addUser(user: User): void {
        // Add user to city map
        if (user.city) {
            const cityKey = `${user.city}-${user.country}`;
            if (!this.city.has(cityKey)) {
                this.city.set(cityKey, []);
            }
            this.city.get(cityKey)!.push(user);
        }

        // Add user to state map
        if (user.state) {
            console.log("state hai bhai");
            const stateKey = `${user.state}-${user.country}`;
            if (!this.state.has(stateKey)) {
                this.state.set(stateKey, []);
            }
            this.state.get(stateKey)!.push(user);
        }

        // Add user to country map
        if (user.country) {
            if (!this.country.has(user.country)) {
                this.country.set(user.country, []);
            }
            this.country.get(user.country)!.push(user);
        }

        // Add user to continent map
        if (user.continent) {
            if (!this.continent.has(user.continent)) {
                this.continent.set(user.continent, []);
            }
            this.continent.get(user.continent)!.push(user);
        }

        // If no geographic data, add to others
        if (!user.city && !user.state && !user.country && !user.continent) {
            this.others.add(user);
        }
    }

   removeUser(user: User): void {
    // Remove from city map (only if user has city data)
    if (user.city && user.country) {
        const cityKey = `${user.city}-${user.country}`;
        const cityUsers = this.city.get(cityKey);
        if (cityUsers) {
            const index = cityUsers.findIndex(u => this.isSameUser(u, user));
            if (index !== -1) {
                cityUsers.splice(index, 1);
                if (cityUsers.length === 0) {
                    this.city.delete(cityKey);
                }
            }
        }
    }

    // Remove from state map (only if user has state data)
    if (user.state && user.country) {
        const stateKey = `${user.state}-${user.country}`;
        const stateUsers = this.state.get(stateKey);
        if (stateUsers) {
            const index = stateUsers.findIndex(u => this.isSameUser(u, user));
            if (index !== -1) {
                stateUsers.splice(index, 1);
                if (stateUsers.length === 0) {
                    this.state.delete(stateKey);
                }
            }
        }
    }

    // Remove from country map (only if user has country data)
    if (user.country) {
        const countryUsers = this.country.get(user.country);
        if (countryUsers) {
            const index = countryUsers.findIndex(u => this.isSameUser(u, user));
            if (index !== -1) {
                countryUsers.splice(index, 1);
                if (countryUsers.length === 0) {
                    this.country.delete(user.country);
                }
            }
        }
    }

    // Remove from continent map (only if user has continent data)
    if (user.continent) {
        const continentUsers = this.continent.get(user.continent);
        if (continentUsers) {
            const index = continentUsers.findIndex(u => this.isSameUser(u, user));
            if (index !== -1) {
                continentUsers.splice(index, 1);
                if (continentUsers.length === 0) {
                    this.continent.delete(user.continent);
                }
            }
        }
    }

    // Remove from others (only if user has no geographic data)
    if (!user.city && !user.state && !user.country && !user.continent) {
        console.log("removing from here boss");
        this.others.delete(user);
    }
}

// Helper method for reliable user comparison
private isSameUser(user1: User, user2: User): boolean {
    // Add a unique ID to User class, or use a combination of fields
    // For now, assuming WebSocket comparison works:
    
    return user1.id == user2.id;
    
    // Better approach would be:
    // return user1.id === user2.id; // if User has unique ID
}

    removeMatched(user:User):void{
        this.matched.delete(user);
        return;
    }



 async findMatch(sender:User, prev:User|null = null){
        if(this.matched.has(sender) && this.matched.get(sender) == prev){
            this.matched.delete(sender);
            this.matched.delete(prev);
        }
       
        this.addUser(sender);
        while(this.match_mutex){
            await new Promise(resolve=>setTimeout(resolve, 1));
        }

        this.match_mutex = true;

        if(this.matched.has(sender)){
            const partner = this.matched.get(sender);
            console.log("_____________matched here____________");
            this.removeUser(sender);
            this.removeUser(partner as User);
            this.removeUser(this.matched.get(sender) as User);
            this.match_mutex = false;
            console.log(this.getStats());
            return this.matched.get(sender) as User;
        }

        const partner = this.findNext(sender,prev);
        
        
        if(!partner){
            this.match_mutex = false;
            return null; 
        }
        this.matched.set(sender,partner);
        this.matched.set(partner,sender);
        this.match_mutex = false;
        console.log("________matched here 2 baby_____________"); // all subsequent people are getting matched somehow this is bad
        // console.log(this.getAllUsers().length);
        return partner;
    }

    findNext(sender: User, prev: User | null = null): User | null {
        const tiers = this.groupUsersByTier(sender);
        const selectedTier = this.selectTier(tiers);
        
        if (!selectedTier || !tiers[selectedTier] || tiers[selectedTier].length === 0) {
            return null;
        }

        const tierUsers = tiers[selectedTier];
        
        // Filter out the sender and previous user (using object reference comparison);

        const availableUsers = tierUsers.filter(user => 
            (user !== sender) && 
            ( user !== prev)
        );

        if (availableUsers.length === 0) {
            return null;
        }

        // Random selection from filtered users
        const randomIndex = Math.floor(Math.random() * availableUsers.length);
        return availableUsers[randomIndex];
    }

    private groupUsersByTier(currentUser: User): Record<string, User[]> {
        const tiers = {
            SAME_CITY: [] as User[],
            SAME_COUNTRY: [] as User[],
            SAME_CONTINENT: [] as User[],
            DIFFERENT_CONTINENT: [] as User[]
        };

        const currentCityKey = currentUser.city ? `${currentUser.city}-${currentUser.country}` : null;
        const currentCountry = currentUser.country;
        const currentContinent = currentUser.continent;

        // Same city users
        if (currentCityKey && this.city.has(currentCityKey)) {
            tiers.SAME_CITY = [...this.city.get(currentCityKey)!];
        }

        // Same country users (excluding same city)
        if (currentCountry && this.country.has(currentCountry)) {
            const countryUsers = this.country.get(currentCountry)!;
            tiers.SAME_COUNTRY = countryUsers.filter(user => {
                const userCityKey = user.city ? `${user.city}-${user.country}` : null;
                return userCityKey !== currentCityKey; // Exclude same city users
            });
        }

        // Same continent users (excluding same country)
        if (currentContinent && this.continent.has(currentContinent)) {
            const continentUsers = this.continent.get(currentContinent)!;
            tiers.SAME_CONTINENT = continentUsers.filter(user => 
                user.country !== currentCountry // Exclude same country users
            );
        }

        // Different continent users
        for (const [continentName, users] of this.continent.entries()) {
            if (continentName !== currentContinent) {
                tiers.DIFFERENT_CONTINENT.push(...users);
            }
        }

        // Add users with no geographic data to different continent
        tiers.DIFFERENT_CONTINENT.push(...this.others);

        return tiers;
    }

    private selectTier(tiers: Record<string, User[]>): string | null {
        // Create list of available tiers (that have users)
        const availableTiers: Array<{name: string, probability: number, normalizedProbability?: number}> = [];
        let totalProbability = 0;

        for (const [tierName, users] of Object.entries(tiers)) {
            if (users.length > 0) {
                const probability = this.tierProbabilities[tierName as keyof typeof this.tierProbabilities];
                availableTiers.push({ name: tierName, probability });
                totalProbability += probability;
            }
        }

        if (availableTiers.length === 0) {
            return null;
        }

        // Normalize probabilities for available tiers only
        availableTiers.forEach(tier => {
            tier.normalizedProbability = tier.probability / totalProbability;
        });

        // Select tier using weighted random
        const random = Math.random();
        let cumulativeProbability = 0;

        for (const tier of availableTiers) {
            cumulativeProbability += tier.normalizedProbability!;
            if (random <= cumulativeProbability) {
                return tier.name;
            }
        }

        // Fallback to first available tier
        return availableTiers[0]?.name || null;
    }

    // Debug methods
    getStats(): Record<string, any> {
        return {
            totalCities: this.city.size,
            totalStates: this.state.size,
            totalCountries: this.country.size,
            totalContinents: this.continent.size,
            othersCount: this.others.size,
            cityUsers: Array.from(this.city.entries()).reduce((sum, [_, users]) => sum + users.length, 0),
            stateUsers: Array.from(this.state.entries()).reduce((sum, [_, users]) => sum + users.length, 0),
            countryUsers: Array.from(this.country.entries()).reduce((sum, [_, users]) => sum + users.length, 0),
            continentUsers: Array.from(this.continent.entries()).reduce((sum, [_, users]) => sum + users.length, 0)
        };
    }

    getAllUsers(): User[] {
        const allUsers = new Set<User>();
        
        // Add from all maps
        this.city.forEach(users => users.forEach(user => allUsers.add(user)));
        this.state.forEach(users => users.forEach(user => allUsers.add(user)));
        this.country.forEach(users => users.forEach(user => allUsers.add(user)));
        this.continent.forEach(users => users.forEach(user => allUsers.add(user)));
        this.others.forEach(user => allUsers.add(user));
        
        return Array.from(allUsers);
    }

}