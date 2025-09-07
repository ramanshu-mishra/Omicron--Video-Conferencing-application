module.exports = {

"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}}),
"[project]/interface.ts [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "ErrorType": (()=>ErrorType),
    "MessageType": (()=>MessageType),
    "RequestType": (()=>RequestType)
});
var MessageType = /*#__PURE__*/ function(MessageType) {
    MessageType["SUCCESS"] = "SUCCESS";
    MessageType["FAILURE"] = "FAILURE";
    MessageType["OFFER"] = "OFFER";
    MessageType["ANSWER"] = "ANSWER";
    MessageType["MATCHED"] = "MATCHED";
    return MessageType;
}({});
var ErrorType = /*#__PURE__*/ function(ErrorType) {
    ErrorType["NON_JSON_FORMAT"] = "NON_JSON_FORMAT";
    ErrorType["INVALID_PAYLOAD"] = "INVALID_PAYLOAD";
    ErrorType["SENDER_UNIDENTIFIED"] = "SENDER_UNIDENTIFIED";
    ErrorType["RECIEVER_UNIDENTIFIED"] = "RECIEVER_UNIDENTIFIED";
    ErrorType["NO_USERS"] = "NO_USERS";
    ErrorType["NO_MATCH_FOUND"] = "NO_MATCH_FOUND";
    return ErrorType;
}({});
var RequestType = /*#__PURE__*/ function(RequestType) {
    RequestType["SKIP"] = "SKIP";
    RequestType["SET_SENDER"] = "SET_SENDER";
    RequestType["SET_RECIEVER"] = "SET_RECIEVER";
    RequestType["OFFER"] = "OFFER";
    RequestType["ANSWER"] = "ANSWER";
    RequestType["ADD_ICE_CANDIDATES"] = "ADD_ICE_CANDIDATES";
    RequestType["FIND_NEXT"] = "FIND_NEXT";
    RequestType["STOP"] = "STOP";
    return RequestType;
}({});
}}),
"[project]/app/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Page)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/interface.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
function Page() {
    const [lobby, setLobby] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const senderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const recieverRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [localStream, setLocalStream] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [remoteStream, setRemoteStream] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const ws = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const senderPc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const recieverPc = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const localPlayed = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (localPlayed.current) return;
        if (senderRef.current) {
            init_localStream().then((stream)=>{
                if (senderRef.current && stream) {
                    senderRef.current.srcObject = stream;
                    senderRef.current.play();
                    localPlayed.current = true;
                }
            });
        }
    }, [
        senderRef.current
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!ws.current || ws.current.readyState == ws.current.CLOSED) {
            const socket = new WebSocket("ws://localhost:8080");
            ws.current = socket;
            init_socketHandlers(socket);
        }
    }, [
        ws.current
    ]);
    function cleanupPeer(pc) {
        if (!pc) return;
        try {
            pc.onicecandidate = null;
            pc.ontrack = null;
            pc.onnegotiationneeded = null;
            // pc.getSenders().forEach((s) => {
            //   try {
            //     if (s.track) s.track.stop();
            //   } catch {}
            // });
            pc.close();
        } catch  {}
    }
    function init_socketHandlers(socket) {
        socket.onmessage = (e)=>{
            const data = JSON.parse(e.data.toString());
            const type = data.type;
            if (type == __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MessageType"].MATCHED) {
                sendOffer(socket);
            } else if (type == __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].OFFER) {
                const offer = data.payload.offer;
                handleOffer(offer, socket);
            } else if (type == __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].ADD_ICE_CANDIDATES) {
                const sdp = data.payload.sdp;
                const id = data.payload.id;
                if (sdp && id) handleiceCandidates(sdp, id);
            } else if (type == __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].ANSWER) {
                const answer = data.payload.answer;
                handleAnswer(answer);
            } else if (type == __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].SKIP) {
                handleSkip();
            } else {
                console.log(data);
            }
        };
    }
    async function handleSkip() {
        await new Promise((resolve)=>setTimeout(resolve, 200));
        console.log("partner skipped");
        handleNext(__TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].SKIP);
    }
    async function sendOffer(socket) {
        const stream = await init_localStream();
        if (!stream) {
            console.log("no localStream");
            return;
        }
        const pc = new RTCPeerConnection();
        try {
            stream.getTracks().forEach((track)=>pc.addTrack(track, stream));
        } catch (e) {
            console.log(e);
        }
        pc.onicecandidate = (e)=>{
            const sdp = e.candidate;
            if (sdp && ws.current) {
                ws.current.send(JSON.stringify({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].ADD_ICE_CANDIDATES,
                    payload: {
                        sdp,
                        id: 1
                    }
                }));
            }
        };
        // pc.onnegotiationneeded = async()=>{
        //     const offer = await pc.createOffer();
        //     await pc.setLocalDescription(offer);
        //     if(ws.current && ws.current.readyState == ws.current?.OPEN){
        //       ws.current.send(JSON.stringify({type: RequestType.OFFER,payload: {offer}}))
        //     }
        //     console.log("offer sent");
        // }
        pc.onconnectionstatechange = ()=>{
            console.log("connection state: " + pc.connectionState);
            if (pc.connectionState == "connected") {
                setLobby(false);
            }
            return;
        };
        senderPc.current = pc;
        const offer = await senderPc.current.createOffer();
        await senderPc.current.setLocalDescription(offer);
        socket.send(JSON.stringify({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].OFFER,
            payload: {
                offer
            }
        }));
    }
    async function handleOffer(offer, socket) {
        let pc;
        if (!recieverPc.current) {
            pc = new RTCPeerConnection();
            pc.ontrack = (e)=>{
                const remoteVideo = new MediaStream();
                remoteVideo.addTrack(e.streams[0].getAudioTracks()[0]);
                remoteVideo.addTrack(e.streams[0].getVideoTracks()[0]);
                setRemoteStream(remoteVideo);
                console.log("remote track addded");
            };
            pc.onicecandidate = (e)=>{
                const sdp = e.candidate;
                if (sdp) {
                    socket.send(JSON.stringify({
                        type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].ADD_ICE_CANDIDATES,
                        payload: {
                            sdp,
                            id: 2
                        }
                    }));
                    console.log("send ice candidates by 2");
                }
            };
            pc.onconnectionstatechange = ()=>{
                console.log("reciever pc state => " + pc.connectionState);
            };
            // setRecieverPc(pc);
            recieverPc.current = pc;
        } else pc = recieverPc.current;
        await pc.setRemoteDescription(offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        socket.send(JSON.stringify({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].ANSWER,
            payload: {
                answer
            }
        }));
        console.log("answer sent");
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (recieverPc && recieverRef.current && remoteStream) {
            recieverRef.current.srcObject = remoteStream;
            recieverRef.current.muted = false;
            recieverRef.current.play();
        }
    }, [
        recieverPc.current,
        recieverRef.current,
        remoteStream
    ]);
    async function handleAnswer(answer) {
        if (!senderPc.current) {
            console.log("no senderPc");
            return;
        }
        await senderPc.current.setRemoteDescription(answer);
        console.log("remote answer set");
    }
    async function handleiceCandidates(sdp, id) {
        if (id == 1 && recieverPc.current) {
            // it is for reciever
            await recieverPc.current.addIceCandidate(sdp);
            console.log("ice candidates set for reciever");
        } else if (senderPc.current) {
            //  it is for sender
            await senderPc.current.addIceCandidate(sdp);
            console.log("ice candidates set for sender");
        } else console.log("ice candidate mein gadbadi");
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (!localStream) {
            init_localStream();
        }
    }, [
        localStream
    ]);
    async function init_localStream() {
        if (localStream) return localStream;
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        setLocalStream(stream);
        return stream;
    }
    function handleNext(message) {
        if (!ws.current) {
            console.log("websocket not initialized");
            return;
        }
        if (lobby && message == __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].FIND_NEXT) {
            console.log("already i lobby");
            return;
        }
        if (lobby && message == __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].SKIP) {
            setLobby(false);
        }
        setLobby(true);
        if (!started) {
            setStarted(true);
        }
        ;
        if (senderPc.current) cleanupPeer(senderPc.current);
        if (recieverPc.current) cleanupPeer(recieverPc.current);
        senderPc.current = null;
        recieverPc.current = null;
        ws.current.send(JSON.stringify({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].FIND_NEXT,
            payload: {
                message: "something"
            }
        }));
        console.log("finding next... ");
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-screen min-w-screen h-screen w-screen bg-neutral-200 ",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-3/4 flex bg-green-400 justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-[90%] w-[49%] bg-red-500 m-4 rounded-2xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                            ref: recieverRef,
                            playsInline: true,
                            className: "h-full w-full"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 264,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 263,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: " h-[90%] w-[49%]  bg-red-500 m-4 rounded-2xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                            ref: senderRef,
                            muted: true,
                            playsInline: true,
                            className: "h-full transform scale-x-[-1]"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 267,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 266,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full py-2 px-4 flex gap-4 bg-blue-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-15 w-30 py-2 rounded-2xl bg-neutral-400 flex justify-center items-center active:scale-90",
                        onClick: ()=>handleNext(__TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].FIND_NEXT),
                        children: started ? "NEXT" : "START"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 271,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-15 w-30 py-2 rounded-2xl bg-neutral-400 flex justify-center items-center active:scale-90",
                        onClick: ()=>{},
                        children: "STOP"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 272,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 270,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 260,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__64cf93df._.js.map