import{_ as t,an as s,at as i,O as e,H as h,v as a,au as l,p as o,B as n,G as r,x as c,ao as p,av as d,aw as f,o as u,c as g,w as m,g as x,n as v,i as I,y as S,ap as w,k as y,j as H,D as W,u as b,s as k,z as T,q as _,U as D,t as R,h as C,d as P,e as O,F as U,r as M,N as z,a9 as Y,a8 as q,ae as A,A as X,aa as B,ak as F}from"./index-4f38998e.js";const V=t({name:"yq-avatar",data:()=>({csH:"0px",sD:"none",sT:"-10000px",pT:"-10000px",iS:{},sS:{},sO:!0,bW:"19%",bD:"flex",tp:0,imgSrc:{imgSrc:""}}),watch:{avatarSrc(){this.imgSrc.imgSrc=this.avatarSrc}},computed:{inlineH:()=>0},props:{avatarSrc:"",avatarStyle:"",selWidth:"",selHeight:"",expWidth:"",expHeight:"",minScale:"",maxScale:"",canScale:"",canRotate:"",lockWidth:"",lockHeight:"",stretch:"",lock:"",fileType:"",noTab:"",inner:"",quality:"",index:"",bgImage:""},created(){this.cc=s("avatar-canvas",this),this.cco=s("oper-canvas",this),this.ccp=s("prv-canvas",this),this.qlty=parseFloat(this.quality)||1,this.imgSrc.imgSrc=this.avatarSrc,this.letRotate=!1===this.canRotate||!0===this.inner||"true"===this.inner||"false"===this.canRotate?0:1,this.letScale=!1===this.canScale||"false"===this.canScale?0:1,this.isin=!0===this.inner||"true"===this.inner?1:0,this.indx=this.index||void 0,this.mnScale=parseFloat(this.minScale)||.3,this.mxScale=parseFloat(this.maxScale)||4,this.noBar=!0===this.noTab||"true"===this.noTab?1:0,this.stc=this.stretch,this.lck=this.lock,this.fType="jpg"===this.fileType?"jpg":"png",this.isin||!this.letRotate?(this.bW="24%",this.bD="none"):(this.bW="19%",this.bD="flex"),this.noBar?this.fWindowResize():i({fail:()=>{this.noBar=1},success:()=>{this.noBar=0},complete:t=>{this.fWindowResize()}})},methods:{fWindowResize(){let t=e();this.platform=t.platform,this.wW=t.windowWidth,this.drawTop=t.windowTop,this.wH=t.windowHeight,this.noBar||(this.wH+=50),this.csH=this.wH-50-this.inlineH+"px",this.tp=this.csH,this.tp=t.windowTop+parseInt(this.csH)+"px",this.pxRatio=this.wW/750;let s=this.avatarStyle;if(s&&!0!==s&&(s=s.trim())){s=s.split(";");let t={};for(let i of s)if(i){if(i=i.trim().split(":"),i[1].toString().indexOf("upx")>=0){let t=i[1].trim().split(" ");for(let s in t)t[s]&&t[s].toString().indexOf("upx")>=0&&(t[s]=parseFloat(t[s])*this.pxRatio+"px");i[1]=t.join(" ")}t[i[0].trim()]=i[1].trim()}this.iS=t}this.expWidth&&(this.eW=this.expWidth.toString().indexOf("upx")>=0?parseInt(this.expWidth)*this.pxRatio:parseInt(this.expWidth)),this.expHeight&&(this.eH=this.expHeight.toString().indexOf("upx")>=0?parseInt(this.expHeight)*this.pxRatio:parseInt(this.expHeight)),"flex"===this.sD&&this.fDrawInit(!0),this.fHideImg()},fSelect(){this.fSelecting||(this.fSelecting=!0,setTimeout((()=>{this.fSelecting=!1}),500),h({count:1,sizeType:["original","compressed"],sourceType:["album","camera"],success:t=>{a({title:"加载中...",mask:!0});let s=this.imgPath=t.tempFilePaths[0];l({src:s,success:t=>{if(this.imgWidth=t.width,this.imgHeight=t.height,this.path=s,!this.hasSel){let t=this.sS||{};if(!this.selWidth||!this.selHeight)return void o({title:"裁剪框的宽或高没有设置",showCancel:!1});{let s=this.selWidth.toString().indexOf("upx")>=0?parseInt(this.selWidth)*this.pxRatio:parseInt(this.selWidth),i=this.selHeight.toString().indexOf("upx")>=0?parseInt(this.selHeight)*this.pxRatio:parseInt(this.selHeight);t.width=s+"px",t.height=i+"px",t.top=(this.wH-i-50|0)/2+"px",t.left=(this.wW-s|0)/2+"px"}this.sS=t}this.noBar?this.fDrawInit(!0):n({complete:()=>{this.fDrawInit(!0)}})},fail:()=>{r({title:"请选择正确图片",duration:2e3})},complete(){c()}})}}))},fUpload(){if(this.fUploading)return;this.fUploading=!0,setTimeout((()=>{this.fUploading=!1}),1e3);let t=this.sS,s=parseInt(t.left),e=parseInt(t.top),h=parseInt(t.width),l=parseInt(t.height),o=this.eW||h*this.pixelRatio,n=this.eH||l*this.pixelRatio;a({title:"加载中...",mask:!0}),this.sD="none",this.sT="-10000px",this.hasSel=!1,this.fHideImg(),p({x:s,y:e,width:h,height:l,destWidth:o,destHeight:n,canvasId:"avatar-canvas",fileType:this.fType,quality:this.qlty,success:t=>{t=t.tempFilePath,this.btop(t).then((t=>{this.$emit("upload",{avatar:this.imgSrc,path:t,index:this.indx,data:this.rtn,base64:this.base64||null})}))},fail:t=>{r({title:"error1",duration:2e3})},complete:()=>{c(),this.noBar||i(),this.$emit("end")}},this)},fPrvUpload(){if(this.fPrvUploading)return;this.fPrvUploading=!0,setTimeout((()=>{this.fPrvUploading=!1}),1e3);let t=this.sS;parseInt(t.width),parseInt(t.height);let s=this.prvX,e=this.prvY,h=this.prvWidth,l=this.prvHeight,o=this.eW||parseInt(t.width)*this.pixelRatio,n=this.eH||parseInt(t.height)*this.pixelRatio;a({title:"加载中...",mask:!0}),this.sD="none",this.sT="-10000px",this.hasSel=!1,this.fHideImg(),p({x:s,y:e,width:h,height:l,destWidth:o,destHeight:n,canvasId:"prv-canvas",fileType:this.fType,quality:this.qlty,success:t=>{t=t.tempFilePath,this.btop(t).then((t=>{this.$emit("upload",{avatar:this.imgSrc,path:t,index:this.indx,data:this.rtn,base64:this.base64||null})}))},fail:()=>{r({title:"error_prv",duration:2e3})},complete:()=>{c(),this.noBar||i(),this.$emit("end")}},this)},fDrawInit(t=!1){let s=this.wW,i=this.wH,e=this.imgWidth,h=this.imgHeight,a=e/h,l=s-40,o=i-50-80,n=l/o,r=parseInt(this.sS.width),c=parseInt(this.sS.height);switch(this.fixWidth=0,this.fixHeight=0,this.lckWidth=0,this.lckHeight=0,this.stc){case"x":this.fixWidth=1;break;case"y":this.fixHeight=1;break;case"long":a>1?this.fixWidth=1:this.fixHeight=1;break;case"short":a>1?this.fixHeight=1:this.fixWidth=1;break;case"longSel":r>c?this.fixWidth=1:this.fixHeight=1;break;case"shortSel":r>c?this.fixHeight=1:this.fixWidth=1}switch(this.lck){case"x":this.lckWidth=1;break;case"y":this.lckHeight=1;break;case"long":a>1?this.lckWidth=1:this.lckHeight=1;break;case"short":a>1?this.lckHeight=1:this.lckWidth=1;break;case"longSel":r>c?this.lckWidth=1:this.lckHeight=1;break;case"shortSel":r>c?this.lckHeight=1:this.lckWidth=1}this.fixWidth?(l=r,o=l/a):this.fixHeight?(o=c,l=o*a):a<n?h<o?(l=e,o=h):l=o*a:e<l?(l=e,o=h):o=l/a,this.isin&&(l<r&&(l=r,o=l/a,this.lckHeight=0),o<c&&(o=c,l=o*a,this.lckWidth=0)),this.scaleSize=1,this.rotateDeg=0,this.posWidth=(s-l)/2|0,this.posHeight=(i-o-50)/2|0,this.useWidth=0|l,this.useHeight=0|o,this.centerX=this.posWidth+l/2,this.centerY=this.posHeight+o/2,this.focusX=0,this.focusY=0;let p=this.sS,d=parseInt(p.left),f=parseInt(p.top),u=parseInt(p.width),g=parseInt(p.height);this.canvas,this.canvasOper,this.cc;let m=this.cco;m.beginPath(),m.setLineWidth(3),m.setGlobalAlpha(1),m.setStrokeStyle("white"),m.strokeRect(d,f,u,g),m.setFillStyle("black"),m.setGlobalAlpha(.5),m.fillRect(0,0,this.wW,f),m.fillRect(0,f,d,g),m.fillRect(0,f+g,this.wW,this.wH-g-f-50),m.fillRect(d+u,f,this.wW-u-d,g),m.setGlobalAlpha(1),m.setStrokeStyle("red"),m.moveTo(d+15,f),m.lineTo(d,f),m.lineTo(d,f+15),m.moveTo(d+u-15,f),m.lineTo(d+u,f),m.lineTo(d+u,f+15),m.moveTo(d+15,f+g),m.lineTo(d,f+g),m.lineTo(d,f+g-15),m.moveTo(d+u-15,f+g),m.lineTo(d+u,f+g),m.lineTo(d+u,f+g-15),m.stroke(),m.draw(!1,(()=>{t&&(this.sD="flex",this.sT=this.drawTop+"px",this.fDrawImage(!0))})),this.$emit("init")},fDrawImage(t=!1){let s=Date.now();if(s-this.drawTm<20)return;this.drawTm=s;let i=this.cc,e=this.useWidth*this.scaleSize,h=this.useHeight*this.scaleSize;if(this.bgImage?i.drawImage(this.bgImage,0,0,this.wW,this.wH-50):i.fillRect(0,0,this.wW,this.wH-50),this.isin){let t=this.focusX*(this.scaleSize-1),s=this.focusY*(this.scaleSize-1);i.translate(this.centerX,this.centerY),i.rotate(this.rotateDeg*Math.PI/180),i.drawImage(this.imgPath,this.posWidth-this.centerX-t,this.posHeight-this.centerY-s,e,h)}else i.translate(this.posWidth+e/2,this.posHeight+h/2),i.rotate(this.rotateDeg*Math.PI/180),i.drawImage(this.imgPath,-e/2,-h/2,e,h);i.draw(!1)},fPreview(){if(this.fPreviewing)return;this.fPreviewing=!0,setTimeout((()=>{this.fPreviewing=!1}),1e3);let t=this.sS,s=parseInt(t.left),i=parseInt(t.top),e=parseInt(t.width),h=parseInt(t.height);a({title:"加载中...",mask:!0}),p({x:s,y:i,width:e,height:h,expWidth:e*this.pixelRatio,expHeight:h*this.pixelRatio,canvasId:"avatar-canvas",fileType:this.fType,quality:this.qlty,success:t=>{this.prvImgTmp=t=t.tempFilePath;let s=this.ccp,i=this.wW,e=parseInt(this.csH),h=parseInt(this.sS.width),a=parseInt(this.sS.height),l=i-40,o=e-80,n=l/h,r=a*n;r<o?(h=l,a=r):(n=o/a,h*=n,a=o),s.fillRect(0,0,i,e),this.prvX=i=(i-h)/2|0,this.prvY=e=(e-a)/2|0,this.prvWidth=h|=0,this.prvHeight=a|=0,s.drawImage(t,i,e,h,a),s.draw(!1),this.btop(t).then((t=>{this.sO=!1,this.pT=this.drawTop+"px"})),this.sO=!1,this.pT=this.drawTop+"px"},fail:()=>{r({title:"error2",duration:2e3})},complete:()=>{c()}},this)},fChooseImg(t,s,i){if(s){let t=s.selWidth,i=s.selHeight,e=s.expWidth,h=s.expHeight,a=s.quality,l=s.canRotate,o=s.canScale,n=s.minScale,r=s.maxScale,c=s.stretch,p=s.fileType,d=s.inner,f=s.lock;e&&(this.eW=e.toString().indexOf("upx")>=0?parseInt(e)*this.pxRatio:parseInt(e)),h&&(this.eH=h.toString().indexOf("upx")>=0?parseInt(h)*this.pxRatio:parseInt(h)),this.letRotate=!1===l||!0===d||"true"===d||"false"===l?0:1,this.letScale=!1===o||"false"===o?0:1,this.qlty=parseFloat(a)||1,this.mnScale=parseFloat(n)||.3,this.mxScale=parseFloat(r)||4,this.stc=c,this.isin=!0===d||"true"===d?1:0,this.fType="jpg"===p?"jpg":"png",this.lck=f,this.isin||!this.letRotate?(this.bW="24%",this.bD="none"):(this.bW="19%",this.bD="flex"),t&&i&&(t=t.toString().indexOf("upx")>=0?parseInt(t)*this.pxRatio:parseInt(t),i=i.toString().indexOf("upx")>=0?parseInt(i)*this.pxRatio:parseInt(i),this.sS.width=t+"px",this.sS.height=i+"px",this.sS.top=(this.wH-i-50|0)/2+"px",this.sS.left=(this.wW-t|0)/2+"px",this.hasSel=!0)}this.rtn=i,this.indx=t,this.fSelect()},fRotate(){this.rotateDeg+=90-this.rotateDeg%90,this.fDrawImage()},fStart(t){let s=t.touches,i=s[0],e=s[1];if(this.touch0=i,this.touch1=e,e){let t=e.x-i.x,s=e.y-i.y;this.fgDistance=Math.sqrt(t*t+s*s)}},fMove(t){let s=t.touches,i=s[0],e=s[1];if(e){let t=e.x-i.x,s=e.y-i.y,h=Math.sqrt(t*t+s*s),a=.005*(h-this.fgDistance),l=this.scaleSize+a;do{if(!this.letScale)break;if(l<this.mnScale)break;if(l>this.mxScale)break;let t=this.useWidth*a/2,s=this.useHeight*a/2;if(this.isin){let i=this.useWidth*l,e=this.useHeight*l;this.posWidth,this.posHeight;let h,a,o=parseInt(this.sS.left),n=parseInt(this.sS.top),r=parseInt(this.sS.width),c=parseInt(this.sS.height),p=o+r,d=n+c;if(i<=r||e<=c)break;this.cx=h=this.focusX*l-this.focusX,this.cy=a=this.focusY*l-this.focusY,this.posWidth-=t,this.posHeight-=s,this.posWidth-h>o&&(this.posWidth=o+h),this.posWidth+i-h<p&&(this.posWidth=p-i+h),this.posHeight-a>n&&(this.posHeight=n+a),this.posHeight+e-a<d&&(this.posHeight=d-e+a)}else this.posWidth-=t,this.posHeight-=s;this.scaleSize=l}while(0);this.fgDistance=h,e.x!==i.x&&this.letRotate&&(t=(this.touch1.y-this.touch0.y)/(this.touch1.x-this.touch0.x),s=(e.y-i.y)/(e.x-i.x),this.rotateDeg+=180*Math.atan((s-t)/(1+t*s))/Math.PI,this.touch0=i,this.touch1=e),this.fDrawImage()}else if(this.touch0){let t=i.x-this.touch0.x,s=i.y-this.touch0.y,e=this.posWidth+t,h=this.posHeight+s;if(this.isin){let i,a,l=this.useWidth*this.scaleSize,o=this.useHeight*this.scaleSize,n=e,r=h,c=n+l,p=r+o,d=parseInt(this.sS.left),f=parseInt(this.sS.top),u=d+parseInt(this.sS.width),g=f+parseInt(this.sS.height);this.cx=i=this.focusX*this.scaleSize-this.focusX,this.cy=a=this.focusY*this.scaleSize-this.focusY,!this.lckWidth&&Math.abs(t)<100&&(d<n-i?this.posWidth=d+i:u>c-i?this.posWidth=u-l+i:(this.posWidth=e,this.focusX-=t)),!this.lckHeight&&Math.abs(s)<100&&(f<r-a?(this.focusY-=f+a-this.posHeight,this.posHeight=f+a):g>p-a?(this.focusY-=g+a-(this.posHeight+o),this.posHeight=g-o+a):(this.posHeight=h,this.focusY-=s))}else Math.abs(t)<100&&!this.lckWidth&&(this.posWidth=e),Math.abs(s)<100&&!this.lckHeight&&(this.posHeight=h),this.focusX-=t,this.focusY-=s;this.touch0=i,this.fDrawImage()}},fEnd(t){let s=t.touches,i=s&&s[0];s&&s[1],i?this.touch0=i:(this.touch0=null,this.touch1=null)},fHideImg(){this.prvImg="",this.pT="-10000px",this.sO=!0,this.prvImgData=null,this.target=null},fClose(){this.sD="none",this.sT="-10000px",this.hasSel=!1,this.fHideImg(),this.noBar||i(),this.$emit("end")},fGetImgData(){return new Promise(((t,s)=>{let i=this.prvX,e=this.prvY,h=this.prvWidth,a=this.prvHeight;d({canvasId:"prv-canvas",x:i,y:e,width:h,height:a,success(s){t(s.data)},fail(t){s(t)}},this)}))},async fColorChange(t){let s=Date.now();if(s-this.prvTm<100)return;if(this.prvTm=s,a({title:"加载中...",mask:!0}),!this.prvImgData){if(!(this.prvImgData=await this.fGetImgData().catch((()=>{r({title:"error_read",duration:2e3})}))))return;this.target=new Uint8ClampedArray(this.prvImgData.length)}let i,e,h,l,o,n,p,d,u,g,m,x,v,I,S,w,y=this.prvImgData,H=this.target,W=t.detail.value;if(0===W)H=y;else{W=(W+100)/200,W<.005&&(W=0),W>.995&&(W=1);for(let t=y.length-1;t>=0;t-=4){if(i=y[t-3]/255,e=y[t-2]/255,h=y[t-1]/255,x=Math.max(i,e,h),m=Math.min(i,e,h),d=x-m,x===m?o=0:x===i&&e>=h?o=(e-h)/d*60:x===i&&e<h?o=(e-h)/d*60+360:x===e?o=(h-i)/d*60+120:x===h&&(o=(i-e)/d*60+240),p=(x+m)/2,0===p||x===m?n=0:0<p&&p<=.5?n=d/(2*p):p>.5&&(n=d/(2-2*p)),y[t]&&(l=y[t]),W<.5?n=n*W/.5:W>.5&&(n=2*n+2*W-n*W/.5-1),0===n)i=e=h=Math.round(255*p);else{p<.5?g=p*(1+n):p>=.5&&(g=p+n-p*n),u=2*p-g,v=o/360,I=v+1/3,S=v,w=v-1/3;let t=t=>t<0?t+1:t>1?t-1:t,s=t=>t<1/6?u+6*(g-u)*t:t>=1/6&&t<.5?g:t>=.5&&t<2/3?u+6*(g-u)*(2/3-t):u;i=I=Math.round(255*s(t(I))),e=S=Math.round(255*s(t(S))),h=w=Math.round(255*s(t(w)))}l&&(H[t]=l),H[t-3]=i,H[t-2]=e,H[t-1]=h}}let b=this.prvX,k=this.prvY,T=this.prvWidth,_=this.prvHeight;f({canvasId:"prv-canvas",x:b,y:k,width:T,height:_,data:H,fail(){r({title:"error_put",duration:2e3})},complete(){c()}},this)},btop(t){return this.base64=t,new Promise((function(s,i){for(var e=t.split(","),h=e[0].match(/:(.*?);/)[1],a=atob(e[1]),l=a.length,o=new Uint8Array(l);l--;)o[l]=a.charCodeAt(l);return s((window.URL||window.webkitURL).createObjectURL(new Blob([o],{type:h})))}))}}},[["render",function(t,s,i,e,h,a){const l=S,o=w,n=y,r=H,c=W;return u(),g(r,null,{default:m((()=>[x(l,{src:h.imgSrc.imgSrc,onClick:a.fSelect,style:v([h.iS]),class:"my-avatar"},null,8,["src","onClick","style"]),x(o,{"canvas-id":"avatar-canvas",id:"avatar-canvas",class:"my-canvas",style:v({top:h.sT,height:h.csH}),"disable-scroll":"false"},null,8,["style"]),x(o,{"canvas-id":"oper-canvas",id:"oper-canvas",class:"oper-canvas",style:v({top:h.sT,height:h.csH}),"disable-scroll":"false",onTouchstart:a.fStart,onTouchmove:a.fMove,onTouchend:a.fEnd},null,8,["style","onTouchstart","onTouchmove","onTouchend"]),x(o,{"canvas-id":"prv-canvas",id:"prv-canvas",class:"prv-canvas","disable-scroll":"false",onTouchstart:a.fHideImg,style:v({height:h.csH,top:h.pT})},null,8,["onTouchstart","style"]),x(r,{class:"oper-wrapper",style:v({display:h.sD,bottom:0,paddingBottom:a.inlineH+"px",height:50+a.inlineH+"px"})},{default:m((()=>[x(r,{class:"oper"},{default:m((()=>[h.sO?(u(),g(r,{key:0,class:"btn-wrapper"},{default:m((()=>[x(r,{onClick:a.fSelect,"hover-class":"hover",style:v({width:h.bW})},{default:m((()=>[x(n,null,{default:m((()=>[I("重选")])),_:1})])),_:1},8,["onClick","style"]),x(r,{onClick:a.fClose,"hover-class":"hover",style:v({width:h.bW})},{default:m((()=>[x(n,null,{default:m((()=>[I("关闭")])),_:1})])),_:1},8,["onClick","style"]),x(r,{onClick:a.fRotate,"hover-class":"hover",style:v({width:h.bW,display:h.bD})},{default:m((()=>[x(n,null,{default:m((()=>[I("旋转")])),_:1})])),_:1},8,["onClick","style"]),x(r,{onClick:a.fPreview,"hover-class":"hover",style:v({width:h.bW})},{default:m((()=>[x(n,null,{default:m((()=>[I("预览")])),_:1})])),_:1},8,["onClick","style"]),x(r,{onClick:a.fUpload,"hover-class":"hover",style:v({width:h.bW})},{default:m((()=>[x(n,null,{default:m((()=>[I("上传")])),_:1})])),_:1},8,["onClick","style"])])),_:1})):(u(),g(r,{key:1,class:"clr-wrapper"},{default:m((()=>[x(c,{class:"my-slider",onChange:a.fColorChange,"block-size":"25",value:"0",min:"-100",max:"100",activeColor:"red",backgroundColor:"green","block-color":"grey","show-value":""},null,8,["onChange"]),x(r,{onClick:a.fPrvUpload,"hover-class":"hover",style:v({width:h.bW})},{default:m((()=>[x(n,null,{default:m((()=>[I("上传")])),_:1})])),_:1},8,["onClick","style"])])),_:1}))])),_:1})])),_:1},8,["style"])])),_:1})}],["__scopeId","data-v-c4e1bedd"]]),$=b(k);const j=t({components:{avatar:V},data:()=>({loginStore:$,globalConfig:$.globalConfig,userInfo:$.userInfo,sexList:[{id:"2",name:"未知"},{id:"1",name:"男"},{id:"0",name:"女"}],saved:!1}),mounted(){},methods:{logout(){let t=T("client_id");this.$api.LoginApi.logout({client_id:t}).then((t=>{0==t.code&&$.logout()}))},textareaBInput(t){this.userInfo.motto=t.detail.value},changeSex(t){this.userInfo.sex=parseInt(t.detail.value)},saveInfo(){if(""==this.userInfo.realname)return r({title:"请输入昵称",icon:"none"}),!1;this.saved=!0;let t={realname:this.userInfo.realname,email:this.userInfo.email,sex:this.userInfo.sex,motto:this.userInfo.motto};this.$api.msgApi.updateUserInfo(t).then((t=>{if(0==t.code){r({title:"保存成功",icon:"none"});let t=JSON.parse(JSON.stringify(this.userInfo));$.login(t)}})),setTimeout((()=>{this.saved=!1}),8e3)},setAvatar(){_({url:"/pages/mine/avatar"})},uploadAvatar(t){a({title:"上传中..."}),D({url:this.$api.msgApi.uploadAvatar,filePath:t.path,name:"file",header:{Authorization:T("authToken")},formData:{ext:"png"},success:t=>{c();let s=JSON.parse(t.data);if(0==s.code){r({title:s.msg,icon:"none"}),this.userInfo.avatar=s.data;let t=JSON.parse(JSON.stringify(this.userInfo));$.login(t)}},fail:t=>{c()}})}}},[["render",function(t,s,i,e,h,a){const l=M("cu-custom"),o=H,n=M("avatar"),r=y,c=z,p=B,d=F,f=Y,S=q,w=A,W=X;return u(),g(o,null,{default:m((()=>[x(l,{bgColor:"bg-gradual-green",isBack:!0},{backText:m((()=>[])),content:m((()=>[I("个人信息")])),_:1}),x(w,null,{default:m((()=>[x(o,{class:"cu-form-group",style:{height:"140rpx"}},{default:m((()=>[x(o,{class:"title"},{default:m((()=>[I("头像")])),_:1}),x(o,{class:"im-flex im-align-items-center"},{default:m((()=>[x(n,{selWidth:"240px",selHeight:"480upx",onUpload:a.uploadAvatar,avatarSrc:h.userInfo.avatar,avatarStyle:"width: 100rpx; height: 100rpx; border-radius: 100%;"},null,8,["onUpload","avatarSrc"]),x(r,{class:"cuIcon-right ml-10 f-18 text-grey"})])),_:1})])),_:1}),x(o,{class:"cu-form-group"},{default:m((()=>[x(o,{class:"title"},{default:m((()=>[I("账号")])),_:1}),x(o,{class:"text-gray"},{default:m((()=>[I(R(h.userInfo.account),1)])),_:1})])),_:1}),x(o,{class:"cu-form-group"},{default:m((()=>[x(o,{class:"title"},{default:m((()=>[I(R(1==h.globalConfig.sysInfo.runMode?"姓名":"昵称"),1)])),_:1}),h.globalConfig.sysInfo.runMode?(u(),g(o,{key:0,class:"text-gray"},{default:m((()=>[I(R(h.userInfo.realname),1)])),_:1})):C("",!0),h.globalConfig.sysInfo.runMode?C("",!0):(u(),g(c,{key:1,class:"uni-input",style:{"text-align":"right"},modelValue:h.userInfo.realname,"onUpdate:modelValue":s[0]||(s[0]=t=>h.userInfo.realname=t),focus:"",placeholder:"请输入昵称"},null,8,["modelValue"]))])),_:1}),x(o,{class:"cu-form-group"},{default:m((()=>[x(o,{class:"title"},{default:m((()=>[I("e-mail")])),_:1}),x(c,{class:"uni-input",style:{"text-align":"right"},modelValue:h.userInfo.email,"onUpdate:modelValue":s[1]||(s[1]=t=>h.userInfo.email=t),focus:"",placeholder:"请输入email地址"},null,8,["modelValue"])])),_:1}),x(o,{class:"cu-form-group"},{default:m((()=>[x(o,{class:"title"},{default:m((()=>[I("性别")])),_:1}),x(o,null,{default:m((()=>[x(f,{onChange:a.changeSex},{default:m((()=>[(u(!0),P(U,null,O(h.sexList,(t=>(u(),g(d,{class:"radio mr-10"},{default:m((()=>[x(p,{name:"sex",value:t.id,checked:h.userInfo.sex==t.id},null,8,["value","checked"]),I(" "+R(t.name),1)])),_:2},1024)))),256))])),_:1},8,["onChange"])])),_:1})])),_:1}),x(o,{class:"cu-form-group align-start"},{default:m((()=>[x(o,{class:"title"},{default:m((()=>[I("个性签名")])),_:1}),x(S,{maxlength:"-1",modelValue:h.userInfo.motto,"onUpdate:modelValue":s[2]||(s[2]=t=>h.userInfo.motto=t),placeholder:"请输入个性签名"},null,8,["modelValue"])])),_:1})])),_:1}),x(o,{class:"padding flex flex-direction"},{default:m((()=>[x(W,{class:"cu-btn bg-green lg",style:v(h.saved?"border: solid 1px #dbdada;":""),disabled:h.saved,onClick:s[3]||(s[3]=t=>a.saveInfo())},{default:m((()=>[I("保存")])),_:1},8,["style","disabled"])])),_:1})])),_:1})}]]);export{j as default};
