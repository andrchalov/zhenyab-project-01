(function(e){function t(t){for(var a,r,o=t[0],i=t[1],s=t[2],l=0,f=[];l<o.length;l++)r=o[l],u[r]&&f.push(u[r][0]),u[r]=0;for(a in i)Object.prototype.hasOwnProperty.call(i,a)&&(e[a]=i[a]);d&&d(t);while(f.length)f.shift()();return c.push.apply(c,s||[]),n()}function n(){for(var e,t=0;t<c.length;t++){for(var n=c[t],a=!0,r=1;r<n.length;r++){var o=n[r];0!==u[o]&&(a=!1)}a&&(c.splice(t--,1),e=i(i.s=n[0]))}return e}var a={},r={app:0},u={app:0},c=[];function o(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-2d2086b7":"6b4a9906","chunk-4e8d4066":"879907f8","chunk-5a48a9d0":"027c04fe","chunk-65a9de60":"c859c06c","chunk-d0caaca8":"d56ad949"}[e]+".js"}function i(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-65a9de60":1,"chunk-d0caaca8":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise(function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-2d2086b7":"31d6cfe0","chunk-4e8d4066":"31d6cfe0","chunk-5a48a9d0":"31d6cfe0","chunk-65a9de60":"18cc9959","chunk-d0caaca8":"3cd8e033"}[e]+".css",r=i.p+a,u=document.getElementsByTagName("link"),c=0;c<u.length;c++){var o=u[c],s=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(s===a||s===r))return t()}var l=document.getElementsByTagName("style");for(c=0;c<l.length;c++){o=l[c],s=o.getAttribute("data-href");if(s===a||s===r)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var a=t&&t.target&&t.target.src||r,u=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");u.request=a,n(u)},f.href=r;var d=document.getElementsByTagName("head")[0];d.appendChild(f)}).then(function(){r[e]=0}));var a=u[e];if(0!==a)if(a)t.push(a[2]);else{var c=new Promise(function(t,n){a=u[e]=[t,n]});t.push(a[2]=c);var s,l=document.getElementsByTagName("head")[0],f=document.createElement("script");f.charset="utf-8",f.timeout=120,i.nc&&f.setAttribute("nonce",i.nc),f.src=o(e),s=function(t){f.onerror=f.onload=null,clearTimeout(d);var n=u[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,c=new Error("Loading chunk "+e+" failed.\n("+a+": "+r+")");c.type=a,c.request=r,n[1](c)}u[e]=void 0}};var d=setTimeout(function(){s({type:"timeout",target:f})},12e4);f.onerror=f.onload=s,l.appendChild(f)}return Promise.all(t)},i.m=e,i.c=a,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)i.d(n,a,function(t){return e[t]}.bind(null,a));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/zhenyab-project-01/dist/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var f=0;f<s.length;f++)t(s[f]);var d=l;c.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d"),n("f466"),n("579f"),n("587a");var a=n("a026"),r=n("9f7b"),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[e.loaded?n("div",[n("router-view")],1):e._e()])},c=[],o={name:"app",data:function(){return{loaded:!0}}},i=o,s=(n("5c0b"),n("2877")),l=Object(s["a"])(i,u,c,!1,null,null,null);l.options.__file="App.vue";var f=l.exports,d=n("8c4f"),p=(n("456d"),n("ac6a"),n("2f62")),h=n("bc3a"),m=n.n(h),g=function(e){var t=e.commit;return m.a.get("/account").then(function(e){t("LIST_UPDATED",e.data)})},v=function(e,t){var n=e.dispatch;return m.a.post("/account",t).then(function(e){n("fetch")})},b=function(e,t){var n=e.dispatch;return m.a.put("/account",t).then(function(e){n("fetch")})},y={fetch:g,add:v,edit:b},k=function(e){return e.list},T={list:k},w=function(e,t){e.list=t},_={LIST_UPDATED:w},j={list:[]},A={namespaced:!0,state:j,actions:y,getters:T,mutations:_},E=n("8468"),P=function(e,t){Object(E["a"])(e);var n=t.account_id;return m.a.get("/account/users/"+n).then(function(e){return e.data})},O=function(e,t){var n=e.dispatch;return m.a.post("/user",t).then(function(e){n("fetch")})},S=function(e,t){var n=e.dispatch;return m.a.put("/user",t).then(function(e){n("fetch")})},L={fetch:P,add:O,edit:S},x={},D={},q={},B={namespaced:!0,state:q,actions:L,getters:x,mutations:D};a["default"].use(p["a"]),m.a.defaults.baseURL="https://zhenyab.chalov.ml/api",m.a.interceptors.request.use(function(e){return N.state.accessToken&&(e.headers["Authorization"]="Bearer "+N.state.accessToken,e.headers["Accept-Language"]=N.state.language+"_"+N.state.country),e},function(e){return Promise.reject(e)});var N=new p["a"].Store({modules:{account:A,user:B},state:{accessToken:null,country:"US",language:"en",tokenType:null},getters:{accessToken:function(e){return e.accessToken},country:function(e){return e.country},language:function(e){return e.language},tokenType:function(e){return e.tokenType}},actions:{login:function(e,t){var n=e.commit,a={headers:{"Content-Type":"multipart/form-data"},transformRequest:[function(e,t){var n=new FormData;return Object.keys(e).forEach(function(t){n.append(t,e[t])}),n}]};return m.a.post("/auth/login",t,a).then(function(e){n("LOGGED_IN",e.data)},function(e){return Promise.reject(e.response.data)})}},mutations:{LOGGED_IN:function(e,t){e.accessToken=t.accessToken,e.country=t.country,e.language=t.language,e.tokenType=t.tokenType}}}),C=N,U=function(){return n.e("chunk-4e8d4066").then(n.bind(null,"e8c5"))},G=function(){return n.e("chunk-2d2086b7").then(n.bind(null,"a55b"))},I=function(){return Promise.all([n.e("chunk-5a48a9d0"),n.e("chunk-65a9de60")]).then(n.bind(null,"5d70"))},M=function(){return Promise.all([n.e("chunk-5a48a9d0"),n.e("chunk-d0caaca8")]).then(n.bind(null,"ed81"))};a["default"].use(d["a"]);var z=new d["a"]({mode:"hash",linkActiveClass:"open active",scrollBehavior:function(){return{y:0}},routes:[{path:"/login",name:"Login",component:G},{path:"/",name:"Home",component:U,redirect:"/accounts",children:[{path:"accounts",name:"Accounts",component:I,meta:{requiresAuth:!0}},{path:"/account/:account_id/users",name:"Users",component:M}]}]});z.beforeEach(function(e,t,n){e.matched.some(function(e){return e.meta.requiresAuth})?null==C.state.accessToken?n({path:"/login"}):n():e.matched.some(function(e){return e.meta.guest})?null==C.state.accessToken?n():n({name:"Accounts"}):n()});var J=z,R=n("9c39"),F=n.n(R);a["default"].use(r["a"]),a["default"].use(F.a,{visibility:3e3,permanent:!0,position:"bottom-right"}),a["default"].use(n("2ead")),new a["default"]({el:"#app",router:J,store:C,template:"<App/>",components:{App:f}})},"5c0b":function(e,t,n){"use strict";var a=n("b19e"),r=n.n(a);r.a},b19e:function(e,t,n){}});
//# sourceMappingURL=app.fbbb65bc.js.map