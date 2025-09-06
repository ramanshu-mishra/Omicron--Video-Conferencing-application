module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/app/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>VideoChat)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
// Interface definitions (match your backend)
var MessageType = /*#__PURE__*/ function(MessageType) {
    MessageType["MATCHED"] = "MATCHED";
    MessageType["FAILURE"] = "FAILURE";
    return MessageType;
}(MessageType || {});
var RequestType = /*#__PURE__*/ function(RequestType) {
    RequestType["OFFER"] = "OFFER";
    RequestType["ANSWER"] = "ANSWER";
    RequestType["ADD_ICE_CANDIDATES"] = "ADD_ICE_CANDIDATES";
    RequestType["FIND_NEXT"] = "FIND_NEXT";
    RequestType["SKIP"] = "SKIP";
    RequestType["STOP"] = "STOP";
    return RequestType;
}(RequestType || {});
var ErrorType = /*#__PURE__*/ function(ErrorType) {
    ErrorType["NO_MATCH_FOUND"] = "NO_MATCH_FOUND";
    ErrorType["INVALID_PAYLOAD"] = "INVALID_PAYLOAD";
    return ErrorType;
}(ErrorType || {});
function VideoChat() {
    const localVideoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const remoteVideoRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [connected, setConnected] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [searching, setSearching] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const peerConnection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ws = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const localStream = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [connectionState, setConnectionState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('new');
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])('');
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        initializeWebSocket();
        getLocalStream();
        return ()=>{
            cleanup();
        };
    }, []);
    function initializeWebSocket() {
        try {
            const socket = new WebSocket("ws://localhost:8080");
            ws.current = socket;
            socket.onopen = ()=>{
                console.log("WebSocket connected");
                setError('');
            };
            socket.onmessage = async (e)=>{
                try {
                    const data = JSON.parse(e.data.toString());
                    const type = data.type;
                    if (!type) {
                        console.log("Message without type received");
                        return;
                    }
                    console.log("Received message:", type);
                    switch(type){
                        case "SKIP":
                            console.log("Partner skipped");
                            handlePartnerDisconnect();
                            break;
                        case "MATCHED":
                            console.log("Matched with partner");
                            setSearching(false);
                            await initializePeerConnection();
                            break;
                        case "OFFER":
                            const offer = data.payload?.offer;
                            if (offer) {
                                console.log("Offer received");
                                await handleOffer(offer);
                            }
                            break;
                        case "ANSWER":
                            const answer = data.payload?.answer;
                            if (answer) {
                                console.log("Answer received");
                                await handleAnswer(answer);
                            }
                            break;
                        case "ADD_ICE_CANDIDATES":
                            const candidate = data.payload?.sdp;
                            if (candidate) {
                                console.log("ICE candidate received");
                                await handleIceCandidate(candidate);
                            }
                            break;
                        case "FAILURE":
                            const errorMsg = data.payload?.error || data.error || 'Unknown error';
                            console.log("Server error:", errorMsg);
                            setError(errorMsg);
                            setSearching(false);
                            // Don't disconnect on ICE candidate errors
                            if (errorMsg !== "INVALID_PAYLOAD") {
                                handleError(errorMsg);
                            }
                            break;
                        default:
                            console.log("Unknown message type:", data);
                    }
                } catch (err) {
                    console.error("Error parsing WebSocket message:", err);
                }
            };
            socket.onerror = (error)=>{
                console.error("WebSocket error:", error);
                setError("Connection error");
                setSearching(false);
            };
            socket.onclose = ()=>{
                console.log("WebSocket disconnected");
                setError("Disconnected from server");
            };
        } catch (err) {
            console.error("Error initializing WebSocket:", err);
            setError("Failed to connect to server");
        }
    }
    async function getLocalStream() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: {
                        ideal: 1280
                    },
                    height: {
                        ideal: 720
                    },
                    facingMode: 'user'
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true
                }
            });
            localStream.current = stream;
            // Wait for video element to be available
            let attempts = 0;
            while(!localVideoRef.current && attempts < 100){
                await new Promise((resolve)=>setTimeout(resolve, 50));
                attempts++;
            }
            if (localVideoRef.current) {
                localVideoRef.current.srcObject = stream;
            }
            console.log("Local stream acquired");
        } catch (error) {
            console.error("Error accessing media devices:", error);
            setError("Camera/microphone access denied");
        }
    }
    async function initializePeerConnection() {
        try {
            // Clean up existing connection
            if (peerConnection.current) {
                peerConnection.current.close();
            }
            // Create new peer connection
            const pc = new RTCPeerConnection({
                iceServers: [
                    {
                        urls: 'stun:stun.l.google.com:19302'
                    }
                ]
            });
            peerConnection.current = pc;
            // Add local stream tracks
            if (localStream.current) {
                localStream.current.getTracks().forEach((track)=>{
                    pc.addTrack(track, localStream.current);
                });
                console.log("Local tracks added");
            }
            // Set up event handlers
            setupPeerConnectionHandlers(pc);
            console.log("Peer connection initialized");
        } catch (error) {
            console.error("Error initializing peer connection:", error);
            setError("Failed to initialize connection");
        }
    }
    function setupPeerConnectionHandlers(pc) {
        // Handle remote stream
        pc.ontrack = (event)=>{
            console.log("Remote track received:", event.track.kind);
            if (remoteVideoRef.current && event.streams[0]) {
                remoteVideoRef.current.srcObject = event.streams[0];
                setConnected(true);
                setError('');
            }
        };
        // Handle ICE candidates - FIXED: Only send non-null candidates
        pc.onicecandidate = (event)=>{
            // Only send actual candidates, not the null "end-of-candidates" signal
            if (event.candidate && ws.current && ws.current.readyState === WebSocket.OPEN) {
                console.log("Sending ICE candidate");
                ws.current.send(JSON.stringify({
                    type: "ADD_ICE_CANDIDATES",
                    payload: {
                        sdp: event.candidate,
                        id: 1
                    }
                }));
            } else if (!event.candidate) {
                console.log("ICE gathering complete (null candidate - not sending)");
            }
        };
        // Handle connection state changes
        pc.onconnectionstatechange = ()=>{
            const state = pc.connectionState;
            setConnectionState(state);
            console.log("Connection state:", state);
            if (state === 'connected') {
                setConnected(true);
                setError('');
            } else if (state === 'disconnected') {
                setConnected(false);
            } else if (state === 'failed') {
                setConnected(false);
                setError('Connection failed');
            } else if (state === 'closed') {
                setConnected(false);
            }
        };
        // Handle negotiation needed (for creating offers)
        pc.onnegotiationneeded = async ()=>{
            try {
                console.log("Creating offer");
                const offer = await pc.createOffer();
                await pc.setLocalDescription(offer);
                if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                    ws.current.send(JSON.stringify({
                        type: "OFFER",
                        payload: {
                            offer
                        }
                    }));
                    console.log("Offer sent");
                }
            } catch (error) {
                console.error("Error creating offer:", error);
                setError("Failed to create offer");
            }
        };
    }
    async function handleOffer(offer) {
        try {
            if (!peerConnection.current) {
                await initializePeerConnection();
            }
            const pc = peerConnection.current;
            await pc.setRemoteDescription(new RTCSessionDescription(offer));
            console.log("Remote description set");
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            if (ws.current && ws.current.readyState === WebSocket.OPEN) {
                ws.current.send(JSON.stringify({
                    type: "ANSWER",
                    payload: {
                        answer
                    }
                }));
                console.log("Answer sent");
            }
        } catch (error) {
            console.error("Error handling offer:", error);
            setError("Failed to handle offer");
        }
    }
    async function handleAnswer(answer) {
        try {
            if (peerConnection.current && peerConnection.current.remoteDescription === null) {
                await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
                console.log("Answer processed");
            } else {
                console.log("Answer received but remote description already set or no PC");
            }
        } catch (error) {
            console.error("Error handling answer:", error);
        }
    }
    async function handleIceCandidate(candidate) {
        try {
            if (peerConnection.current && peerConnection.current.remoteDescription) {
                await peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
                console.log("ICE candidate added");
            } else {
                console.log("ICE candidate received before remote description");
            }
        } catch (error) {
            console.error("Error adding ICE candidate:", error);
        }
    }
    function handleNext() {
        if (!ws.current || ws.current.readyState !== WebSocket.OPEN) {
            setError("Not connected to server");
            return;
        }
        if (!started) {
            setStarted(true);
        }
        setSearching(true);
        setError('');
        handlePartnerDisconnect();
        ws.current.send(JSON.stringify({
            type: "FIND_NEXT",
            payload: {}
        }));
        console.log("Searching for partner...");
    }
    function handleStop() {
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.send(JSON.stringify({
                type: "STOP",
                payload: {}
            }));
        }
        handlePartnerDisconnect();
        setStarted(false);
        setSearching(false);
        setError('');
    }
    function handlePartnerDisconnect() {
        setConnected(false);
        setConnectionState('new');
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = null;
        }
    }
    function handleError(error) {
        console.error("Handling error:", error);
        handlePartnerDisconnect();
        setSearching(false);
    }
    function cleanup() {
        if (peerConnection.current) {
            peerConnection.current.close();
            peerConnection.current = null;
        }
        if (localStream.current) {
            localStream.current.getTracks().forEach((track)=>track.stop());
            localStream.current = null;
        }
        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
            ws.current.close();
        }
    }
    function getStatusText() {
        if (error) return error;
        if (searching) return "Searching for partner...";
        if (connected) return "Connected";
        if (started) return "Ready";
        return "Click START to begin";
    }
    function getStatusColor() {
        if (error) return "text-red-600";
        if (searching) return "text-yellow-600";
        if (connected) return "text-green-600";
        return "text-gray-600";
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-screen w-screen bg-gray-900 flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 flex justify-center items-center p-4 gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-1/2 h-full max-h-96 bg-gray-800 rounded-xl overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                ref: remoteVideoRef,
                                autoPlay: true,
                                playsInline: true,
                                className: "w-full h-full object-cover"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 420,
                                columnNumber: 11
                            }, this),
                            !connected && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute inset-0 flex items-center justify-center",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-center text-white",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-lg mb-2",
                                            children: "Partner Video"
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 429,
                                            columnNumber: 17
                                        }, this),
                                        searching && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "animate-spin rounded-full h-8 w-8 border-b-2 border-white"
                                            }, void 0, false, {
                                                fileName: "[project]/app/page.tsx",
                                                lineNumber: 432,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/app/page.tsx",
                                            lineNumber: 431,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/page.tsx",
                                    lineNumber: 428,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 427,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 419,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative w-1/2 h-full max-h-96 bg-gray-800 rounded-xl overflow-hidden",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                ref: localVideoRef,
                                muted: true,
                                autoPlay: true,
                                playsInline: true,
                                className: "w-full h-full object-cover scale-x-[-1]"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 442,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm",
                                children: "You"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 449,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 441,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 417,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "bg-gray-800 p-4 flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `px-6 py-3 rounded-lg font-semibold transition-all ${searching ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95'} text-white`,
                                onClick: handleNext,
                                disabled: searching,
                                children: searching ? "Searching..." : started ? "NEXT" : "START"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 458,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold transition-all active:scale-95",
                                onClick: handleStop,
                                children: "STOP"
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 470,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 457,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-right",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `text-sm font-medium ${getStatusColor()}`,
                                children: getStatusText()
                            }, void 0, false, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 479,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs text-gray-400 mt-1",
                                children: [
                                    "State: ",
                                    connectionState
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/page.tsx",
                                lineNumber: 482,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 478,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 456,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 415,
        columnNumber: 5
    }, this);
}
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    if ("TURBOPACK compile-time falsy", 0) {
        "TURBOPACK unreachable";
    } else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else {
                "TURBOPACK unreachable";
            }
        } else {
            "TURBOPACK unreachable";
        }
    }
} //# sourceMappingURL=module.compiled.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
"use strict";
module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__e0b35bea._.js.map