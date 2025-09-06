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
"[project]/app/chat/page.tsx [app-ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Page)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/interface.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function Page() {
    const localRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const remoteRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [pc, setPc] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [socket, setSocket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const configuration = {
            iceServers: [
                {
                    urls: "stun:stun.l.google.com:19302"
                }
            ]
        };
        const peer = new RTCPeerConnection(configuration);
        const ws = new WebSocket("ws://localhost:8080");
        setPc(peer);
        setSocket(ws);
        // 🔹 Attach local stream
        getStream(peer);
        // 🔹 Handle remote tracks
        peer.ontrack = (event)=>{
            if (remoteRef.current) {
                let stream = remoteRef.current.srcObject;
                if (!stream) {
                    stream = new MediaStream();
                    remoteRef.current.srcObject = stream;
                }
                if (!stream.getTracks().find((t)=>t.id === event.track.id)) {
                    stream.addTrack(event.track);
                }
            }
        };
        // 🔹 ICE candidates
        peer.onicecandidate = (e)=>{
            if (e.candidate) {
                ws.send(JSON.stringify({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].ADD_ICE_CANDIDATES,
                    payload: {
                        sdp: e.candidate
                    }
                }));
                console.log("Sent ICE");
            }
        };
        // 🔹 WebSocket listener
        ws.onmessage = async (e)=>{
            const data = JSON.parse(e.data.toString());
            const { type, payload } = data;
            if (!type || !payload) return;
            if (type === __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].OFFER) {
                // Remote sent offer → set remote desc + send answer
                await peer.setRemoteDescription(new RTCSessionDescription(payload.offer));
                const answer = await peer.createAnswer();
                await peer.setLocalDescription(answer);
                ws.send(JSON.stringify({
                    type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].ANSWER,
                    payload: {
                        answer
                    }
                }));
                console.log("Answer sent");
            } else if (type === __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].ANSWER) {
                // Remote answered → set remote desc
                await peer.setRemoteDescription(new RTCSessionDescription(payload.answer));
                console.log("Answer received");
            } else if (type === __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].ADD_ICE_CANDIDATES) {
                const c = payload.sdp;
                if (c) {
                    try {
                        await peer.addIceCandidate(new RTCIceCandidate(c));
                        console.log("ICE candidate added");
                    } catch (err) {
                        console.warn("Error adding ICE", err);
                    }
                }
            } else if (type === __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MessageType"].MATCHED) {
                console.log("Matched!");
                sendOffer(peer, ws);
            }
        };
    }, []);
    async function sendOffer(peer, ws) {
        const offer = await peer.createOffer();
        await peer.setLocalDescription(offer);
        ws.send(JSON.stringify({
            type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RequestType"].OFFER,
            payload: {
                offer
            }
        }));
        console.log("Offer sent");
    }
    async function getStream(peer) {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        });
        stream.getTracks().forEach((track)=>peer.addTrack(track, stream));
        if (localRef.current) {
            localRef.current.srcObject = stream;
            await localRef.current.play();
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex justify-center items-center h-screen w-screen gap-4 bg-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                        ref: localRef,
                        autoPlay: true,
                        muted: true,
                        playsInline: true,
                        className: "w-80 h-60 bg-black"
                    }, void 0, false, {
                        fileName: "[project]/app/chat/page.tsx",
                        lineNumber: 114,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center mt-1 text-white",
                        children: "Local"
                    }, void 0, false, {
                        fileName: "[project]/app/chat/page.tsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/chat/page.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                        ref: remoteRef,
                        autoPlay: true,
                        playsInline: true,
                        className: "w-80 h-60 bg-black"
                    }, void 0, false, {
                        fileName: "[project]/app/chat/page.tsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-center mt-1 text-white",
                        children: "Remote"
                    }, void 0, false, {
                        fileName: "[project]/app/chat/page.tsx",
                        lineNumber: 130,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/chat/page.tsx",
                lineNumber: 123,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/chat/page.tsx",
        lineNumber: 112,
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

//# sourceMappingURL=%5Broot-of-the-server%5D__6c8db174._.js.map