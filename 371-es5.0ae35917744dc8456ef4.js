!function(){"use strict";function e(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&n(e,t)}function n(e,t){return(n=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,t)}function t(e){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(e){return!1}}();return function(){var t,c=r(e);if(n){var i=r(this).constructor;t=Reflect.construct(c,arguments,i)}else t=c.apply(this,arguments);return o(this,t)}}function o(e,n){if(n&&("object"==typeof n||"function"==typeof n))return n;if(void 0!==n)throw new TypeError("Derived constructors may only return object or undefined");return function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(e)}function r(e){return(r=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function c(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function i(e,n){for(var t=0;t<n.length;t++){var o=n[t];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function s(e,n,t){return n&&i(e.prototype,n),t&&i(e,t),e}(self.webpackChunk_sersol_ngx=self.webpackChunk_sersol_ngx||[]).push([[371],{2371:function(n,o,r){r.r(o),r.d(o,{UtilsModule:function(){return P}});var i={};r.r(i),r.d(i,{LongClickExample:function(){return k}});var a={};r.r(a),r.d(a,{CookiesExample:function(){return _}});var l={};r.r(l),r.d(l,{PrefersColorSchemeExample:function(){return q}});var u,p=r(1115),f=r(3018),g=((u=function(){function e(){c(this,e)}return s(e,[{key:"ngOnInit",value:function(){}}]),e}()).\u0275fac=function(e){return new(e||u)},u.\u0275cmp=f.Xpm({type:u,selectors:[["showcase-password"]],decls:2,vars:0,template:function(e,n){1&e&&(f.TgZ(0,"p"),f._uU(1,"password works!"),f.qZA())},styles:[""]}),u),d=function(){var e=function(){function e(){c(this,e)}return s(e,[{key:"ngOnInit",value:function(){}}]),e}();return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=f.Xpm({type:e,selectors:[["showcase-snackbar"]],decls:2,vars:0,template:function(e,n){1&e&&(f.TgZ(0,"p"),f._uU(1,"snackbar works!"),f.qZA())},styles:[""]}),e}(),h=function(){var e=function(){function e(){c(this,e)}return s(e,[{key:"ngOnInit",value:function(){}}]),e}();return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=f.Xpm({type:e,selectors:[["showcase-fullscreen"]],decls:2,vars:0,template:function(e,n){1&e&&(f.TgZ(0,"p"),f._uU(1,"fullscreen works!"),f.qZA())},styles:[""]}),e}(),m=r(7197),k='<div longPress (onLongPress)="longClick()" (onShortPress)="singleClick()"></div>',Z=r(8316),v=r(2343),y=function(){var n,o=function(n){e(r,n);var o=t(r);function r(){var e;return c(this,r),(e=o.apply(this,arguments)).examples=i,e.messageTypeClick="Clic aqu\xed para probar",e}return s(r,[{key:"singleClick",value:function(){this.messageTypeClick="Clic corto",this.clearMessageTypeClick()}},{key:"longClick",value:function(){this.messageTypeClick="Clic prolongado",this.clearMessageTypeClick()}},{key:"clearMessageTypeClick",value:function(){var e=this;setTimeout(function(){e.messageTypeClick="Clic aqu\xed para probar"},2e3)}}]),r}(m.P);return o.\u0275fac=function(e){return(n||(n=f.n5z(o)))(e||o)},o.\u0275cmp=f.Xpm({type:o,selectors:[["showcase-click"]],features:[f.qOj],decls:14,vars:2,consts:[["href","#cookies",1,"bttn","icon"],[1,"material-icons"],[1,"description"],["href","https://sersoluciones.github.io/ngx-doc/directives/LongPressDirective.html","target","_blank","rel","noopener noreferrer"],["longPress","",1,"long-click",3,"onLongPress","onShortPress"],[3,"highlight"]],template:function(e,n){1&e&&(f.TgZ(0,"h2"),f.TgZ(1,"a",0),f.TgZ(2,"span",1),f._uU(3,"link"),f.qZA(),f.qZA(),f._uU(4," Clic \xf3 Toque prolongado\n"),f.qZA(),f.TgZ(5,"p",2),f._uU(6," ("),f.TgZ(7,"a",3),f._uU(8,"longPress"),f.qZA(),f._uU(9,") Directiva para detectar click cortos \xf3 prolongados para eventos de mouse o pantallas t\xe1ctiles\n"),f.qZA(),f.TgZ(10,"div",4),f.NdJ("onLongPress",function(){return n.longClick()})("onShortPress",function(){return n.singleClick()}),f._uU(11),f.qZA(),f.TgZ(12,"pre"),f._UZ(13,"code",5),f.qZA()),2&e&&(f.xp6(11),f.hij(" ",n.messageTypeClick,"\n"),f.xp6(2),f.Q6J("highlight",n.examples.LongClickExample))},directives:[Z.T,v.y$],styles:[".long-click[_ngcontent-%COMP%]{text-transform:uppercase;text-align:center;background-color:red;padding:32px;border-radius:12px;color:#fff;cursor:pointer}"]}),o}(),_="import { Cookies } from '@sersol/ngx';\n\nCookies.get('Test'); // Obtiene el valor de una cookie\nCookies.set('Test', '123'); // Setea valor de una cookie\nCookies.delete('Test'); // Elimina una cookie\nCookies.deleteAll(); // Elimina todas las cookies",T=function(){var e=function(){function e(){c(this,e)}return s(e,[{key:"getAll",value:function(){var e={};if(document.cookie&&""!==document.cookie)for(var n=document.cookie.split("; "),t=0;t<n.length;t+=1){var o=n[t].split("="),r=decodeURIComponent(o[0].trim()),c=decodeURIComponent(o.slice(1,n[t].length-1).join("="));if("true"===c)e[r]=!0;else if("false"===c)e[r]=!1;else try{e[r]=JSON.parse(c)}catch(i){e[r]=c}}return e}},{key:"get",value:function(e){var n=this.getAll();return n.hasOwnProperty(e)?n[e]:null}},{key:"set",value:function(e,n,t,o,r,c,i){"object"==typeof n&&(n=JSON.stringify(n));var s=encodeURIComponent(e)+"="+encodeURIComponent(n)+";";t&&(s+="number"==typeof t?"expires="+new Date(1e3*t).toUTCString()+";":"expires="+t.toUTCString()+";"),o&&(s+="path="+o+";"),r&&(s+="domain="+r+";"),c&&(s+="secure;"),i&&(s+="sameSite="+i+";"),document.cookie=s}},{key:"delete",value:function(e,n,t){this.set(e,"",new Date("Thu, 01 Jan 1970 00:00:01 GMT"),n,t)}},{key:"deleteAll",value:function(){for(var e=document.cookie.split(";"),n=0;n<e.length;n++){var t=e[n],o=t.indexOf("="),r=o>-1?t.substr(0,o):t;document.cookie=r+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT"}}}]),e}();return e.\u0275fac=function(n){return new(n||e)},e.\u0275prov=f.Yz7({token:e,factory:e.\u0275fac,providedIn:"root"}),e}(),b=function(){var n=function(n){e(r,n);var o=t(r);function r(e,n){var t;return c(this,r),(t=o.call(this,e)).injectorObj=e,t.cookies=n,t.examples=a,t}return r}(m.P);return n.\u0275fac=function(e){return new(e||n)(f.Y36(f.zs3),f.Y36(T))},n.\u0275cmp=f.Xpm({type:n,selectors:[["showcase-cookies"]],features:[f.qOj],decls:12,vars:1,consts:[["href","#cookies",1,"bttn","icon"],[1,"material-icons"],[1,"description"],["href","https://sersoluciones.github.io/ngx-ui-doc/classes/_cookie_.cookies.html","target","_blank","rel","noopener noreferrer"],[3,"highlight"]],template:function(e,n){1&e&&(f.TgZ(0,"h2"),f.TgZ(1,"a",0),f.TgZ(2,"span",1),f._uU(3,"link"),f.qZA(),f.qZA(),f._uU(4," Cookies\n"),f.qZA(),f.TgZ(5,"p",2),f._uU(6," ("),f.TgZ(7,"a",3),f._uU(8,"Cookies"),f.qZA(),f._uU(9,") Clase abstracta para obtener, actualizar y borrar cookies en el navegador web\n"),f.qZA(),f.TgZ(10,"pre"),f._UZ(11,"code",4),f.qZA()),2&e&&(f.xp6(11),f.Q6J("highlight",n.examples.CookiesExample))},directives:[v.y$],styles:[""]}),n}(),C=r(7957),q="import { PrefersColorScheme } from '@sersol/ngx';\n\nconstructor(colorscheme: PrefersColorSchemeService) {\n    colorscheme.init();\n    colorscheme.watch();\n}",x=r(1009),A=r(8583),w=function(e){return{blue:e}},U=[{path:"theme",component:function(){var n=function(n){e(r,n);var o=t(r);function r(e,n){var t;return c(this,r),(t=o.call(this,e)).injectorObj=e,t.colorscheme=n,t.examples=l,t}return r}(m.P);return n.\u0275fac=function(e){return new(e||n)(f.Y36(f.zs3),f.Y36(x.O))},n.\u0275cmp=f.Xpm({type:n,selectors:[["ng-component"]],features:[f.qOj],decls:40,vars:7,consts:[["href","#color-schema",1,"bttn","icon"],[1,"material-icons"],[1,"description"],["href","n-ui-doc/classes/_prefers_color_scheme_.preferscolorscheme.html","target","_blank","rel","noopener noreferrer"],[1,"dark-os-config"],[1,"item"],["href","assets/dark-mac.png","target","_blank","rel","noopener noreferrer"],["src","assets/dark-mac.png","alt","macOS"],["href","assets/dark-windows.png","target","_blank","rel","noopener noreferrer"],["src","assets/dark-windows.png","alt","Windows"],["href","assets/dark-ios.jpeg","target","_blank","rel","noopener noreferrer"],["src","assets/dark-ios.jpeg","alt","iOS"],["href","assets/dark-android.png","target","_blank","rel","noopener noreferrer"],["src","assets/dark-android.png","alt","Android"],[1,"bttn-group"],["type","button",1,"bttn",3,"ngClass","click"],[3,"highlight"]],template:function(e,n){1&e&&(f.TgZ(0,"h2"),f.TgZ(1,"a",0),f.TgZ(2,"span",1),f._uU(3,"link"),f.qZA(),f.qZA(),f._uU(4," Tema claro/oscuro\n"),f.qZA(),f.TgZ(5,"p",2),f._uU(6," ("),f.TgZ(7,"a",3),f._uU(8,"PrefersColorScheme"),f.qZA(),f._uU(9,") Clase para detectar, cambiar y observar el esquema de color claro/oscuro en conjunto con el sistema operativo anfitri\xf3n\n"),f.qZA(),f.TgZ(10,"div",4),f.TgZ(11,"div",5),f.TgZ(12,"h4"),f._uU(13,"macOS Mojave+"),f.qZA(),f.TgZ(14,"a",6),f._UZ(15,"img",7),f.qZA(),f.qZA(),f.TgZ(16,"div",5),f.TgZ(17,"h4"),f._uU(18,"Windows 10 (October 2018)+"),f.qZA(),f.TgZ(19,"a",8),f._UZ(20,"img",9),f.qZA(),f.qZA(),f.TgZ(21,"div",5),f.TgZ(22,"h4"),f._uU(23,"iOS 13+"),f.qZA(),f.TgZ(24,"a",10),f._UZ(25,"img",11),f.qZA(),f.qZA(),f.TgZ(26,"div",5),f.TgZ(27,"h4"),f._uU(28,"Android 10+"),f.qZA(),f.TgZ(29,"a",12),f._UZ(30,"img",13),f.qZA(),f.qZA(),f.qZA(),f.TgZ(31,"p",2),f._uU(32,"\xd3 puedes controlar de manera manual el esquema de color independiente del sistema operativo"),f.qZA(),f.TgZ(33,"div",14),f.TgZ(34,"button",15),f.NdJ("click",function(){return n.colorscheme.enableLight()}),f._uU(35,"Claro"),f.qZA(),f.TgZ(36,"button",15),f.NdJ("click",function(){return n.colorscheme.enableDark()}),f._uU(37,"Oscuro"),f.qZA(),f.qZA(),f.TgZ(38,"pre"),f._UZ(39,"code",16),f.qZA()),2&e&&(f.xp6(34),f.Q6J("ngClass",f.VKq(3,w,!n.colorscheme.dark)),f.xp6(2),f.Q6J("ngClass",f.VKq(5,w,n.colorscheme.dark)),f.xp6(3),f.Q6J("highlight",n.examples.PrefersColorSchemeExample))},directives:[A.mk,v.y$],styles:[".dark-os-config[_ngcontent-%COMP%]{width:100%;overflow-x:auto;display:flex}.dark-os-config[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]{text-align:center}.dark-os-config[_ngcontent-%COMP%]   .item[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-width:300px;max-height:300px;margin:12px;box-shadow:2px 2px 12px #000;border-radius:4px}"]}),n}()},{path:"cookies",component:b},{path:"click",component:y},{path:"fullscreen",component:h},{path:"snackbar",component:d},{path:"password",component:g}],O=function(){var e=function e(){c(this,e)};return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=f.oAB({type:e}),e.\u0275inj=f.cJS({imports:[[C.Bz.forChild(U)],C.Bz]}),e}(),P=function(){var e=function e(){c(this,e)};return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=f.oAB({type:e}),e.\u0275inj=f.cJS({imports:[[p.m,O]]}),e}()}}])}();