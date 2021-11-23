"use strict";(self.webpackChunkshowcase=self.webpackChunkshowcase||[]).push([[536],{7536:(ie,v,s)=>{s.r(v),s.d(v,{FileModule:()=>oe});var f={};s.r(f),s.d(f,{FileExample:()=>N});var h={};s.r(h),s.d(h,{ImageExample:()=>_});var T=s(8492),u=s(9010),Z=s(3391);const N='<ser-form-element>\n    <pin-input serControl formControlName="pin1" [codeLength]="codeLength" [onlyNumber]="onlyNumber" [isCodeHidden]="isCodeHidden"></pin-input>\n\n    <div serErrors="pin1">\n        <div serError="required">Requerido</div>\n    </div>\n</ser-form-element>';var e=s(9619),y=s(8394),b=s(6251),E=s(1537),I=s(6335),F=s(676),C=s(5730),A=s(1945);let J=(()=>{class n extends Z.P{constructor(){super(...arguments),this.examples=f,this.modelForm=this._fb.group({file1:[null,[u.kI.required]]})}}return n.\u0275fac=function(){let t;return function(o){return(t||(t=e.n5z(n)))(o||n)}}(),n.\u0275cmp=e.Xpm({type:n,selectors:[["ng-component"]],features:[e.qOj],decls:25,vars:3,consts:[[1,"form-example",3,"formGroup"],["href","#bttn-bordered",1,"example-name"],[1,"material-icons"],["id","bttn-icon"],[1,"example-snippet"],[1,"code"],[1,"body"],[3,"highlight"],["type","button",1,"bttn","icon","copy",3,"copyToClipboard","copied"],[1,"preview"],["type","button",1,"bttn","center-margin",3,"click"],[2,"width","300px"],["serControl","","formControlName","file1"],["serErrors","file1"],["serError","required"]],template:function(r,o){1&r&&(e.TgZ(0,"form",0),e.TgZ(1,"a",1),e.TgZ(2,"span",2),e._uU(3,"link"),e.qZA(),e.TgZ(4,"h1",3),e._uU(5,"Entrada de texto b\xe1sico"),e.qZA(),e.qZA(),e.TgZ(6,"div",4),e.TgZ(7,"div",5),e.TgZ(8,"div",6),e.TgZ(9,"pre"),e._UZ(10,"code",7),e.qZA(),e.TgZ(11,"button",8),e.NdJ("copied",function(){return o.alert("Copiado al portapapeles")}),e.TgZ(12,"span",2),e._uU(13,"content_copy"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(14,"div",9),e.TgZ(15,"div",6),e.TgZ(16,"button",10),e.NdJ("click",function(){return o.toogleFormControlDisabled("file1")}),e._uU(17,"Habilitar / Deshabilitar"),e.qZA(),e.TgZ(18,"ser-form-element",11),e.TgZ(19,"label"),e._uU(20,"Texto"),e.qZA(),e._UZ(21,"ser-input-file",12),e.TgZ(22,"div",13),e.TgZ(23,"div",14),e._uU(24,"Requerido"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&r&&(e.Q6J("formGroup",o.modelForm),e.xp6(10),e.Q6J("highlight",o.examples.FileExample),e.xp6(1),e.Q6J("copyToClipboard",o.examples.FileExample))},directives:[u._Y,u.JL,u.sg,y.y$,b.e,E.n,I.t,F.C,u.JJ,u.u,C.P,A.r],encapsulation:2}),n})();var a=s(6541);function c(n,t){(0,a.j)(n.errors)?(delete n.errors[t],(0,a.j)(n.errors)?n.setErrors(n.errors):n.setErrors(null)):n.setErrors(null)}function m(n,t){if((0,a.j)(n.errors))n.errors[t]=!0,n.setErrors(n.errors);else{const r={};r[t]=!0,n.setErrors(r)}}var d=s(2411),U=s(8053),q=s(7337),D=s(1685),Q=s(8178),K=s(4168),x=s(8085);class X{constructor(t,r){this.delay=t,this.scheduler=r}call(t,r){return r.subscribe(new g(t,this.delay,this.scheduler))}}class g extends K.L{constructor(t,r,o){super(t),this.delay=r,this.scheduler=o,this.queue=[],this.active=!1,this.errored=!1}static dispatch(t){const r=t.source,o=r.queue,i=t.scheduler,l=t.destination;for(;o.length>0&&o[0].time-i.now()<=0;)o.shift().notification.observe(l);if(o.length>0){const p=Math.max(0,o[0].time-i.now());this.schedule(t,p)}else this.unsubscribe(),r.active=!1}_schedule(t){this.active=!0,this.destination.add(t.schedule(g.dispatch,this.delay,{source:this,destination:this.destination,scheduler:t}))}scheduleNotification(t){if(!0===this.errored)return;const r=this.scheduler,o=new $(r.now()+this.delay,t);this.queue.push(o),!1===this.active&&this._schedule(r)}_next(t){this.scheduleNotification(x.P.createNext(t))}_error(t){this.errored=!0,this.queue=[],this.destination.error(t),this.unsubscribe()}_complete(){this.scheduleNotification(x.P.createComplete()),this.unsubscribe()}}class ${constructor(t,r){this.time=t,this.notification=r}}var Y=s(9204),W=s(2047);class B{static match(t,r){return function(n,t){return o=>{const i=o.get(n),l=o.get(t);return i.value===l.value?(0,a.U)(l.errors)?(delete l.errors.match,(0,a.U)(l.errors)?l.setErrors(l.errors):l.setErrors(null)):l.setErrors(null):(0,a.U)(l.errors)?(l.errors.match=!0,l.setErrors(l.errors)):l.setErrors({match:!0}),null}}(t,r)}static verifyNIT(t){return function(n){if(!(0,a.U)(n.value))return null;if(!/^([0-9]*)([-])([0-9]{1,1})$/.test(n.value))return{verifyNIT:!0};const t=n.value.split(/[-]+/);if(t.length>2)return{verifyNIT:!0};if((0,a.U)(t[0])){let r=41*t[0][0];if(r+=37*t[0][1],r+=29*t[0][2],r+=23*t[0][3],r+=19*t[0][4],r+=17*t[0][5],r+=13*t[0][6],r+=7*t[0][7],r+=3*t[0][8],r%=11,r>=2&&(r=11-r),parseInt(t[1],10)===r)return null;if((0,a.U)(t[1]))return{verifyNITIntegrity:!0}}}(t)}static lowerThan(t,r){return function(n,t){return r=>{const o=r.get(t),i=r.get(n);return(0,a.U)(o.value)&&(0,a.U)(i.value)?(o.value>i.value?c(i,"lowerThan"):m(i,"lowerThan"),null):(c(i,"lowerThan"),null)}}(t,r)}static lowerOrEqualThan(t,r){return function(n,t){return r=>{const o=r.get(t),i=r.get(n);return(0,a.U)(o.value)&&(0,a.U)(i.value)?(o.value>=i.value?c(i,"lowerOrEqualThan"):m(i,"lowerOrEqualThan"),null):(c(i,"lowerOrEqualThan"),null)}}(t,r)}static greaterThan(t,r){return function(n,t){return r=>{const o=r.get(t),i=r.get(n);return(0,a.U)(o.value)&&(0,a.U)(i.value)?(o.value<i.value?c(i,"greaterThan"):m(i,"greaterThan"),null):(c(i,"greaterThan"),null)}}(t,r)}static greaterOrEqualThan(t,r){return function(n,t){return r=>{const o=r.get(t),i=r.get(n);return(0,a.U)(o.value)&&(0,a.U)(i.value)?(o.value<=i.value?c(i,"greaterOrEqualThan"):m(i,"greaterOrEqualThan"),null):(c(i,"greaterOrEqualThan"),null)}}(t,r)}static betweenRange(t,r,o){return function(n,t,r){return o=>{const i=o.get(n),l=o.get(t),p=o.get(r);return(0,a.U)(l.value)&&(0,a.U)(p.value)&&(0,a.U)(i.value)?(i.value>=l.value&&i.value<=p.value?c(i,"betweenRange"):m(i,"betweenRange"),null):(c(i,"betweenRange"),null)}}(t,r,o)}static maxFileSize(t){return n=t,t=>{const o=n.match(/[-]{0,1}[\d]*[.]{0,1}[\d]+/g);let i=1;switch(!0){case/[. 0-9]+(KB)/i.test(n):i=1e3;break;case/[. 0-9]+(MB)/i.test(n):i=1e6;break;case/[. 0-9]+(GB)/i.test(n):i=1e9}if((0,a.U)(o)){const l=parseFloat(o.join(""))*i;if(t.value instanceof File||t.value instanceof Blob)return t.value.size>=l?{maxFileSize:!0}:null}else console.error("maxFileSize validation: Size must have a number");return null};var n}static minFileSize(t){return n=t,t=>{const o=n.match(/[-]{0,1}[\d]*[.]{0,1}[\d]+/g);let i=1;switch(!0){case/[. 0-9]+(KB)/i.test(n):i=1e3;break;case/[. 0-9]+(MB)/i.test(n):i=1e6;break;case/[. 0-9]+(GB)/i.test(n):i=1e9}if((0,a.U)(o)){const l=parseFloat(o.join(""))*i;if(t.value instanceof File||t.value instanceof Blob)return t.value.size<=l?{minFileSize:!0}:null}else console.error("minFileSize validation: Size must have a number");return null};var n}static requiredFileType(t){return n=t,t=>{const r=t.value;if(r instanceof File||r instanceof Blob){Array.isArray(n)||(n=[n]);const o=n.map(i=>i.toLowerCase());return(0,q.LX)(r).pipe((0,U.U)(i=>(0,D.d3)((0,q.JB)(i),o)?null:{requiredFileType:!0}))}return(0,d.of)(null)};var n}static alreadyExist(t,r,o){return function(n,t,r){return o=>(0,d.of)(o.value).pipe(function(n,t=Q.P){const o=function(n){return n instanceof Date&&!isNaN(+n)}(n)?+n-t.now():Math.abs(n);return i=>i.lift(new X(o,t))}(1e3),(0,Y.w)(i=>(0,a.U)(i)?(r.Value=i,n.post(t,r).pipe((0,U.U)(()=>({alreadyExist:!0})),(0,W.K)(()=>(0,d.of)(null)))):(0,d.of)(null)))}(t,r,o)}}const _='<ser-form-element>\n    <ser-input-image serControl formControlName="image1" class="round cover"></ser-input-image>\n\n    <div serErrors="image1">\n        <div serError="required">Requerido</div>\n    </div>\n</ser-form-element>';var ee=s(1093);const te=[{path:"basic",component:J},{path:"image",component:(()=>{class n extends Z.P{constructor(){super(...arguments),this.examples=h,this.modelForm=this._fb.group({image1:[null,[u.kI.required,B.maxFileSize("2MB")],B.requiredFileType(["png","jpg","jpeg","gif"])]})}afterInit(){this.modelForm.get("image1").setValue("https://tiendana.s3.amazonaws.com/upload/148/attachments/brand/file_efa5ed22-665e-4f91-aa37-c7ccafc2991f.png")}}return n.\u0275fac=function(){let t;return function(o){return(t||(t=e.n5z(n)))(o||n)}}(),n.\u0275cmp=e.Xpm({type:n,selectors:[["showcase-image"]],features:[e.qOj],decls:25,vars:3,consts:[[1,"form-example",3,"formGroup"],["href","#bttn-bordered",1,"example-name"],[1,"material-icons"],["id","bttn-icon"],[1,"example-snippet"],[1,"code"],[1,"body"],[3,"highlight"],["type","button",1,"bttn","icon","copy",3,"copyToClipboard","copied"],[1,"preview"],["type","button",1,"bttn","center-margin",3,"click"],["serControl","","formControlName","image1",1,"round","cover"],["serErrors","image1"],["serError","required"],["serError","requiredFileType"]],template:function(r,o){1&r&&(e.TgZ(0,"form",0),e.TgZ(1,"a",1),e.TgZ(2,"span",2),e._uU(3,"link"),e.qZA(),e.TgZ(4,"h1",3),e._uU(5,"Im\xe1genes"),e.qZA(),e.qZA(),e.TgZ(6,"div",4),e.TgZ(7,"div",5),e.TgZ(8,"div",6),e.TgZ(9,"pre"),e._UZ(10,"code",7),e.qZA(),e.TgZ(11,"button",8),e.NdJ("copied",function(){return o.alert("Copiado al portapapeles")}),e.TgZ(12,"span",2),e._uU(13,"content_copy"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(14,"div",9),e.TgZ(15,"div",6),e.TgZ(16,"button",10),e.NdJ("click",function(){return o.toogleFormControlDisabled("image1")}),e._uU(17,"Habilitar / Deshabilitar"),e.qZA(),e.TgZ(18,"ser-form-element"),e._UZ(19,"ser-input-image",11),e.TgZ(20,"div",12),e.TgZ(21,"div",13),e._uU(22,"Requerido"),e.qZA(),e.TgZ(23,"div",14),e._uU(24,"Formato incorrecto"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.qZA()),2&r&&(e.Q6J("formGroup",o.modelForm),e.xp6(10),e.Q6J("highlight",o.examples.ImageExample),e.xp6(1),e.Q6J("copyToClipboard",o.examples.ImageExample))},directives:[u._Y,u.JL,u.sg,y.y$,b.e,E.n,ee.y,F.C,u.JJ,u.u,C.P,A.r],styles:[""]}),n})()}];let re=(()=>{class n{}return n.\u0275fac=function(r){return new(r||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[T.Bz.forChild(te)],T.Bz]}),n})();var ne=s(7430);let oe=(()=>{class n{}return n.\u0275fac=function(r){return new(r||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[[ne.m,re]]}),n})()}}]);