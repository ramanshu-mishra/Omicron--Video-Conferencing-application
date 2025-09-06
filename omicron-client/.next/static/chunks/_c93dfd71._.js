(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/interface.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Page)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/interface.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function Page() {
    _s();
    const senderRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const recieverRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [started, setStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const pc1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pc2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const ws = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const localStream = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // const pendingCandidates= useRef< RTCIceCandidateInit[]>([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Page.useEffect": ()=>{
            const socket = new WebSocket("ws://localhost:8080");
            // setWs(socket);
            ws.current = socket;
            getLocalStream();
            socket.onmessage = ({
                "Page.useEffect": async (e)=>{
                    const data = JSON.parse(e.data.toString());
                    const type = data.type;
                    if (!type) {
                        console.log("message without type recieved");
                        return;
                    }
                    if (type == "SKIP") {
                        console.log("partner skipped");
                        handleNext();
                    } else if (type == __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageType"].MATCHED) {
                        addVideoTrack();
                    } else if (type == __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageType"].OFFER) {
                        const offer = data.payload.offer;
                        if (offer) {
                            console.log("offer recieved");
                            init_pc2(offer);
                        }
                    } else if (type == __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MessageType"].ANSWER) {
                        const answer = data.payload.answer;
                        if (answer && pc1.current) {
                            console.log("answer recieved");
                            await pc1.current.setRemoteDescription(new RTCSessionDescription(answer));
                        }
                    } else if (type == __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RequestType"].ADD_ICE_CANDIDATES) {
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
                }
            })["Page.useEffect"];
        }
    }["Page.useEffect"], []);
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
            type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RequestType"].FIND_NEXT,
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
                type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RequestType"].OFFER,
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
                type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RequestType"].ADD_ICE_CANDIDATES,
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
            type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RequestType"].STOP
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
            type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RequestType"].ANSWER,
            payload: {
                answer
            }
        }));
        console.log("answer sent");
        pc.onicecandidate = (e)=>{
            const sdp = e.candidate;
            if (!ws.current || !sdp) return;
            ws.current.send(JSON.stringify({
                type: __TURBOPACK__imported__module__$5b$project$5d2f$interface$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RequestType"].ADD_ICE_CANDIDATES,
                payload: {
                    sdp,
                    id: 2
                }
            }));
            console.log("ice candidate 2 sent");
        };
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative min-h-screen min-w-screen h-screen w-screen bg-neutral-200 ",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative h-3/4 flex bg-green-400 justify-between items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-[90%] w-[49%] bg-red-500 m-4 rounded-2xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: " h-[90%] w-[49%]  bg-red-500 m-4 rounded-2xl",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-full py-2 px-4 flex gap-4 bg-blue-400",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "h-15 w-30 py-2 rounded-2xl bg-neutral-400 flex justify-center items-center active:scale-90",
                        onClick: handleNext,
                        children: started ? "NEXT" : "START"
                    }, void 0, false, {
                        fileName: "[project]/app/page.tsx",
                        lineNumber: 213,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
_s(Page, "+aTNBLUjz6SGyhYgYa8hccTJ4mM=");
_c = Page;
var _c;
__turbopack_context__.k.register(_c, "Page");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return (type.displayName || "Context") + ".Provider";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, self, source, owner, props, debugStack, debugTask) {
        self = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== self ? self : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, self, source, getOwner(), maybeKey, debugStack, debugTask);
    }
    function validateChildKeys(node) {
        "object" === typeof node && null !== node && node.$$typeof === REACT_ELEMENT_TYPE && node._store && (node._store.validated = 1);
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    Symbol.for("react.provider");
    var REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        "react-stack-bottom-frame": function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React["react-stack-bottom-frame"].bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren, source, self) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, source, self, trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) {
    "TURBOPACK unreachable";
} else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}}),
}]);

//# sourceMappingURL=_c93dfd71._.js.map