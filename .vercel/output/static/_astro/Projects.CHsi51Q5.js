import{e as D,c as C,a as K,g as h,b as v,i as s,d as y,t as b,f as Q,h as U,s as g,r as V,F as X}from"./web.BR3QBXqB.js";import{c as d,A as Y}from"./ArrowCard.4QCOhj9p.js";var Z=b('<div class="grid grid-cols-1 sm:grid-cols-3 gap-6"><div class="col-span-3 sm:col-span-1"><div class="sticky top-24"><div class="text-sm font-semibold uppercase mb-2 text-black dark:text-white">Filter</div><ul class="flex flex-wrap sm:flex-col gap-1.5"></ul></div></div><div class="col-span-3 sm:col-span-2"><div class="flex flex-col"><div class="text-sm uppercase mb-2">SHOWING <!$><!/> OF <!$><!/> PROJECTS</div><ul class="flex flex-col gap-3">'),ee=b("<li><button><svg><use href=/ui.svg#square></use><use href=/ui.svg#square-check></use></svg><!$><!/>"),le=b("<li>");function se({data:u,tags:E}){const[r,F]=C(new Set),[x,A]=C([]);K(()=>{A(u.filter(l=>Array.from(r()).every(t=>l.data.tags.some(a=>a.toLowerCase()===String(t).toLowerCase()))))});function N(l){F(t=>new Set(t.has(l)?[...t].filter(a=>a!==l):[...t,l]))}return(()=>{var l=h(Z),t=l.firstChild,a=t.firstChild,j=a.firstChild,O=j.nextSibling,P=t.nextSibling,q=P.firstChild,o=q.firstChild,H=o.firstChild,L=H.nextSibling,[$,R]=v(L.nextSibling),T=$.nextSibling,z=T.nextSibling,[_,G]=v(z.nextSibling);_.nextSibling;var I=o.nextSibling;return s(O,y(X,{each:E,children:i=>(()=>{var n=h(ee),c=n.firstChild,f=c.firstChild,m=f.firstChild,J=m.nextSibling,M=f.nextSibling,[W,B]=v(M.nextSibling);return c.$$click=()=>N(i),s(c,i,W,B),Q(e=>{var k=d("w-full px-2 py-1 rounded","whitespace-nowrap overflow-hidden overflow-ellipsis","flex gap-2 items-center","bg-black/5 dark:bg-white/10","hover:bg-black/10 hover:dark:bg-white/15","transition-colors duration-300 ease-in-out",r().has(i)&&"text-black dark:text-white"),p=d("size-5 fill-black/50 dark:fill-white/50","transition-colors duration-300 ease-in-out",r().has(i)&&"fill-black dark:fill-white"),S=d(r().has(i)?"hidden":"block"),w=d(r().has(i)?"block":"hidden");return k!==e.e&&U(c,e.e=k),p!==e.t&&g(f,"class",e.t=p),S!==e.a&&g(m,"class",e.a=S),w!==e.o&&g(J,"class",e.o=w),e},{e:void 0,t:void 0,a:void 0,o:void 0}),V(),n})()})),s(o,()=>x().length,$,R),s(o,()=>u.length,_,G),s(I,()=>x().map(i=>(()=>{var n=h(le);return s(n,y(Y,{entry:i})),n})())),l})()}D(["click"]);export{se as default};
