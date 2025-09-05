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
exports.RoomManager = void 0;
class RoomManager {
    static getInstance() {
        if (this.instance)
            return this.instance;
        this.instance = new RoomManager();
        return this.instance;
    }
    constructor() {
        this.roomMap = new Map;
        // Geographic storage maps
        this.city = new Map();
        this.state = new Map();
        this.country = new Map();
        this.continent = new Map();
        this.others = new Set();
        this.matched = new Map;
        this.match_mutex = false;
        // Tier probabilities (must sum to 100%)
        this.tierProbabilities = {
            SAME_CITY: 0.125,
            SAME_COUNTRY: 0.125,
            SAME_CONTINENT: 0.25,
            DIFFERENT_CONTINENT: 0.5
        };
    }
    addRoom(room) {
        const id = room.id;
        this.roomMap.set(id, room);
    }
    removeRoom(room) {
        const id = room.id;
        this.roomMap.delete(id);
    }
    addUser(user) {
        // Add user to city map
        if (user.city) {
            const cityKey = `${user.city}-${user.country}`;
            if (!this.city.has(cityKey)) {
                this.city.set(cityKey, []);
            }
            this.city.get(cityKey).push(user);
        }
        // Add user to state map
        if (user.state) {
            console.log("state hai bhai");
            const stateKey = `${user.state}-${user.country}`;
            if (!this.state.has(stateKey)) {
                this.state.set(stateKey, []);
            }
            this.state.get(stateKey).push(user);
        }
        // Add user to country map
        if (user.country) {
            if (!this.country.has(user.country)) {
                this.country.set(user.country, []);
            }
            this.country.get(user.country).push(user);
        }
        // Add user to continent map
        if (user.continent) {
            if (!this.continent.has(user.continent)) {
                this.continent.set(user.continent, []);
            }
            this.continent.get(user.continent).push(user);
        }
        // If no geographic data, add to others
        if (!user.city && !user.state && !user.country && !user.continent) {
            this.others.add(user);
        }
    }
    removeUser(user) {
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
    isSameUser(user1, user2) {
        // Add a unique ID to User class, or use a combination of fields
        // For now, assuming WebSocket comparison works:
        return user1.id == user2.id;
        // Better approach would be:
        // return user1.id === user2.id; // if User has unique ID
    }
    removeMatched(user) {
        this.matched.delete(user);
        return;
    }
    findMatch(sender_1) {
        return __awaiter(this, arguments, void 0, function* (sender, prev = null) {
            if (this.matched.has(sender) && this.matched.get(sender) == prev) {
                this.matched.delete(sender);
                this.matched.delete(prev);
            }
            this.addUser(sender);
            while (this.match_mutex) {
                yield new Promise(resolve => setTimeout(resolve, 1));
            }
            this.match_mutex = true;
            if (this.matched.has(sender)) {
                console.log("_____________matched here____________");
                this.removeUser(sender);
                this.removeUser(this.matched.get(sender));
                this.match_mutex = false;
                console.log(this.getStats());
                return this.matched.get(sender);
            }
            const partner = this.findNext(sender, prev);
            if (!partner) {
                this.match_mutex = false;
                return null;
            }
            this.matched.set(sender, partner);
            this.matched.set(partner, sender);
            this.match_mutex = false;
            console.log("________matched here 2 baby_____________"); // all subsequent people are getting matched somehow this is bad
            // console.log(this.getAllUsers().length);
            return partner;
        });
    }
    findNext(sender, prev = null) {
        const tiers = this.groupUsersByTier(sender);
        const selectedTier = this.selectTier(tiers);
        if (!selectedTier || !tiers[selectedTier] || tiers[selectedTier].length === 0) {
            return null;
        }
        const tierUsers = tiers[selectedTier];
        // Filter out the sender and previous user (using object reference comparison);
        const availableUsers = tierUsers.filter(user => (user !== sender) &&
            (user !== prev));
        if (availableUsers.length === 0) {
            return null;
        }
        // Random selection from filtered users
        const randomIndex = Math.floor(Math.random() * availableUsers.length);
        return availableUsers[randomIndex];
    }
    groupUsersByTier(currentUser) {
        const tiers = {
            SAME_CITY: [],
            SAME_COUNTRY: [],
            SAME_CONTINENT: [],
            DIFFERENT_CONTINENT: []
        };
        const currentCityKey = currentUser.city ? `${currentUser.city}-${currentUser.country}` : null;
        const currentCountry = currentUser.country;
        const currentContinent = currentUser.continent;
        // Same city users
        if (currentCityKey && this.city.has(currentCityKey)) {
            tiers.SAME_CITY = [...this.city.get(currentCityKey)];
        }
        // Same country users (excluding same city)
        if (currentCountry && this.country.has(currentCountry)) {
            const countryUsers = this.country.get(currentCountry);
            tiers.SAME_COUNTRY = countryUsers.filter(user => {
                const userCityKey = user.city ? `${user.city}-${user.country}` : null;
                return userCityKey !== currentCityKey; // Exclude same city users
            });
        }
        // Same continent users (excluding same country)
        if (currentContinent && this.continent.has(currentContinent)) {
            const continentUsers = this.continent.get(currentContinent);
            tiers.SAME_CONTINENT = continentUsers.filter(user => user.country !== currentCountry // Exclude same country users
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
    selectTier(tiers) {
        var _a;
        // Create list of available tiers (that have users)
        const availableTiers = [];
        let totalProbability = 0;
        for (const [tierName, users] of Object.entries(tiers)) {
            if (users.length > 0) {
                const probability = this.tierProbabilities[tierName];
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
            cumulativeProbability += tier.normalizedProbability;
            if (random <= cumulativeProbability) {
                return tier.name;
            }
        }
        // Fallback to first available tier
        return ((_a = availableTiers[0]) === null || _a === void 0 ? void 0 : _a.name) || null;
    }
    // Debug methods
    getStats() {
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
    getAllUsers() {
        const allUsers = new Set();
        // Add from all maps
        this.city.forEach(users => users.forEach(user => allUsers.add(user)));
        this.state.forEach(users => users.forEach(user => allUsers.add(user)));
        this.country.forEach(users => users.forEach(user => allUsers.add(user)));
        this.continent.forEach(users => users.forEach(user => allUsers.add(user)));
        this.others.forEach(user => allUsers.add(user));
        return Array.from(allUsers);
    }
}
exports.RoomManager = RoomManager;
