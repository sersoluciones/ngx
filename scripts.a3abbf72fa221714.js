function _defineProperties(U,$){for(var q=0;q<$.length;q++){var tt=$[q];tt.enumerable=tt.enumerable||!1,tt.configurable=!0,"value"in tt&&(tt.writable=!0),Object.defineProperty(U,tt.key,tt)}}function _createClass(U,$,q){return $&&_defineProperties(U.prototype,$),q&&_defineProperties(U,q),U}!function(U,$){"object"==typeof exports&&"undefined"!=typeof module?module.exports=$():"function"==typeof define&&define.amd?define($):(U="undefined"!=typeof globalThis?globalThis:U||self).Splide=$()}(this,function(){"use strict";var U="splide",$="data-"+U;function ht(t){t.length=0}function bt(t){return!an(t)&&"object"==typeof t}function Ln(t){return Array.isArray(t)}function ot(t){return"string"==typeof t}function on(t){return void 0===t}function an(t){return null===t}function un(t){return t instanceof HTMLElement}function Rt(t){return Ln(t)?t:[t]}function at(t,e){Rt(t).forEach(e)}function Xt(t,e){return t.indexOf(e)>-1}function Pt(t,e){return t.push.apply(t,Rt(e)),t}var ue=Array.prototype;function mt(t,e,n){return ue.slice.call(t,e,n)}function _t(t,e,n){t&&at(e,function(r){r&&t.classList[n?"add":"remove"](r)})}function ut(t,e){_t(t,ot(e)?e.split(" "):e,!0)}function $t(t,e){at(e,t.appendChild.bind(t))}function sn(t,e){at(t,function(n){var r=e.parentNode;r&&r.insertBefore(n,e)})}function fn(t,e){return un(t)&&(t.msMatchesSelector||t.matches).call(t,e)}function Nn(t,e){return t?mt(t.children).filter(function(n){return fn(n,e)}):[]}function nt(t,e){return e?Nn(t,e)[0]:t.firstElementChild}function lt(t,e,n){if(t){var r=Object.keys(t);r=n?r.reverse():r;for(var o=0;o<r.length;o++){var a=r[o];if("__proto__"!==a&&!1===e(t[a],a))break}}return t}function cn(t){return mt(arguments,1).forEach(function(e){lt(e,function(n,r){t[r]=e[r]})}),t}function dt(t,e){return lt(e,function(n,r){t[r]=Ln(n)?n.slice():bt(n)?dt(bt(t[r])?t[r]:{},n):n}),t}function Q(t,e){t&&at(e,function(n){t.removeAttribute(n)})}function F(t,e,n){bt(e)?lt(e,function(r,o){F(t,o,r)}):an(n)?Q(t,e):t.setAttribute(e,String(n))}function At(t,e,n){var r=document.createElement(t);return e&&(ot(e)?ut(r,e):F(r,e)),n&&$t(n,r),r}function j(t,e,n){if(on(n))return getComputedStyle(t)[e];if(!an(n)){var r=t.style;r[e]!==(n=""+n)&&(r[e]=n)}}function qt(t,e){j(t,"display",e)}function Ot(t,e){return t.getAttribute(e)}function bn(t,e){return t&&t.classList.contains(e)}function K(t){return t.getBoundingClientRect()}function yt(t){at(t,function(e){e&&e.parentNode&&e.parentNode.removeChild(e)})}function Rn(t){return nt((new DOMParser).parseFromString(t,"text/html").body)}function st(t,e){t.preventDefault(),e&&(t.stopPropagation(),t.stopImmediatePropagation())}function gt(t,e){return t&&t.querySelector(e)}function vn(t,e){return mt(t.querySelectorAll(e))}function Ct(t,e){_t(t,e,!1)}function ft(t){return ot(t)?t:t?t+"px":""}function Dt(t,e){if(void 0===e&&(e=""),!t)throw new Error("["+U+"] "+e)}function ln(t){setTimeout(t)}var dn=function(){};function Pn(t){return requestAnimationFrame(t)}var wt=Math.min,xt=Math.max,gn=Math.floor,Vt=Math.ceil,Z=Math.abs;function Mt(t,e,n,r){var o=wt(e,n),a=xt(e,n);return r?o<t&&t<a:o<=t&&t<=a}function kt(t,e,n){var r=wt(e,n),o=xt(e,n);return wt(xt(r,t),o)}function On(t){return+(t>0)-+(t<0)}function Cn(t,e){return at(e,function(n){t=t.replace("%s",""+n)}),t}function En(t){return t<10?"0"+t:""+t}var Dn={},et="mounted",ct="move",zt="moved",xn="shifted",Mn="slide:keydown",W="refresh",X="updated",Tt="resize",kn="resized",zn="repositioned",Ut="scrolled",Fn="destroy",Bn="navigation:mounted",Gn="lazyload:loaded";function H(t){var e=t.event,n={},r=[];function d(i,c,E){s(i,c,function(u,v){r=r.filter(function(_){return!!(_[0]!==u||_[1]!==v||E&&_[2]!==E)||(u.removeEventListener(v,_[2],_[3]),!1)})})}function s(i,c,E){at(i,function(u){u&&c.split(" ").forEach(E.bind(null,u))})}function f(){r=r.filter(function(i){return d(i[0],i[1])}),e.offBy(n)}return e.on(Fn,f,n),{on:function(i,c,E){e.on(i,c,n,E)},off:function(i){e.off(i,n)},emit:e.emit,bind:function(i,c,E,u){s(i,c,function(v,_){r.push([v,_,E,u]),v.addEventListener(_,E,u)})},unbind:d,destroy:f}}function hn(t,e,n,r){var a,d,o=Date.now,l=0,s=!0,f=0;function i(){if(!s){var S=o()-a;if(S>=t?(l=1,a=o()):l=S/t,n&&n(l),1===l&&(e(),r&&++f>=r))return E();Pn(i)}}function E(){s=!0}function v(){cancelAnimationFrame(d),l=0,d=0,s=!0}return{start:function(S){!S&&v(),a=o()-(S?l*t:0),s=!1,Pn(i)},rewind:function(){a=o(),l=0,n&&n(l)},pause:E,cancel:v,set:function(S){t=S},isPaused:function(){return s}}}function Wn(t,e){var n;return function(){var o=arguments,a=this;n||(n=hn(e||0,function(){t.apply(a,o),n=null},null,1)).start()}}var Oe={marginRight:["marginBottom","marginLeft"],autoWidth:["autoHeight"],fixedWidth:["fixedHeight"],paddingLeft:["paddingTop","paddingRight"],paddingRight:["paddingBottom","paddingLeft"],width:["height"],left:["top","right"],right:["bottom","left"],x:["y"],X:["Y"],Y:["X"],ArrowLeft:["ArrowUp","ArrowRight"],ArrowRight:["ArrowDown","ArrowLeft"]},Kt=U,jt=U+"__slide",Yn=jt+"--clone",Xn=U+"__arrows",_n=U+"__arrow",$n=_n+"--prev",qn=_n+"--next",jn=U+"__progress",St="is-active",Zn="is-prev",Jn="is-next",An="is-visible",yn="is-loading",We=[St,An,Zn,Jn,yn],He={slide:jt,clone:Yn,arrows:Xn,arrow:_n,prev:$n,next:qn,pagination:"splide__pagination",page:"splide__pagination__page",spinner:"splide__spinner"},Zt="role",pt="aria-controls",Jt="aria-current",It="aria-label",Qn="aria-hidden",Ft="tabindex",te="aria-orientation",Qt=[Zt,pt,Jt,It,Qn,te,Ft,"disabled"],Bt="slide",Lt="loop",tn="fade";var Nt={passive:!1,capture:!0},Tn="touchmove mousemove",Sn="touchend touchcancel mouseup",gr=["Left","Right","Up","Down"],ee="keydown",en=$+"-lazy",pn=en+"-srcset",Ar=[" ","Enter","Spacebar"],Sr=Object.freeze({__proto__:null,Options:function(t,e,n){var o,a,l,r=Wn(i);function f(E){E&&removeEventListener("resize",r)}function i(){var E=function(t,e){return mt(t).filter(function(u){return u[1].matches})[0]}(a)||[];E[0]!==l&&function(E){var u=n.breakpoints[E]||o;u.destroy?(t.options=o,t.destroy("completely"===u.destroy)):(t.state.is(5)&&(f(!0),t.mount()),t.options=u)}(l=E[0])}return{setup:function(){try{dt(n,JSON.parse(Ot(t.root,$)))}catch(v){Dt(!1,v.message)}o=dt({},n);var E=n.breakpoints;if(E){var u="min"===n.mediaQuery;a=Object.keys(E).sort(function(v,_){return u?+_-+v:+v-+_}).map(function(v){return[v,matchMedia("("+(u?"min":"max")+"-width:"+v+"px)")]}),i()}},mount:function(){a&&addEventListener("resize",r)},destroy:f}},Direction:function(t,e,n){return{resolve:function(a,l){var d=n.direction;return Oe[a]["rtl"!==d||l?"ttb"===d?0:-1:1]||a},orient:function(a){return a*("rtl"===n.direction?1:-1)}}},Elements:function(t,e,n){var s,f,i,c,o=H(t).on,a=t.root,l={},d=[];function E(){var g;(function(){f=nt(a,".splide__slider"),i=gt(a,".splide__track"),c=nt(i,".splide__list"),Dt(i&&c,"A track/list element is missing."),Pt(d,Nn(c,"."+jt+":not(."+Yn+")"));var g=T(".splide__autoplay"),p=T("."+Xn);cn(l,{root:a,slider:f,track:i,list:c,slides:d,arrows:p,autoplay:g,prev:gt(p,"."+$n),next:gt(p,"."+qn),bar:gt(T("."+jn),".splide__progress__bar"),play:gt(g,".splide__play"),pause:gt(g,".splide__pause")})})(),g=a.id||function(t){return""+t+En(Dn[t]=(Dn[t]||0)+1)}(U),a.id=g,i.id=i.id||g+"-track",c.id=c.id||g+"-list",ut(a,s=h())}function v(){[a,i,c].forEach(function(g){Q(g,"style")}),ht(d),Ct(a,s)}function _(){v(),E()}function N(){Ct(a,s),ut(a,s=h())}function T(g){return nt(a,g)||nt(f,g)}function h(){return[Kt+"--"+n.type,Kt+"--"+n.direction,n.drag&&Kt+"--draggable",n.isNavigation&&Kt+"--nav",St]}return cn(l,{setup:E,mount:function(){o(W,_,8),o(X,N)},destroy:v})},Slides:function(t,e,n){var r=H(t),o=r.on,a=r.emit,l=r.bind,d=e.Elements,s=d.slides,f=d.list,i=[];function E(){s.forEach(function(I,P){N(I,P,-1)})}function u(){p(function(I){I.destroy()}),ht(i)}function v(){u(),E()}function N(I,P,D){var k=function(t,e,n,r){var T,o=H(t),a=o.on,l=o.emit,d=o.bind,s=o.destroy,f=t.Components,i=t.root,c=t.options,E=c.isNavigation,u=c.updateOnMove,v=f.Direction.resolve,_=Ot(r,"style"),N=n>-1,S=nt(r,".splide__slide__container"),b=c.focusableNodes&&vn(r,c.focusableNodes);function p(){var M=Cn(c.i18n.slideX,(N?n:e)+1),V=t.splides.map(function(m){return m.splide.root.id}).join(" ");F(r,It,M),F(r,pt,V),F(r,Zt,"menuitem"),x(I())}function L(){T||w()}function w(){if(!T){var y=t.index;x(I()),function(y){var M=!y&&(!I()||N);F(r,Qn,M||null),F(r,Ft,!M&&c.slideFocus?0:null),b&&b.forEach(function(V){F(V,Ft,M?-1:null)}),y!==bn(r,An)&&(_t(r,An,y),l(y?"visible":"hidden",k))}(function(){if(t.is(tn))return I();var y=K(f.Elements.track),M=K(r),V=v("left"),m=v("right");return gn(y[V])<=Vt(M[V])&&gn(M[m])<=Vt(y[m])}()),_t(r,Zn,e===y-1),_t(r,Jn,e===y+1)}}function x(y){y!==bn(r,St)&&(_t(r,St,y),E&&F(r,Jt,y||null),l(y?"active":"inactive",k))}function I(){var y=t.index;return y===e||c.cloneStatus&&y===n}var k={index:e,slideIndex:n,slide:r,container:S,isClone:N,mount:function(){N||(r.id=i.id+"-slide"+En(e+1)),d(r,"click keydown",function(y){l("click"===y.type?"click":Mn,k,y)}),a([W,zn,xn,zt,Ut],w),a(Bn,p),u&&a(ct,L)},destroy:function(){T=!0,s(),Ct(r,We),Q(r,Qt),F(r,"style",_)},update:w,style:function(y,M,V){j(V&&S||r,y,M)},isWithin:function(y,M){var V=Z(y-e);return!N&&(c.rewind||t.is(Lt))&&(V=wt(V,t.length-V)),V<=M}};return k}(t,P,D,I);k.mount(),i.push(k)}function S(I){return I?L(function(P){return!P.isClone}):i}function p(I,P){S(P).forEach(I)}function L(I){return i.filter(function(t){return"function"==typeof t}(I)?I:function(P){return ot(I)?fn(P.slide,I):Xt(Rt(I),P.index)})}return{mount:function(){E(),o(W,v),o([et,W],function(){i.sort(function(I,P){return I.index-P.index})})},destroy:u,update:function(){p(function(I){I.update()})},register:N,get:S,getIn:function(I){var P=e.Controller,D=P.toIndex(I),k=P.hasFocus()?1:n.perPage;return L(function(y){return Mt(y.index,D,D+k-1)})},getAt:function(I){return L(I)[0]},add:function(I,P){at(I,function(D){if(ot(D)&&(D=Rn(D)),un(D)){var k=s[P];k?sn(D,k):$t(f,D),ut(D,n.classes.slide),function(I,P){var D=vn(I,"img"),k=D.length;k?D.forEach(function(y){l(y,"load error",function(){--k||P()})}):P()}(D,a.bind(null,Tt))}}),a(W)},remove:function(I){yt(L(I).map(function(P){return P.slide})),a(W)},forEach:p,filter:L,style:function(I,P,D){p(function(k){k.style(I,P,D)})},getLength:function(I){return I?s.length:i.length},isEnough:function(){return i.length>n.perPage}}},Layout:function(t,e,n){var v,_,r=H(t),o=r.on,a=r.bind,l=r.emit,d=e.Slides,s=e.Direction.resolve,f=e.Elements,i=f.root,c=f.track,E=f.list,u=d.getAt;function S(){_=null,v="ttb"===n.direction,j(i,"maxWidth",ft(n.width)),j(c,s("paddingLeft"),h(!1)),j(c,s("paddingRight"),h(!0)),b()}function b(){var y=K(i);(!_||_.width!==y.width||_.height!==y.height)&&(j(c,"height",function(){var y="";return v&&(Dt(y=p(),"height or heightRatio is missing."),y="calc("+y+" - "+h(!1)+" - "+h(!0)+")"),y}()),d.style(s("marginRight"),ft(n.gap)),d.style("width",(n.autoWidth?"":ft(n.fixedWidth)||(v?"":x()))||null),d.style("height",ft(n.fixedHeight)||(v?n.autoHeight?"":x():p())||null,!0),_=y,l(kn))}function h(y){var M=n.padding,V=s(y?"right":"left");return M&&ft(M[V]||(bt(M)?0:M))||"0px"}function p(){return ft(n.height||K(E).width*n.heightRatio)}function x(){var y=ft(n.gap);return"calc((100%"+(y&&" + "+y)+")/"+(n.perPage||1)+(y&&" - "+y)+")"}function I(y,M){var V=u(y);if(V){var m=K(V.slide)[s("right")],A=K(E)[s("left")];return Z(m-A)+(M?0:D())}return 0}function D(){var y=u(0);return y&&parseFloat(j(y.slide,s("marginRight")))||0}return{mount:function(){S(),a(window,"resize load",Wn(l.bind(this,Tt))),o([X,W],S),o(Tt,b)},listSize:function(){return K(E)[s("width")]},slideSize:function(y,M){var V=u(y||0);return V?K(V.slide)[s("width")]+(M?0:D()):0},sliderSize:function(){return I(t.length-1,!0)-I(-1,!0)},totalSize:I,getPadding:function(y){return parseFloat(j(c,s("padding"+(y?"Right":"Left"))))||0}}},Clones:function(t,e,n){var i,r=H(t),o=r.on,a=r.emit,l=e.Elements,d=e.Slides,s=e.Direction.resolve,f=[];function E(){(i=b())&&(function(T){var h=d.get().slice(),g=h.length;if(g){for(;h.length<T;)Pt(h,h);Pt(h.slice(-T),h.slice(0,T)).forEach(function(p,L){var w=L<T,x=function(T,h){var g=T.cloneNode(!0);return ut(g,n.classes.clone),g.id=t.root.id+"-clone"+En(h+1),g}(p.slide,L);w?sn(x,h[0].slide):$t(l.list,x),Pt(f,x),d.register(x,L-T+(w?0:g),p.index)})}}(i),a(Tt))}function u(){yt(f),ht(f)}function v(){u(),E()}function _(){i<b()&&a(W)}function b(){var T=n.clones;if(t.is(Lt)){if(!T){var h=function(t,e){if(ot(e)){var n=At("div",{style:"width: "+e+"; position: absolute;"},t);e=K(n).width,yt(n)}return e}(l.list,n[s("fixedWidth")]);T=(h&&Vt(K(l.track)[s("width")]/h)||n[s("autoWidth")]&&t.length||n.perPage)*(n.drag?(n.flickMaxPages||1)+1:2)}}else T=0;return T}return{mount:function(){E(),o(W,v),o([X,Tt],_)},destroy:u}},Move:function(t,e,n){var b,r=H(t),o=r.on,a=r.emit,l=e.Layout,d=l.slideSize,s=l.getPadding,f=l.totalSize,i=l.listSize,c=l.sliderSize,E=e.Direction,u=E.resolve,v=E.orient,_=e.Elements,N=_.list,S=_.track;function g(){V()||(e.Scroll.cancel(),L(t.index),a(zn))}function L(A){w(P(A,!0))}function w(A,R){if(!t.is(tn)){var O=R?A:function(A){if(t.is(Lt)){var R=v(A-D()),O=m(!1,A)&&R<0,z=m(!0,A)&&R>0;(O||z)&&(A=B(A,z))}return A}(A);N.style.transform="translate"+u("X")+"("+O+"px)",A!==O&&a(xn)}}function B(A,R){var O=A-M(R),z=c();return A-v(z*(Vt(Z(O)/z)||1))*(R?1:-1)}function P(A,R){var O=v(f(A-1)-function(A){var R=n.focus;return"center"===R?(i()-d(A,!0))/2:+R*d(A)||0}(A));return R?function(A){return n.trimSpace&&t.is(Bt)&&(A=kt(A,0,v(c()-i()))),A}(O):O}function D(){var A=u("left");return K(N)[A]-K(S)[A]+v(s(!1))}function M(A){return P(A?e.Controller.getEnd():0,!!n.trimSpace)}function V(){return t.state.is(4)&&n.waitForTransition}function m(A,R){R=on(R)?D():R;var O=!0!==A&&v(R)<v(M(!1)),z=!1!==A&&v(R)>v(M(!0));return O||z}return{mount:function(){b=e.Transition,o([et,kn,X,W],g)},destroy:function(){Q(N,"style")},move:function(A,R,O,z){if(!V()){var J=t.state.set,Et=D();A!==R&&(b.cancel(),w(B(Et,A>R),!0)),J(4),a(ct,R,O,A),b.start(R,function(){J(3),a(zt,R,O,A),"move"===n.trimSpace&&A!==O&&Et===D()?e.Controller.go(A>O?">":"<",!1,z):z&&z()})}},jump:L,translate:w,shift:B,cancel:function(){w(D()),b.cancel()},toIndex:function(A){for(var R=e.Slides.get(),O=0,z=1/0,J=0;J<R.length;J++){var Et=R[J].index,Gt=Z(P(Et,!0)-A);if(!(Gt<=z))break;z=Gt,O=Et}return O},toPosition:P,getPosition:D,getLimit:M,isBusy:V,exceededLimit:m}},Controller:function(t,e,n){var _,N,S,o=H(t).on,a=e.Move,l=a.getPosition,d=a.getLimit,s=e.Slides,f=s.isEnough,i=s.getLength,c=t.is(Lt),E=t.is(Bt),u=n.start||0,v=u;function T(){_=i(!0),N=n.perMove,S=n.perPage,u=kt(u,0,_-1)}function g(m,A,R,O,z){var J=A?m:k(m);e.Scroll.scroll(A||R?a.toPosition(J,!0):m,O,function(){y(a.toIndex(a.getPosition())),z&&z()})}function L(m){return x(!1,m)}function w(m){return x(!0,m)}function x(m,A){var R=N||(V()?1:S),O=B(u+R*(m?-1:1),u);return-1===O&&E&&!function(t,e,n){return Z(t-e)<1}(l(),d(!m))?m?0:G():A?O:I(O)}function B(m,A,R){if(f()){var O=G();m<0||m>O?m=Mt(0,m,A,!0)||Mt(O,A,m,!0)?P(D(m)):c?N||V()?m:m<0?-(_%S||S):_:n.rewind?m<0?O:0:-1:!R&&m!==A&&(m=N?m:P(D(A)+(m<A?-1:1)))}else m=-1;return m}function G(){var m=_-S;return(V()||c&&N)&&(m=_-1),xt(m,0)}function I(m){return c?f()?m%_+(m<0?_:0):-1:m}function P(m){return kt(V()?m:S*m,0,G())}function D(m){return V()||(m=Mt(m,_-S,_-1)?_-1:m,m=gn(m/S)),m}function k(m){var A=a.toIndex(m);return E?kt(A,0,G()):A}function y(m){m!==u&&(v=u,u=m)}function V(){return!on(n.focus)||n.isNavigation}return{mount:function(){T(),o([X,W],T,9)},go:function(m,A,R){var O=function(m){var A=u;if(ot(m)){var R=m.match(/([+\-<>])(\d+)?/)||[],O=R[1],z=R[2];"+"===O||"-"===O?A=B(u+ +(""+O+(+z||1)),u,!0):">"===O?A=z?P(+z):L(!0):"<"===O&&(A=w(!0))}else A=c?m:kt(m,0,G());return A}(m);if(n.useScroll)g(O,!0,!0,n.speed,R);else{var z=I(O);z>-1&&!a.isBusy()&&(A||z!==u)&&(y(z),a.move(O,z,v,R))}},scroll:g,getNext:L,getPrev:w,getAdjacent:x,getEnd:G,setIndex:y,getIndex:function(m){return m?v:u},toIndex:P,toPage:D,toDest:k,hasFocus:V}},Arrows:function(t,e,n){var v,r=H(t),o=r.on,a=r.bind,l=r.emit,d=n.classes,s=n.i18n,f=e.Elements,i=e.Controller,c=f.arrows,E=f.prev,u=f.next,_={};function S(){if(n.arrows&&(!E||!u)&&(c=At("div",d.arrows),E=g(!0),u=g(!1),v=!0,$t(c,[E,u]),sn(c,nt("slider"===n.arrows&&f.slider||t.root))),E&&u)if(_.prev)qt(c,!1===n.arrows?"none":"");else{var L=f.track.id;F(E,pt,L),F(u,pt,L),_.prev=E,_.next=u,function(){var L=i.go;o([et,zt,X,W,Ut],p),a(u,"click",function(){L(">",!0)}),a(E,"click",function(){L("<",!0)})}(),l("arrows:mounted",E,u)}}function g(L){return Rn('<button class="'+d.arrow+" "+(L?d.prev:d.next)+'" type="button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="40" height="40"><path d="'+(n.arrowPath||"m15.5 0.932-4.3 4.38 14.5 14.6-14.5 14.5 4.3 4.4 14.6-14.6 4.4-4.3-4.4-4.4-14.6-14.6z")+'" />')}function p(){var L=t.index,w=i.getPrev(),x=i.getNext(),B=w>-1&&L<w?s.last:s.prev,G=x>-1&&L>x?s.first:s.next;E.disabled=w<0,u.disabled=x<0,F(E,It,B),F(u,It,G),l("arrows:updated",E,u,w,x)}return{arrows:_,mount:function(){S(),o(X,S)},destroy:function(){v?yt(c):(Q(E,Qt),Q(u,Qt))}}},Autoplay:function(t,e,n){var i,c,E,r=H(t),o=r.on,a=r.bind,l=r.emit,d=hn(n.interval,t.go.bind(t,">"),function(g){var p=f.bar;p&&j(p,"width",100*g+"%"),l("autoplay:playing",g)}),s=d.isPaused,f=e.Elements;function v(g){var p=g?"pause":"play",L=f[p];L&&(F(L,pt,f.track.id),F(L,It,n.i18n[p]),a(L,"click",g?S:N))}function N(){s()&&e.Slides.isEnough()&&(d.start(!n.resetProgress),c=i=E=!1,l("autoplay:play"))}function S(g){void 0===g&&(g=!0),s()||(d.pause(),l("autoplay:pause")),E=g}function b(){E||(i||c?S(!1):N())}function h(){var g=e.Slides.getAt(t.index);d.set(g&&+Ot(g.slide,"data-splide-interval")||n.interval)}return{mount:function(){var g=n.autoplay;g&&(v(!0),v(!1),function(){var g=f.root;n.pauseOnHover&&a(g,"mouseenter mouseleave",function(p){i="mouseenter"===p.type,b()}),n.pauseOnFocus&&a(g,"focusin focusout",function(p){c="focusin"===p.type,b()}),o([ct,"scroll",W],d.rewind),o(ct,h)}(),"pause"!==g&&N())},destroy:d.cancel,play:N,pause:S,isPaused:s}},Cover:function(t,e,n){var o=H(t).on;function d(f){e.Slides.forEach(function(i){var c=nt(i.container||i.slide,"img");c&&c.src&&s(f,c,i)})}function s(f,i,c){c.style("background",f?'center/cover no-repeat url("'+i.src+'")':"",!0),qt(i,f?"none":"")}return{mount:function(){n.cover&&(o(Gn,function(f,i){s(!0,f,i)}),o([et,X,W],d.bind(null,!0)))},destroy:function(){d(!1)}}},Scroll:function(t,e,n){var i,c,r=H(t),o=r.on,a=r.emit,l=e.Move,d=l.getPosition,s=l.getLimit,f=l.exceededLimit;function _(){var h=d(),g=l.toIndex(h);Mt(g,0,t.length-1)||l.translate(l.shift(h,g>0),!0),c&&c(),a(Ut)}function S(){i&&i.cancel()}function b(){i&&!i.isPaused()&&(S(),_())}return{mount:function(){o(ct,S),o([X,W],b)},destroy:S,scroll:function u(h,g,p,L){var w=d(),x=1;g=g||function(h){return xt(h/1.5,800)}(Z(h-w)),c=p,S(),i=hn(g,_,function(B){var G=d(),I=w+(h-w)*function(h){var g=n.easingFunc;return g?g(h):1-Math.pow(1-h,4)}(B),P=(I-d())*x;l.translate(G+P),t.is(Bt)&&!L&&f()&&(x*=.6,Z(P)<10&&function(h){u(s(!h),600,null,!0)}(f(!1)))},1),a("scroll"),i.start()},cancel:b}},Drag:function(t,e,n){var S,b,T,h,g,p,w,x,B,r=H(t),o=r.on,a=r.emit,l=r.bind,d=r.unbind,s=e.Move,f=e.Scroll,i=e.Controller,c=e.Elements.track,E=e.Direction,u=E.resolve,v=E.orient,_=s.getPosition,N=s.exceededLimit,L=!1;function I(){var C=n.drag;Gt(!C),g="free"===C}function P(C){if(!x){var Y=n.noDrag,rt=J(C);(!Y||!fn(C.target,Y))&&(rt||!C.button)&&(s.isBusy()?st(C,!0):(B=rt?c:window,T=null,h=null,w=!1,l(B,Tn,D,Nt),l(B,Sn,k,Nt),s.cancel(),f.cancel(),y(C)))}}function D(C){if(h||a("drag"),h=C,C.cancelable){var Y=R(C)-R(b);if(p){s.translate(S+function(C){return C/(L&&t.is(Bt)?5:1)}(Y));var rt=O(C)-O(b)>200,it=L!==(L=N());(rt||it)&&y(C),a("dragging"),w=!0,st(C)}else{var vt=n.dragMinThreshold;vt=bt(vt)?vt:{mouse:0,touch:+vt||10},p=Z(Y)>(J(C)?vt.touch:vt.mouse),V()&&st(C)}}}function k(C){d(B,Tn,D),d(B,Sn,k);var Y=t.index;if(h){if(p||C.cancelable&&V()){var rt=function(C){if(t.is(Lt)||!L){var Y=b===h&&T||b,rt=R(h)-R(Y),it=O(C)-O(Y),vt=O(C)-O(h)<200;if(it&&vt)return rt/it}return 0}(C),it=function(C){return _()+On(C)*wt(Z(C)*(n.flickPower||600),g?1/0:e.Layout.listSize()*(n.flickMaxPages||1))}(rt);g?i.scroll(it):t.is(tn)?i.go(Y+v(On(rt))):i.go(i.toDest(it),!0),st(C)}a("dragged")}else!g&&_()!==s.toPosition(Y)&&i.go(Y,!0);p=!1}function y(C){T=b,b=C,S=_()}function M(C){!x&&w&&st(C,!0)}function V(){return Z(R(h)-R(b))>Z(R(h,!0)-R(b,!0))}function R(C,Y){return(J(C)?C.touches[0]:C)["page"+u(Y?"Y":"X")]}function O(C){return C.timeStamp}function J(C){return"undefined"!=typeof TouchEvent&&C instanceof TouchEvent}function Gt(C){x=C}return{mount:function(){l(c,Tn,dn,Nt),l(c,Sn,dn,Nt),l(c,"touchstart mousedown",P,Nt),l(c,"click",M,{capture:!0}),l(c,"dragstart",st),o([et,X],I)},disable:Gt,isDragging:function(){return p}}},Keyboard:function(t,e,n){var f,i,r=H(t),o=r.on,a=r.bind,l=r.unbind,d=t.root,s=e.Direction.resolve;function E(){var b=n.keyboard;b&&("focused"===b?(f=d,F(d,Ft,0)):f=window,a(f,ee,S))}function u(){l(f,ee),un(f)&&Q(f,Ft)}function _(){var b=i;i=!0,ln(function(){i=b})}function N(){u(),E()}function S(b){if(!i){var T=b.key,h=Xt(gr,T)?"Arrow"+T:T;h===s("ArrowLeft")?t.go("<"):h===s("ArrowRight")&&t.go(">")}}return{mount:function(){E(),o(X,N),o(ct,_)},destroy:u,disable:function(b){i=b}}},LazyLoad:function(t,e,n){var r=H(t),o=r.on,a=r.off,l=r.bind,d=r.emit,s="sequential"===n.lazyLoad,f=[],i=0;function E(){v(),u()}function u(){e.Slides.forEach(function(T){vn(T.slide,"[data-splide-lazy], [data-splide-lazy-srcset]").forEach(function(h){var g=Ot(h,en),p=Ot(h,pn);if(g!==h.src||p!==h.srcset){var L=n.classes.spinner,w=h.parentElement,x=nt(w,"."+L)||At("span",L,w);F(x,Zt,"presentation"),f.push({_img:h,_Slide:T,src:g,srcset:p,_spinner:x}),!h.src&&qt(h,"none")}})}),s&&b()}function v(){i=0,f=[]}function _(){(f=f.filter(function(T){return!T._Slide.isWithin(t.index,n.perPage*((n.preloadPages||1)+1)-1)||N(T)})).length||a(zt)}function N(T){var h=T._img;ut(T._Slide.slide,yn),l(h,"load error",function(g){!function(T,h){var g=T._Slide;Ct(g.slide,yn),yt(T._spinner),h||(qt(T._img,""),d(Gn,T._img,g),d(Tt)),s&&b()}(T,"error"===g.type)}),["src","srcset"].forEach(function(g){T[g]&&(F(h,g,T[g]),Q(h,"src"===g?en:pn))})}function b(){i<f.length&&N(f[i++])}return{mount:function(){n.lazyLoad&&(u(),o(W,E),s||o([et,W,zt,Ut],_))},destroy:v}},Pagination:function(t,e,n){var v,r=H(t),o=r.on,a=r.emit,l=r.bind,d=r.unbind,s=e.Slides,f=e.Elements,i=e.Controller,c=i.hasFocus,E=i.getIndex,u=[];function N(){S(),n.pagination&&s.isEnough()&&(function(){var p=t.length,L=n.classes,w=n.i18n,x=n.perPage,B="slider"===n.pagination&&f.slider||f.root,G=c()?p:Vt(p/x);v=At("ul",L.pagination,B);for(var I=0;I<G;I++){var P=At("li",null,v),D=At("button",{class:L.page,type:"button"},P),k=s.getIn(I).map(function(M){return M.slide.id}),y=!c()&&x>1?w.pageX:w.slideX;l(D,"click",T.bind(null,I)),F(D,pt,k.join(" ")),F(D,It,Cn(y,I+1)),u.push({li:P,button:D,page:I})}}(),a("pagination:mounted",{list:v,items:u},h(t.index)),g())}function S(){v&&(yt(v),u.forEach(function(p){d(p.button,"click")}),ht(u),v=null)}function T(p){i.go(">"+p,!0,function(){var L=s.getAt(i.toIndex(p));L&&function(t){t.setActive&&t.setActive()||t.focus({preventScroll:!0})}(L.slide)})}function h(p){return u[i.toPage(p)]}function g(){var p=h(E(!0)),L=h(E());p&&(Ct(p.button,St),Q(p.button,Jt)),L&&(ut(L.button,St),F(L.button,Jt,!0)),a("pagination:updated",{list:v,items:u},p,L)}return{items:u,mount:function(){N(),o([X,W],N),o([ct,Ut],g)},destroy:S,getAt:h,update:g}},Sync:function(t,e,n){var r=e.Elements.list,o=[];function a(){var u,v;t.splides.forEach(function(u){!u.isParent&&function(u){[t,u].forEach(function(v){var _=H(v),N=v===t?u:t;_.on(ct,function(S,b,T){N.go(N.is(Lt)?T:S)}),o.push(_)})}(u.splide)}),n.isNavigation&&((v=(u=H(t)).on)("click",c),v(Mn,E),v([et,X],i),F(r,Zt,"menu"),o.push(u),u.emit(Bn,t.splides))}function l(){Q(r,Qt),o.forEach(function(u){u.destroy()}),ht(o)}function i(){F(r,te,"ttb"!==n.direction?"horizontal":null)}function c(u){t.go(u.index)}function E(u,v){Xt(Ar,v.key)&&(c(u),st(v))}return{mount:a,destroy:l,remount:function(){l(),a()}}},Wheel:function(t,e,n){var o=H(t).bind;function l(s){if(s.cancelable){var f=s.deltaY;if(f){var i=f<0;t.go(i?"<":">"),function(s){return!n.releaseWheel||t.state.is(4)||-1!==e.Controller.getAdjacent(s)}(i)&&st(s)}}}return{mount:function(){n.wheel&&o(e.Elements.track,"wheel",l,Nt)}}}}),re={type:"slide",speed:400,waitForTransition:!0,perPage:1,cloneStatus:!0,arrows:!0,pagination:!0,interval:5e3,pauseOnHover:!0,pauseOnFocus:!0,resetProgress:!0,keyboard:!0,easing:"cubic-bezier(0.25, 1, 0.5, 1)",drag:!0,direction:"ltr",slideFocus:!0,trimSpace:!0,focusableNodes:"a, button, textarea, input, select, iframe",classes:He,i18n:{prev:"Previous slide",next:"Next slide",first:"Go to first slide",last:"Go to last slide",slideX:"Go to slide %s",pageX:"Go to page %s",play:"Start autoplay",pause:"Pause autoplay"}};function Ir(t,e,n){var o=H(t).on;return{mount:function(){o([et,W],function(){ln(function(){e.Slides.style("transition","opacity "+n.speed+"ms "+n.easing)})})},start:function(d,s){var f=e.Elements.track;j(f,"height",ft(K(f).height)),ln(function(){s(),j(f,"height","")})},cancel:dn}}function Lr(t,e,n){var s,o=H(t).bind,a=e.Move,l=e.Controller,d=e.Elements.list;function c(){u("")}function u(v){j(d,"transition",v)}return{mount:function(){o(d,"transitionend",function(v){v.target===d&&s&&(c(),s())})},start:function(v,_){var N=a.toPosition(v,!0),S=a.getPosition(),b=function(v){var _=n.rewindSpeed;if(t.is(Bt)&&_){var N=l.getIndex(!0),S=l.getEnd();if(0===N&&v>=S||N>=S&&0===v)return _}return n.speed}(v);Z(N-S)>=1&&b>=1?(u("transform "+b+"ms "+n.easing),a.translate(N,!0),s=_):(a.jump(v),_())},cancel:c}}var Nr=function(){function t(n,r){this.event=function(){var t={};function n(d,s){l(d,function(f,i){var c=t[f];t[f]=c&&c.filter(function(E){return E._key?E._key!==s:s||E._namespace!==i})})}function l(d,s){Rt(d).join(" ").split(" ").forEach(function(f){var i=f.split(".");s(i[0],i[1])})}return{on:function(d,s,f,i){void 0===i&&(i=10),l(d,function(c,E){t[c]=t[c]||[],Pt(t[c],{_event:c,_callback:s,_namespace:E,_priority:i,_key:f}).sort(function(u,v){return u._priority-v._priority})})},off:n,offBy:function(d){lt(t,function(s,f){n(f,d)})},emit:function(d){var s=arguments;(t[d]||[]).forEach(function(f){f._callback.apply(f,mt(s,1))})},destroy:function(){t={}}}}(),this.Components={},this.state=function(t){var e=1;return{set:function(o){e=o},is:function(o){return Xt(Rt(o),e)}}}(),this.splides=[],this._options={},this._Extensions={};var o=ot(n)?gt(document,n):n;Dt(o,o+" is invalid."),this.root=o,dt(re,t.defaults),dt(dt(this._options,re),r||{})}var e=t.prototype;return e.mount=function(r,o){var a=this,l=this.state,d=this.Components;return Dt(l.is([1,5]),"Already mounted!"),l.set(1),this._Components=d,this._Transition=o||this._Transition||(this.is(tn)?Ir:Lr),this._Extensions=r||this._Extensions,lt(cn({},Sr,this._Extensions,{Transition:this._Transition}),function(f,i){var c=f(a,d,a._options);d[i]=c,c.setup&&c.setup()}),lt(d,function(f){f.mount&&f.mount()}),this.emit(et),ut(this.root,"is-initialized"),l.set(3),this.emit("ready"),this},e.sync=function(r){return this.splides.push({splide:r}),r.splides.push({splide:this,isParent:!0}),this.state.is(3)&&(this._Components.Sync.remount(),r.Components.Sync.remount()),this},e.go=function(r){return this._Components.Controller.go(r),this},e.on=function(r,o){return this.event.on(r,o,null,20),this},e.off=function(r){return this.event.off(r),this},e.emit=function(r){var o;return(o=this.event).emit.apply(o,[r].concat(mt(arguments,1))),this},e.add=function(r,o){return this._Components.Slides.add(r,o),this},e.remove=function(r){return this._Components.Slides.remove(r),this},e.is=function(r){return this._options.type===r},e.refresh=function(){return this.emit(W),this},e.destroy=function(r){void 0===r&&(r=!0);var o=this.event,a=this.state;return a.is(1)?o.on("ready",this.destroy.bind(this,r),this):(lt(this._Components,function(l){l.destroy&&l.destroy(r)},!0),o.emit(Fn),o.destroy(),r&&ht(this.splides),a.set(5)),this},_createClass(t,[{key:"options",get:function(){return this._options},set:function(r){var o=this._options;dt(o,r),this.state.is(1)||this.emit(X,o)}},{key:"length",get:function(){return this._Components.Slides.getLength(!0)}},{key:"index",get:function(){return this._Components.Controller.getIndex()}}]),t}(),In=Nr;return In.defaults={},In.STATES={CREATED:1,MOUNTED:2,IDLE:3,MOVING:4,DESTROYED:5},In});