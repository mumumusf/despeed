function handleMessages(e,o,n){if(console.log("hello"),"offscreen"===e.target){if("get-geolocation"===e.type)return getLocation().then((e=>n(e))).catch((e=>{console.log("InError at getLocation"),n({error:!0,errorMessage:e.message,coords:{latitude:0,longitude:0},timestamp:Date.now()})})),!0;console.warn(`Unexpected message type received: '${e.type}'.`)}}function clone(e){const o={};if(!(null!==e&&e instanceof Object))return e;for(const n in e)o[n]=clone(e[n]);return o}async function getLocation(){return new Promise(((e,o)=>{navigator.geolocation.getCurrentPosition((o=>e(clone(o))),(e=>o(e)),{timeout:7500})}))}chrome.runtime.onMessage.addListener(handleMessages);