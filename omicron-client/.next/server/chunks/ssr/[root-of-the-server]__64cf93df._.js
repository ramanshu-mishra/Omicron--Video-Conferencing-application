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
    const senderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const recieverRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const pc1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pc2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ws = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const localStream = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    // const pendingCandidates= useRef< RTCIceCandidateInit[]>([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const socket = new WebSocket("ws://localhost:8080");
        // setWs(socket);
        ws.current = socket;
        getLocalStream();
        socket.onmessage = async (e)=>{
            const data = JSON.parse(e.data.toString());
            const type = data.type;
            if (!type) {
                console.log("message without type recieved");
                return;
            }
            if (type == "SKIP") {
                console.log("partner skipped");
                handleNext();
            } else if (type == __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MessageType"].MATCHED) {
                addVideoTrack();
            } else if (type == __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MessageType"].OFFER) {
                const offer = data.payload.offer;
                if (offer) {
                    console.log("offer recieved");
                    init_pc2(offer);
                }
            } else if (type == __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MessageType"].ANSWER) {
                const answer = data.payload.answer;
                if (answer && pc1.current) {
                    console.log("answer recieved");
                    await pc1.current.setRemoteDescription(new RTCSessionDescription(answer));
                }
            } else if (type == __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].ADD_ICE_CANDIDATES) {
                const sdp = data.payload.sdp;
                const id = data.payload.id;
                if (sdp) {
                    try {
                        if (id == 1) await pc1.current?.addIceCandidate(new RTCIceCandidate(sdp));
                        else {
                            await pc2.current?.addIceCandidate(new RTCIceCandidate(sdp));
                        }
                    } catch  {
                        console.log("not yet");
                    }
                    console.log("ice candidates recieved");
                }
            } else {
                console.log(data);
            }
        };
    }, []);
    async function getLocalStream() {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        // setLocalStream(stream);
        localStream.current = stream;
        while(!senderRef.current){
            await new Promise((resolve)=>setTimeout(resolve, 1));
        }
        senderRef.current.srcObject = stream;
    }
    function handleNext() {
        if (!ws.current) {
            console.log("ws not found");
            return;
        }
        if (!started) setStarted(true);
        if (pc1.current) pc1.current.close();
        if (pc2.current) pc2.current.close();
        const pc = new RTCPeerConnection();
        // setpc1(pc);
        pc1.current = pc;
        ws.current.send(JSON.stringify({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].FIND_NEXT,
            payload: {
                message: "something"
            }
        }));
    }
    // function handleSkip(){
    //   if(pc1)pc1.close();
    //   const pc = new RTCPeerConnection();
    //   setpc1(pc1);
    //   ws?.send(JSON.stringify({type: RequestType.SKIP}));
    //   ws?.send(JSON.stringify({type:RequestType.FIND_NEXT}));
    // }
    async function addVideoTrack() {
        if (!localStream.current) {
            console.log("localstream not found");
            return;
        }
        if (!pc1.current) {
            console.log("pc1 not found");
            return;
        }
        const senders = pc1.current.getSenders();
        const audioTrack = localStream.current.getAudioTracks()[0];
        const videoTrack = localStream.current.getVideoTracks()[0];
        const hasAudio = senders.some((s)=>s.track === audioTrack);
        const hasVideo = senders.some((s)=>s.track === videoTrack);
        if (!hasAudio && audioTrack) {
            pc1.current.addTrack(audioTrack, localStream.current);
        }
        if (!hasVideo && videoTrack) {
            pc1.current.addTrack(videoTrack, localStream.current);
        }
        init_pc1Handlers(pc1.current);
    }
    function handleWSnotfound() {
        console.log("ws not found");
    }
    function init_pc1Handlers(pc) {
        if (!ws.current) {
            handleWSnotfound();
            return;
        }
        pc.onnegotiationneeded = async ()=>{
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);
            if (ws.current) ws.current.send(JSON.stringify({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].OFFER,
                payload: {
                    offer: offer
                }
            }));
            console.log("offer sent");
        };
        pc.onicecandidate = (e)=>{
            const sdp = e.candidate;
            if (!ws.current || !sdp) return;
            ws.current.send(JSON.stringify({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].ADD_ICE_CANDIDATES,
                payload: {
                    sdp: sdp,
                    id: 1
                }
            }));
            console.log("sent ice candidates");
        };
    }
    function handleStop() {
        if (!ws.current) {
            handleWSnotfound();
            return;
        }
        // not implemented on backend yet;
        ws.current.send(JSON.stringify({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].STOP
        }));
    }
    // reciever pc functions;
    function init_pc2(offer) {
        const pc = new RTCPeerConnection();
        // setpc2(pc);'
        pc2.current = pc;
        pc.ontrack = (e)=>{
            // dekh loonga ye bhi 
            recieverRef.current.srcObject = e.streams[0];
        };
        init_pc2Handlers(pc, offer);
    }
    async function init_pc2Handlers(pc, offer) {
        if (!ws.current) {
            handleWSnotfound();
            return;
        }
        await pc.setRemoteDescription(new RTCSessionDescription(offer));
        console.log("remote offer set");
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        ws.current.send(JSON.stringify({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].ANSWER,
            payload: {
                answer
            }
        }));
        console.log("answer sent");
        pc.onicecandidate = (e)=>{
            const sdp = e.candidate;
            if (!ws.current || !sdp) return;
            ws.current.send(JSON.stringify({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].ADD_ICE_CANDIDATES,
                payload: {
                    sdp,
                    id: 2
                }
            }));
            console.log("ice candidate 2 sent");
        };
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
                            autoPlay: true,
                            playsInline: true,
                            className: "h-full w-full"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 206,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 205,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: " h-[90%] w-[49%]  bg-red-500 m-4 rounded-2xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                            ref: senderRef,
                            muted: true,
                            autoPlay: true,
                            playsInline: true,
                            className: "h-full transform scale-x-[-1]"
                        }, void 0, false, {
                            fileName: "[project]/app/page.tsx",
                            lineNumber: 209,
                            columnNumber: 9
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 208,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 204,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full py-2 px-4 flex gap-4 bg-blue-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-15 w-30 py-2 rounded-2xl bg-neutral-400 flex justify-center items-center active:scale-90",
                        onClick: handleNext,
                        children: started ? "NEXT" : "START"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-15 w-30 py-2 rounded-2xl bg-neutral-400 flex justify-center items-center active:scale-90",
                        onClick: ()=>{
                            pc1.current?.getStats().then((d)=>console.log(d.values));
                        },
                        children: "STOP"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 214,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/page.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 202,
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