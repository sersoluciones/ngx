(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{"e6/O":function(e,o,t){"use strict";t.r(o);var n={};t.r(n),t.d(n,"CookiesExample",(function(){return u}));var r={};t.r(r),t.d(r,"PrefersColorSchemeExample",(function(){return g}));var s=t("JHrX"),c=t("fXoL");let a=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c.Gb({type:e,selectors:[["showcase-password"]],decls:2,vars:0,template:function(e,o){1&e&&(c.Sb(0,"p"),c.wc(1,"password works!"),c.Rb())},styles:[""]}),e})(),i=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c.Gb({type:e,selectors:[["showcase-snackbar"]],decls:2,vars:0,template:function(e,o){1&e&&(c.Sb(0,"p"),c.wc(1,"snackbar works!"),c.Rb())},styles:[""]}),e})(),l=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c.Gb({type:e,selectors:[["showcase-fullscreen"]],decls:2,vars:0,template:function(e,o){1&e&&(c.Sb(0,"p"),c.wc(1,"fullscreen works!"),c.Rb())},styles:[""]}),e})(),b=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(o){return new(o||e)},e.\u0275cmp=c.Gb({type:e,selectors:[["showcase-click"]],decls:2,vars:0,template:function(e,o){1&e&&(c.Sb(0,"p"),c.wc(1,"click works!"),c.Rb())},styles:[""]}),e})();var p=t("oVZu");const u="import { Cookies } from '@sersol/ngx';\n\nCookies.get('Test'); // Obtiene el valor de una cookie\nCookies.set('Test', '123'); // Setea valor de una cookie\nCookies.delete('Test'); // Elimina una cookie\nCookies.deleteAll(); // Elimina todas las cookies";let d=(()=>{class e{constructor(){}getAll(){const e={};if(document.cookie&&""!==document.cookie){const t=document.cookie.split("; ");for(let n=0;n<t.length;n+=1){const r=t[n].split("="),s=decodeURIComponent(r[0].trim()),c=decodeURIComponent(r.slice(1,t[n].length-1).join("="));if("true"===c)e[s]=!0;else if("false"===c)e[s]=!1;else try{e[s]=JSON.parse(c)}catch(o){e[s]=c}}}return e}get(e){const o=this.getAll();return o.hasOwnProperty(e)?o[e]:null}set(e,o,t,n,r,s,c){"object"==typeof o&&(o=JSON.stringify(o));let a=encodeURIComponent(e)+"="+encodeURIComponent(o)+";";t&&(a+="number"==typeof t?"expires="+new Date(1e3*t).toUTCString()+";":"expires="+t.toUTCString()+";"),n&&(a+="path="+n+";"),r&&(a+="domain="+r+";"),s&&(a+="secure;"),c&&(a+="sameSite="+c+";"),document.cookie=a}delete(e,o,t){this.set(e,"",new Date("Thu, 01 Jan 1970 00:00:01 GMT"),o,t)}deleteAll(){const e=document.cookie.split(";");for(let o=0;o<e.length;o++){const t=e[o],n=t.indexOf("="),r=n>-1?t.substr(0,n):t;document.cookie=r+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"}}}return e.\u0275fac=function(o){return new(o||e)},e.\u0275prov=c.Ib({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var m=t("OtPg");let h=(()=>{class e extends p.a{constructor(e,o){super(e),this.injectorObj=e,this.cookies=o,this.examples=n}}return e.\u0275fac=function(o){return new(o||e)(c.Mb(c.r),c.Mb(d))},e.\u0275cmp=c.Gb({type:e,selectors:[["showcase-cookies"]],features:[c.yb],decls:12,vars:1,consts:[["href","#cookies",1,"bttn","icon"],[1,"material-icons"],[1,"description"],["href","https://sersoluciones.github.io/ngx-ui-doc/classes/_cookie_.cookies.html","target","_blank","rel","noopener noreferrer"],[3,"highlight"]],template:function(e,o){1&e&&(c.Sb(0,"h2"),c.Sb(1,"a",0),c.Sb(2,"span",1),c.wc(3,"link"),c.Rb(),c.Rb(),c.wc(4," Cookies\n"),c.Rb(),c.Sb(5,"p",2),c.wc(6," ("),c.Sb(7,"a",3),c.wc(8,"Cookies"),c.Rb(),c.wc(9,") Clase abstracta para obtener, actualizar y borrar cookies en el navegador web\n"),c.Rb(),c.Sb(10,"pre"),c.Nb(11,"code",4),c.Rb()),2&e&&(c.Bb(11),c.hc("highlight",o.examples.CookiesExample))},directives:[m.a],styles:[""]}),e})();var f=t("tyNb");const g="import { PrefersColorScheme } from '@sersol/ngx';\n\nconstructor(colorscheme: PrefersColorSchemeService) {\n    colorscheme.init();\n    colorscheme.watch();\n}";var k=t("yshZ"),w=t("ofXK");const S=function(e){return{blue:e}},R=[{path:"theme",component:(()=>{class e extends p.a{constructor(e,o){super(e),this.injectorObj=e,this.colorscheme=o,this.examples=r}}return e.\u0275fac=function(o){return new(o||e)(c.Mb(c.r),c.Mb(k.a))},e.\u0275cmp=c.Gb({type:e,selectors:[["ng-component"]],features:[c.yb],decls:40,vars:7,consts:[["href","#color-schema",1,"bttn","icon"],[1,"material-icons"],[1,"description"],["href","n-ui-doc/classes/_prefers_color_scheme_.preferscolorscheme.html","target","_blank","rel","noopener noreferrer"],[1,"dark-os-config"],[1,"item"],["href","assets/dark-mac.png","target","_blank","rel","noopener noreferrer"],["src","assets/dark-mac.png","alt","macOS"],["href","assets/dark-windows.png","target","_blank","rel","noopener noreferrer"],["src","assets/dark-windows.png","alt","Windows"],["href","assets/dark-ios.jpeg","target","_blank","rel","noopener noreferrer"],["src","assets/dark-ios.jpeg","alt","iOS"],["href","assets/dark-android.png","target","_blank","rel","noopener noreferrer"],["src","assets/dark-android.png","alt","Android"],[1,"bttn-group"],["type","button",1,"bttn",3,"ngClass","click"],[3,"highlight"]],template:function(e,o){1&e&&(c.Sb(0,"h2"),c.Sb(1,"a",0),c.Sb(2,"span",1),c.wc(3,"link"),c.Rb(),c.Rb(),c.wc(4," Tema claro/oscuro\n"),c.Rb(),c.Sb(5,"p",2),c.wc(6," ("),c.Sb(7,"a",3),c.wc(8,"PrefersColorScheme"),c.Rb(),c.wc(9,") Clase para detectar, cambiar y observar el esquema de color claro/oscuro en conjunto con el sistema operativo anfitri\xf3n\n"),c.Rb(),c.Sb(10,"div",4),c.Sb(11,"div",5),c.Sb(12,"h4"),c.wc(13,"macOS Mojave+"),c.Rb(),c.Sb(14,"a",6),c.Nb(15,"img",7),c.Rb(),c.Rb(),c.Sb(16,"div",5),c.Sb(17,"h4"),c.wc(18,"Windows 10 (October 2018)+"),c.Rb(),c.Sb(19,"a",8),c.Nb(20,"img",9),c.Rb(),c.Rb(),c.Sb(21,"div",5),c.Sb(22,"h4"),c.wc(23,"iOS 13+"),c.Rb(),c.Sb(24,"a",10),c.Nb(25,"img",11),c.Rb(),c.Rb(),c.Sb(26,"div",5),c.Sb(27,"h4"),c.wc(28,"Android 10+"),c.Rb(),c.Sb(29,"a",12),c.Nb(30,"img",13),c.Rb(),c.Rb(),c.Rb(),c.Sb(31,"p",2),c.wc(32,"\xd3 puedes controlar de manera manual el esquema de color independiente del sistema operativo"),c.Rb(),c.Sb(33,"div",14),c.Sb(34,"button",15),c.ac("click",(function(){return o.colorscheme.enableLight()})),c.wc(35,"Claro"),c.Rb(),c.Sb(36,"button",15),c.ac("click",(function(){return o.colorscheme.enableDark()})),c.wc(37,"Oscuro"),c.Rb(),c.Rb(),c.Sb(38,"pre"),c.Nb(39,"code",16),c.Rb()),2&e&&(c.Bb(34),c.hc("ngClass",c.ic(3,S,!o.colorscheme.dark)),c.Bb(2),c.hc("ngClass",c.ic(5,S,o.colorscheme.dark)),c.Bb(3),c.hc("highlight",o.examples.PrefersColorSchemeExample))},directives:[w.j,m.a],styles:[".dark-os-config[_ngcontent-%COMP%]{width:100%;overflow-x:auto;display:flex}.dark-os-config[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{text-align:center}.dark-os-config[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:300px;max-height:300px;margin:12px;box-shadow:2px 2px 12px 0 #000;border-radius:4px}"]}),e})()},{path:"cookies",component:h},{path:"click",component:b},{path:"fullscreen",component:l},{path:"snackbar",component:i},{path:"password",component:a}];let C=(()=>{class e{}return e.\u0275mod=c.Kb({type:e}),e.\u0275inj=c.Jb({factory:function(o){return new(o||e)},imports:[[f.d.forChild(R)],f.d]}),e})();t.d(o,"UtilsModule",(function(){return v}));let v=(()=>{class e{}return e.\u0275mod=c.Kb({type:e}),e.\u0275inj=c.Jb({factory:function(o){return new(o||e)},imports:[[s.a,C]]}),e})()}}]);