# Omicron 🎥

**Location-based random video chat — think Omegle, but you're more likely to meet someone nearby.**

Live at [talksy.fun](https://talksy.fun)

Omicron pairs strangers over live video using WebRTC, with a signaling server that prefers to match you with people close to you geographically (same city → same country → same continent → anywhere) before falling back to a fully random match.

---

## Table of Contents

- [How It Works](#how-it-works)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Matching Algorithm](#matching-algorithm)
- [WebSocket Signaling Protocol](#websocket-signaling-protocol)
- [Environment Variables](#environment-variables)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## How It Works

1. A user opens the client and the browser opens a WebSocket connection to the signaling server.
2. The server resolves the client's IP to a city / state / country / continent using an IP geolocation API.
3. When the user clicks **Start**, the server looks for a partner using the [matching algorithm](#matching-algorithm) below.
4. Once two users are matched, the server creates a `Room` that relays WebRTC signaling messages (SDP offers/answers and ICE candidates) between the two peers.
5. The browsers establish a direct peer-to-peer WebRTC connection (using STUN/TURN for NAT traversal) and stream audio/video directly to each other — the server only brokers the handshake, not the media.
6. Either user can hit **Next** (find a new partner) or **Stop** (end the call), which tears down the room and, for "Next", re-enters the matching pool.

## Tech Stack

**Backend (signaling server)**
- Node.js + TypeScript
- [`ws`](https://github.com/websockets/ws) — WebSocket server
- [ipgeolocation.io](https://ipgeolocation.io) — IP → location lookup
- In-memory matching engine (no database — nothing about a session is persisted)

**Frontend (client)**
- [Next.js 15](https://nextjs.org) (App Router) + React 19 + TypeScript
- Native browser **WebRTC** API (`RTCPeerConnection`) for peer-to-peer video/audio
- STUN/TURN servers (Google STUN + a self-hosted `turn.talksy.fun` TURN server) for NAT traversal
- Tailwind CSS v4
- [Motion](https://motion.dev) for animation, [Lucide](https://lucide.dev) for icons
- Vercel Analytics

## Project Structure

```
Omicron--Video-Conferencing-application/
├── backend/                  # WebSocket signaling server (TypeScript)
│   ├── server.ts             # Entry point — starts the WS server, resolves geolocation per connection
│   ├── user.ts                # Represents a connected client + its message handlers
│   ├── room2.ts               # Active Room implementation — relays OFFER/ANSWER/ICE between two matched users
│   ├── roomManager2.ts        # Active RoomManager — tracks open rooms
│   ├── RoomManager.ts         # Geo-tiered matching engine (city/country/continent probability weighting)
│   ├── room.ts                # Earlier Room implementation (superseded by room2.ts)
│   ├── interface.ts           # Shared enums: MessageType, ErrorType, RequestType
│   ├── utils.ts                # IP → geolocation lookup helper
│   └── plan.md                 # Original design notes
│
└── omicron-client/           # Next.js frontend
    ├── app/
    │   ├── page.tsx            # Main video chat UI + WebRTC/WebSocket client logic
    │   ├── layout.tsx
    │   └── globals.css
    ├── components/
    │   └── noise.tsx            # Animated canvas background
    ├── interface.ts             # Mirrors backend/interface.ts (shared message contract)
    └── public/, assets/         # Static assets
```

> **Note:** the backend currently has two generations of the room/matching code (`RoomManager.ts`/`room.ts` and `roomManager2.ts`/`room2.ts`). `user.ts` wires up the `*2` versions, which implement the geo-tiered matching described below.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) 18+
- npm (or yarn/pnpm/bun)
- An [ipgeolocation.io](https://ipgeolocation.io) API key *(optional — the server works without one, it just skips geolocation and treats everyone as "no location", so matching falls back to fully random)*

### Backend Setup

```bash
cd backend
npm install

# create a .env file
echo "API_KEY=your_ipgeolocation_api_key" > .env

# run in dev mode (auto-restarts on change)
npm run dev
```

The signaling server starts on **`ws://localhost:8080`**.

Other backend scripts:
```bash
npm run build   # compile TypeScript -> dist/
npm run start   # run the compiled server (node dist/server.js)
```

### Frontend Setup

```bash
cd omicron-client
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> The client currently connects to a **hardcoded** `ws://localhost:8080` signaling server address (see `app/page.tsx`), and uses a hardcoded TURN server (`turn.talksy.fun`) for ICE. For your own deployment you'll want to make both configurable via environment variables and stand up your own STUN/TURN server (e.g. [coturn](https://github.com/coturn/coturn)).

## Matching Algorithm

Matching is handled by a singleton `RoomManager` that buckets waiting users into maps keyed by city, state, country, and continent. When a user starts looking for a partner, a tier is chosen using weighted random selection, then a random available user from that tier is picked:

| Tier | Probability |
|---|---|
| Same city | 50% |
| Same country (excluding same city) | 25% |
| Same continent (excluding same country) | 12.5% |
| Different continent / unknown location | 12.5% |

If a tier has no users available, its probability is redistributed among the remaining non-empty tiers so a match can still be found. If literally no one is available, the client is told `NO_MATCH_FOUND` and the client (currently) retries.

## WebSocket Signaling Protocol

All messages are JSON with a `type` field (and a `payload` for signaling messages), backed by shared enums in `interface.ts`:

**Client → Server**
| Type | Purpose |
|---|---|
| `FIND_NEXT` | Leave the current room (if any) and look for a new partner |
| `STOP` | End the current call |
| `OFFER` | Forward a WebRTC SDP offer to the matched partner |
| `ANSWER` | Forward a WebRTC SDP answer to the matched partner |
| `ADD_ICE_CANDIDATES` | Forward an ICE candidate to the matched partner |

**Server → Client**
| Type | Purpose |
|---|---|
| `MATCHED` | A partner was found — the client should start the WebRTC handshake |
| `SKIP` | The partner left/skipped — the room has been closed |
| `FAILURE` | Something went wrong (see `ErrorType`: `NO_MATCH_FOUND`, `INVALID_PAYLOAD`, `NON_JSON_FORMAT`, etc.) |

## Environment Variables

| Variable | Where | Description |
|---|---|---|
| `API_KEY` | `backend/.env` | API key for [ipgeolocation.io](https://ipgeolocation.io). If unset (or left as the placeholder), the server skips geolocation and matches users randomly instead of by proximity. |

## Roadmap

- Configurable signaling/TURN server URLs instead of hardcoded `localhost`/`talksy.fun`
- Priority-based matching that gives longer-waiting users a boost
- Clean-up/consolidation of the duplicate `Room`/`RoomManager` implementations

## Contributing

Issues and pull requests are welcome. If you're proposing a larger change, please open an issue first to discuss what you'd like to change.

## License

No license has been declared for this repository yet.