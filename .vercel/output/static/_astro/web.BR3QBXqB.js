const c={context:void 0,registry:void 0};function j(e){c.context=e}function ve(){return{...c.context,id:`${c.context.id}${c.context.count++}-`,count:0}}const Ee=(e,t)=>e===t,$e=Symbol("solid-track"),D={equals:Ee};let ue=ye;const M=1,R=2,ce={owned:null,cleanups:null,context:null,owner:null},ee={};var d=null;let O=null,ke=null,y=null,S=null,N=null,Q=0;function V(e,t){const n=y,s=d,i=e.length===0,r=t===void 0?s:t,l=i?ce:{owned:null,cleanups:null,context:r?r.context:null,owner:r},o=i?e:()=>e(()=>E(()=>J(l)));d=l,y=null;try{return q(o,!0)}finally{y=n,d=s}}function I(e,t){t=t?Object.assign({},D,t):D;const n={value:e,observers:null,observerSlots:null,comparator:t.equals||void 0},s=i=>(typeof i=="function"&&(i=i(n.value)),pe(n,i));return[ge.bind(n),s]}function ie(e,t,n){const s=X(e,t,!0,M);U(s)}function Y(e,t,n){const s=X(e,t,!1,M);U(s)}function Ke(e,t,n){ue=je;const s=X(e,t,!1,M),i=_&&se(_);i&&(s.suspense=i),(!n||!n.render)&&(s.user=!0),N?N.push(s):U(s)}function H(e,t,n){n=n?Object.assign({},D,n):D;const s=X(e,t,!0,0);return s.observers=null,s.observerSlots=null,s.comparator=n.equals||void 0,U(s),ge.bind(s)}function Te(e){return e&&typeof e=="object"&&"then"in e}function Ge(e,t,n){let s,i,r;arguments.length===2&&typeof t=="object"||arguments.length===1?(s=!0,i=e,r=t||{}):(s=e,i=t,r=n||{});let l=null,o=ee,u=null,a=!1,f=!1,w="initialValue"in r,h=typeof s=="function"&&H(s);const g=new Set,[x,C]=(r.storage||I)(r.initialValue),[$,k]=I(void 0),[m,v]=I(void 0,{equals:!1}),[T,L]=I(w?"ready":"unresolved");if(c.context){u=`${c.context.id}${c.context.count++}`;let p;r.ssrLoadFrom==="initial"?o=r.initialValue:c.load&&(p=c.load(u))&&(o=p)}function P(p,b,A,B){return l===p&&(l=null,B!==void 0&&(w=!0),(p===o||b===o)&&r.onHydrated&&queueMicrotask(()=>r.onHydrated(B,{value:b})),o=ee,Ce(b,A)),b}function Ce(p,b){q(()=>{b===void 0&&C(()=>p),L(b!==void 0?"errored":w?"ready":"unresolved"),k(b);for(const A of g.keys())A.decrement();g.clear()},!1)}function Z(){const p=_&&se(_),b=x(),A=$();if(A!==void 0&&!l)throw A;return y&&!y.user&&p&&ie(()=>{m(),l&&(p.resolved&&O&&a?O.promises.add(l):g.has(p)||(p.increment(),g.add(p)))}),b}function z(p=!0){if(p!==!1&&f)return;f=!1;const b=h?h():s;if(a=O,b==null||b===!1){P(l,E(x));return}const A=o!==ee?o:E(()=>i(b,{value:x(),refetching:p}));return Te(A)?(l=A,"value"in A?(A.status==="success"?P(l,A.value,void 0,b):P(l,void 0,void 0,b),A):(f=!0,queueMicrotask(()=>f=!1),q(()=>{L(w?"refreshing":"pending"),v()},!1),A.then(B=>P(A,B,void 0,b),B=>P(A,void 0,be(B),b)))):(P(l,A,void 0,b),A)}return Object.defineProperties(Z,{state:{get:()=>T()},error:{get:()=>$()},loading:{get(){const p=T();return p==="pending"||p==="refreshing"}},latest:{get(){if(!w)return Z();const p=$();if(p&&!l)throw p;return x()}}}),h?ie(()=>z(!1)):z(!1),[Z,{refetch:z,mutate:C}]}function E(e){if(y===null)return e();const t=y;y=null;try{return e()}finally{y=t}}function ae(e){return d===null||(d.cleanups===null?d.cleanups=[e]:d.cleanups.push(e)),e}function Ne(){return d}function He(e){N.push.apply(N,e),e.length=0}function de(e,t){const n=Symbol("context");return{id:n,Provider:Ie(n),defaultValue:e}}function se(e){return d&&d.context&&d.context[e.id]!==void 0?d.context[e.id]:e.defaultValue}function he(e){const t=H(e),n=H(()=>te(t()));return n.toArray=()=>{const s=n();return Array.isArray(s)?s:s!=null?[s]:[]},n}let _;function Le(){return _||(_=de())}function ge(){if(this.sources&&this.state)if(this.state===M)U(this);else{const e=S;S=null,q(()=>G(this),!1),S=e}if(y){const e=this.observers?this.observers.length:0;y.sources?(y.sources.push(this),y.sourceSlots.push(e)):(y.sources=[this],y.sourceSlots=[e]),this.observers?(this.observers.push(y),this.observerSlots.push(y.sources.length-1)):(this.observers=[y],this.observerSlots=[y.sources.length-1])}return this.value}function pe(e,t,n){let s=e.value;return(!e.comparator||!e.comparator(s,t))&&(e.value=t,e.observers&&e.observers.length&&q(()=>{for(let i=0;i<e.observers.length;i+=1){const r=e.observers[i],l=O&&O.running;l&&O.disposed.has(r),(l?!r.tState:!r.state)&&(r.pure?S.push(r):N.push(r),r.observers&&we(r)),l||(r.state=M)}if(S.length>1e6)throw S=[],new Error},!1)),t}function U(e){if(!e.fn)return;J(e);const t=Q;Me(e,e.value,t)}function Me(e,t,n){let s;const i=d,r=y;y=d=e;try{s=e.fn(t)}catch(l){return e.pure&&(e.state=M,e.owned&&e.owned.forEach(J),e.owned=null),e.updatedAt=n+1,xe(l)}finally{y=r,d=i}(!e.updatedAt||e.updatedAt<=n)&&(e.updatedAt!=null&&"observers"in e?pe(e,s):e.value=s,e.updatedAt=n)}function X(e,t,n,s=M,i){const r={fn:e,state:s,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:t,owner:d,context:d?d.context:null,pure:n};return d===null||d!==ce&&(d.owned?d.owned.push(r):d.owned=[r]),r}function K(e){if(e.state===0)return;if(e.state===R)return G(e);if(e.suspense&&E(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<Q);)e.state&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===M)U(e);else if(e.state===R){const s=S;S=null,q(()=>G(e,t[0]),!1),S=s}}function q(e,t){if(S)return e();let n=!1;t||(S=[]),N?n=!0:N=[],Q++;try{const s=e();return Pe(n),s}catch(s){n||(N=null),S=null,xe(s)}}function Pe(e){if(S&&(ye(S),S=null),e)return;const t=N;N=null,t.length&&q(()=>ue(t),!1)}function ye(e){for(let t=0;t<e.length;t++)K(e[t])}function je(e){let t,n=0;for(t=0;t<e.length;t++){const s=e[t];s.user?e[n++]=s:K(s)}if(c.context){if(c.count){c.effects||(c.effects=[]),c.effects.push(...e.slice(0,n));return}else c.effects&&(e=[...c.effects,...e],n+=c.effects.length,delete c.effects);j()}for(t=0;t<n;t++)K(e[t])}function G(e,t){e.state=0;for(let n=0;n<e.sources.length;n+=1){const s=e.sources[n];if(s.sources){const i=s.state;i===M?s!==t&&(!s.updatedAt||s.updatedAt<Q)&&K(s):i===R&&G(s,t)}}}function we(e){for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];n.state||(n.state=R,n.pure?S.push(n):N.push(n),n.observers&&we(n))}}function J(e){let t;if(e.sources)for(;e.sources.length;){const n=e.sources.pop(),s=e.sourceSlots.pop(),i=n.observers;if(i&&i.length){const r=i.pop(),l=n.observerSlots.pop();s<i.length&&(r.sourceSlots[l]=s,i[s]=r,n.observerSlots[s]=l)}}if(e.owned){for(t=e.owned.length-1;t>=0;t--)J(e.owned[t]);e.owned=null}if(e.cleanups){for(t=e.cleanups.length-1;t>=0;t--)e.cleanups[t]();e.cleanups=null}e.state=0}function be(e){return e instanceof Error?e:new Error(typeof e=="string"?e:"Unknown error",{cause:e})}function xe(e,t=d){throw be(e)}function te(e){if(typeof e=="function"&&!e.length)return te(e());if(Array.isArray(e)){const t=[];for(let n=0;n<e.length;n++){const s=te(e[n]);Array.isArray(s)?t.push.apply(t,s):t.push(s)}return t}return e}function Ie(e,t){return function(s){let i;return Y(()=>i=E(()=>(d.context={...d.context,[e]:s.value},he(()=>s.children))),void 0),i}}const qe=Symbol("fallback");function re(e){for(let t=0;t<e.length;t++)e[t]()}function Be(e,t,n={}){let s=[],i=[],r=[],l=0,o=t.length>1?[]:null;return ae(()=>re(r)),()=>{let u=e()||[],a,f;return u[$e],E(()=>{let h=u.length,g,x,C,$,k,m,v,T,L;if(h===0)l!==0&&(re(r),r=[],s=[],i=[],l=0,o&&(o=[])),n.fallback&&(s=[qe],i[0]=V(P=>(r[0]=P,n.fallback())),l=1);else if(l===0){for(i=new Array(h),f=0;f<h;f++)s[f]=u[f],i[f]=V(w);l=h}else{for(C=new Array(h),$=new Array(h),o&&(k=new Array(h)),m=0,v=Math.min(l,h);m<v&&s[m]===u[m];m++);for(v=l-1,T=h-1;v>=m&&T>=m&&s[v]===u[T];v--,T--)C[T]=i[v],$[T]=r[v],o&&(k[T]=o[v]);for(g=new Map,x=new Array(T+1),f=T;f>=m;f--)L=u[f],a=g.get(L),x[f]=a===void 0?-1:a,g.set(L,f);for(a=m;a<=v;a++)L=s[a],f=g.get(L),f!==void 0&&f!==-1?(C[f]=i[a],$[f]=r[a],o&&(k[f]=o[a]),f=x[f],g.set(L,f)):r[a]();for(f=m;f<h;f++)f in C?(i[f]=C[f],r[f]=$[f],o&&(o[f]=k[f],o[f](f))):i[f]=V(w);i=i.slice(0,l=h),s=u.slice(0)}return i});function w(h){if(r[f]=h,o){const[g,x]=I(f);return o[f]=x,t(u[f],g)}return t(u[f])}}}let Ae=!1;function Fe(){Ae=!0}function Oe(e,t){if(Ae&&c.context){const n=c.context;j(ve());const s=E(()=>e(t||{}));return j(n),s}return E(()=>e(t||{}))}const me=e=>`Stale read from <${e}>.`;function We(e){const t="fallback"in e&&{fallback:()=>e.fallback};return H(Be(()=>e.each,e.children,t||void 0))}function Qe(e){const t=e.keyed,n=H(()=>e.when,void 0,{equals:(s,i)=>t?s===i:!s==!i});return H(()=>{const s=n();if(s){const i=e.children;return typeof i=="function"&&i.length>0?E(()=>i(t?s:()=>{if(!E(n))throw me("Show");return e.when})):i}return e.fallback},void 0,void 0)}function Xe(e){let t=!1;const n=(r,l)=>(t?r[1]===l[1]:!r[1]==!l[1])&&r[2]===l[2],s=he(()=>e.children),i=H(()=>{let r=s();Array.isArray(r)||(r=[r]);for(let l=0;l<r.length;l++){const o=r[l].when;if(o)return t=!!r[l].keyed,[l,o,r[l]]}return[-1]},void 0,{equals:n});return H(()=>{const[r,l,o]=i();if(r<0)return e.fallback;const u=o.children;return typeof u=="function"&&u.length>0?E(()=>u(t?l:()=>{if(E(i)[0]!==r)throw me("Match");return o.when})):u},void 0,void 0)}function Je(e){return e}const _e=de();function Ze(e){let t=0,n,s,i,r,l;const[o,u]=I(!1),a=Le(),f={increment:()=>{++t===1&&u(!0)},decrement:()=>{--t===0&&u(!1)},inFallback:o,effects:[],resolved:!1},w=Ne();if(c.context&&c.load){const x=c.context.id+c.context.count;let C=c.load(x);if(C&&(typeof C!="object"||C.status!=="success"?i=C:c.gather(x)),i&&i!=="$$f"){const[$,k]=I(void 0,{equals:!1});r=$,i.then(()=>{if(c.done)return k();c.gather(x),j(s),k(),j()},m=>{l=m,k()})}}const h=se(_e);h&&(n=h.register(f.inFallback));let g;return ae(()=>g&&g()),Oe(a.Provider,{value:f,get children(){return H(()=>{if(l)throw l;if(s=c.context,r)return r(),r=void 0;s&&i==="$$f"&&j();const x=H(()=>e.children);return H(C=>{const $=f.inFallback(),{showContent:k=!0,showFallback:m=!0}=n?n():{};if((!$||i&&i!=="$$f")&&k)return f.resolved=!0,g&&g(),g=s=i=void 0,He(f.effects),x();if(m)return g?C:V(v=>(g=v,s&&(j({id:s.id+"f",count:0}),s=void 0),e.fallback),w)})})}})}function Ue(e,t,n){let s=n.length,i=t.length,r=s,l=0,o=0,u=t[i-1].nextSibling,a=null;for(;l<i||o<r;){if(t[l]===n[o]){l++,o++;continue}for(;t[i-1]===n[r-1];)i--,r--;if(i===l){const f=r<s?o?n[o-1].nextSibling:n[r-o]:u;for(;o<r;)e.insertBefore(n[o++],f)}else if(r===o)for(;l<i;)(!a||!a.has(t[l]))&&t[l].remove(),l++;else if(t[l]===n[r-1]&&n[o]===t[i-1]){const f=t[--i].nextSibling;e.insertBefore(n[o++],t[l++].nextSibling),e.insertBefore(n[--r],f),t[i]=n[r]}else{if(!a){a=new Map;let w=o;for(;w<r;)a.set(n[w],w++)}const f=a.get(t[l]);if(f!=null)if(o<f&&f<r){let w=l,h=1,g;for(;++w<i&&w<r&&!((g=a.get(t[w]))==null||g!==f+h);)h++;if(h>f-o){const x=t[l];for(;o<f;)e.insertBefore(n[o++],x)}else e.replaceChild(n[o++],t[l++])}else l++;else t[l++].remove()}}}const le="_$DX_DELEGATE";function Ve(e,t,n,s={}){let i;return V(r=>{i=r,t===document?e():De(t,e(),t.firstChild?null:void 0,n)},s.owner),()=>{i(),t.textContent=""}}function ze(e,t,n){let s;const i=()=>{const l=document.createElement("template");return l.innerHTML=e,n?l.content.firstChild.firstChild:l.content.firstChild},r=t?()=>E(()=>document.importNode(s||(s=i()),!0)):()=>(s||(s=i())).cloneNode(!0);return r.cloneNode=r,r}function et(e,t=window.document){const n=t[le]||(t[le]=new Set);for(let s=0,i=e.length;s<i;s++){const r=e[s];n.has(r)||(n.add(r),t.addEventListener(r,Se))}}function tt(e,t,n){c.context&&e.isConnected||(e[t]=n)}function nt(e,t,n){c.context&&e.isConnected||(n==null?e.removeAttribute(t):e.setAttribute(t,n))}function st(e,t){c.context&&e.isConnected||(t==null?e.removeAttribute("class"):e.className=t)}function De(e,t,n,s){if(n!==void 0&&!s&&(s=[]),typeof t!="function")return W(e,t,s,n);Y(i=>W(e,t(),i,n),s)}function Re(e,t,n={}){c.completed=globalThis._$HY.completed,c.events=globalThis._$HY.events,c.load=i=>globalThis._$HY.r[i],c.has=i=>i in globalThis._$HY.r,c.gather=i=>fe(t,i),c.registry=new Map,c.context={id:n.renderId||"",count:0},fe(t,n.renderId);const s=Ve(e,t,[...t.childNodes],n);return c.context=null,s}function it(e){let t,n;return!c.context||!(t=c.registry.get(n=Ye()))?e():(c.completed&&c.completed.add(t),c.registry.delete(n),t)}function rt(e){let t=e,n=0,s=[];if(c.context)for(;t;){if(t.nodeType===8){const i=t.nodeValue;if(i==="$")n++;else if(i==="/"){if(n===0)return[t,s];n--}}s.push(t),t=t.nextSibling}return[t,s]}function lt(){c.events&&!c.events.queued&&(queueMicrotask(()=>{const{completed:e,events:t}=c;for(t.queued=!1;t.length;){const[n,s]=t[0];if(!e.has(n))return;Se(s),t.shift()}}),c.events.queued=!0)}function Se(e){const t=`$$${e.type}`;let n=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==n&&Object.defineProperty(e,"target",{configurable:!0,value:n}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return n||document}}),c.registry&&!c.done&&(c.done=_$HY.done=!0);n;){const s=n[t];if(s&&!n.disabled){const i=n[`${t}Data`];if(i!==void 0?s.call(n,i,e):s.call(n,e),e.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function W(e,t,n,s,i){const r=!!c.context&&e.isConnected;if(r){!n&&(n=[...e.childNodes]);let u=[];for(let a=0;a<n.length;a++){const f=n[a];f.nodeType===8&&f.data.slice(0,2)==="!$"?f.remove():u.push(f)}n=u}for(;typeof n=="function";)n=n();if(t===n)return n;const l=typeof t,o=s!==void 0;if(e=o&&n[0]&&n[0].parentNode||e,l==="string"||l==="number"){if(r)return n;if(l==="number"&&(t=t.toString()),o){let u=n[0];u&&u.nodeType===3?u.data!==t&&(u.data=t):u=document.createTextNode(t),n=F(e,n,s,u)}else n!==""&&typeof n=="string"?n=e.firstChild.data=t:n=e.textContent=t}else if(t==null||l==="boolean"){if(r)return n;n=F(e,n,s)}else{if(l==="function")return Y(()=>{let u=t();for(;typeof u=="function";)u=u();n=W(e,u,n,s)}),()=>n;if(Array.isArray(t)){const u=[],a=n&&Array.isArray(n);if(ne(u,t,n,i))return Y(()=>n=W(e,u,n,s,!0)),()=>n;if(r){if(!u.length)return n;if(s===void 0)return[...e.childNodes];let f=u[0],w=[f];for(;(f=f.nextSibling)!==s;)w.push(f);return n=w}if(u.length===0){if(n=F(e,n,s),o)return n}else a?n.length===0?oe(e,u,s):Ue(e,n,u):(n&&F(e),oe(e,u));n=u}else if(t.nodeType){if(r&&t.parentNode)return n=o?[t]:t;if(Array.isArray(n)){if(o)return n=F(e,n,s,t);F(e,n,null,t)}else n==null||n===""||!e.firstChild?e.appendChild(t):e.replaceChild(t,e.firstChild);n=t}}return n}function ne(e,t,n,s){let i=!1;for(let r=0,l=t.length;r<l;r++){let o=t[r],u=n&&n[e.length],a;if(!(o==null||o===!0||o===!1))if((a=typeof o)=="object"&&o.nodeType)e.push(o);else if(Array.isArray(o))i=ne(e,o,u)||i;else if(a==="function")if(s){for(;typeof o=="function";)o=o();i=ne(e,Array.isArray(o)?o:[o],Array.isArray(u)?u:[u])||i}else e.push(o),i=!0;else{const f=String(o);u&&u.nodeType===3&&u.data===f?e.push(u):e.push(document.createTextNode(f))}}return i}function oe(e,t,n=null){for(let s=0,i=t.length;s<i;s++)e.insertBefore(t[s],n)}function F(e,t,n,s){if(n===void 0)return e.textContent="";const i=s||document.createTextNode("");if(t.length){let r=!1;for(let l=t.length-1;l>=0;l--){const o=t[l];if(i!==o){const u=o.parentNode===e;!r&&!l?u?e.replaceChild(i,o):e.insertBefore(i,n):u&&o.remove()}else r=!0}}else e.insertBefore(i,n);return[i]}function fe(e,t){const n=e.querySelectorAll("*[data-hk]");for(let s=0;s<n.length;s++){const i=n[s],r=i.getAttribute("data-hk");(!t||r.startsWith(t))&&!c.registry.has(r)&&c.registry.set(r,i)}}function Ye(){const e=c.context;return`${e.id}${e.count++}`}const ot=(...e)=>(Fe(),Re(...e));export{We as F,Je as M,Qe as S,Ke as a,rt as b,I as c,Oe as d,et as e,Y as f,it as g,st as h,De as i,H as j,tt as k,Ge as l,Xe as m,ot as n,Ve as o,Ze as p,lt as r,nt as s,ze as t};
