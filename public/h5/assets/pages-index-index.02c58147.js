import{u as t,s as a,_ as e,a as s,r as l,b as n,o as c,c as i,w as o,n as u,d,F as r,e as m,f as g,g as f,h as p,i as h,t as _,j as b,k as x,l as C,m as y,$ as k,p as I,q as T,v,x as w,y as S,z as j,A as P,B as N}from"./index-4f38998e.js";import{e as L,_ as M}from"./emoji.770a4204.js";import{r as A}from"./uni-app.es.5429cc53.js";import{s as B}from"./status.52337a05.js";import W from"./pages-contacts-index.c2b2542b.js";import{s as $}from"./scan.1ef9c10e.js";const q=t(a);const D=e({name:"message-list",props:{msgs:{type:Array,default:function(){return[]}},btnWidth:{type:Number,default:320}},components:{statusPoint:B},data:()=>({msgsIn:[],damping:.29,moveIndex:-1,x:0,oX:0,scY:!0,btnWidthpx:160,touchStart:!1,modalName:null,listTouchStart:0,listTouchDirection:null,emojiMap:[],chatStatus:!0,paddingB:0,appSetting:q.appSetting,globalConfig:q.globalConfig}),created:function(){this.init(this.msgs),this.btnWidthpx=-1*s(this.btnWidth)+2;let t=[];L.forEach((function(a){let e=a.children;e.length>0&&e.forEach((function(a){let e=a.name,s=a.src;t[e]=s}))})),this.emojiMap=t,this.paddingB=this.inlineTools},watch:{msgs:function(t){this.init(t)}},methods:{init:function(t){this.moveIndex=-1,this.msgsIn=t.filter((t=>t.lastContent))},scrolltolower:function(){},emojiToHtml(t){if(!t)return;let a=this.emojiMap;return t.replace(/\[!(\w+)\]/gi,(function(t,e){var s=e;return a[s]?'<img class=\'mr-5\' style="width:18px;height:18px" emoji-name="'.concat(e,'" src="').concat(a[s],'" />'):"[!".concat(e,"]")}))},ListTouchStart(t){this.listTouchStart=t.touches[0].pageX},ListTouchMove(t){let a=t.touches[0].pageX-this.listTouchStart;Math.abs(a)>100&&a<0?this.listTouchDirection="left":this.listTouchDirection="right"},ListTouchEnd(t){"left"==this.listTouchDirection?(this.modalName=t.currentTarget.dataset.target,this.chatStatus=!1):this.modalName=null,this.listTouchDirection=null},openChat(t,a){this.chatStatus?this.$emit("itemTap",t,a):this.chatStatus=!0},from_time(t){return this.$util.timeFormat(t)},btnTap(t,a){this.$emit("btnTap",t,a)}}},[["render",function(t,a,e,s,C,y){const k=b,I=l("Tags"),T=l("statusPoint"),v=x,w=A(n("mp-html"),M),S=l("Empty");return c(),i(k,{class:"im-message-list"},{default:o((()=>[C.msgsIn.length>0?(c(),i(k,{key:0,class:"cu-list menu-avatar",style:u({paddingBottom:C.paddingB+"px"})},{default:o((()=>[(c(!0),d(r,null,m(C.msgsIn,((t,a)=>(c(),i(k,{class:g(["cu-item",[C.modalName=="move-box-"+a?"move-cur":"",1==t.is_top?"top-contacts":"",0==t.is_group?"third":"second"]]),key:a,onTouchstart:y.ListTouchStart,onTouchmove:y.ListTouchMove,onTouchend:y.ListTouchEnd,onClick:e=>y.openChat(a,t),"data-target":"move-box-"+a},{default:o((()=>[f(k,{class:g(["cu-avatar lg",C.appSetting.circleAvatar?"round":"radius"]),style:u([{backgroundImage:"url("+t.avatar+")"}])},null,8,["class","style"]),f(k,{class:"content"},{default:o((()=>[f(k,{class:"c-333"},{default:o((()=>[1==t.is_group?(c(),i(I,{key:0,text:"群聊",size:"mini"})):p("",!0),t.is_online&&0==t.is_group&&1==C.globalConfig.chatInfo.online?(c(),i(T,{key:1,type:"success"})):p("",!0),f(k,{class:"text-overflow f-16",style:{width:"80%"}},{default:o((()=>[h(_(t.displayName),1)])),_:2},1024)])),_:2},1024),f(k,{class:"im-flex im-justify-content-start im-align-items-start pt-5",style:{height:"50rpx",overflow:"hidden"}},{default:o((()=>[f(k,{class:"text-gray text-sm"},{default:o((()=>[t.unread>0&&0==t.is_notice?(c(),i(v,{key:0},{default:o((()=>[h("["+_(t.unread)+"条未读] ",1)])),_:2},1024)):p("",!0)])),_:2},1024),f(w,{content:y.emojiToHtml(t.lastContent),class:"im-flex text-gray text-sm text-overflow no-click"},null,8,["content"])])),_:2},1024)])),_:2},1024),f(k,{class:"action"},{default:o((()=>[f(k,{class:"text-grey text-xs"},{default:o((()=>[h(_(y.from_time(t.lastSendTime)),1)])),_:2},1024),t.unread>0&&t.is_notice?(c(),i(k,{key:0,class:"cu-tag round bg-red sm"},{default:o((()=>[h(_(t.unread),1)])),_:2},1024)):p("",!0),0==t.is_notice?(c(),i(k,{key:1,class:"c-999"},{default:o((()=>[f(v,{class:"cuIcon-musicforbidfill"})])),_:1})):p("",!0)])),_:2},1024),f(k,{class:g(["move",0==t.is_group?"third":"second"])},{default:o((()=>[1==t.is_top?(c(),i(k,{key:0,class:"bg-grey",onClick:a=>y.btnTap(0,t)},{default:o((()=>[h("取消置顶")])),_:2},1032,["onClick"])):(c(),i(k,{key:1,class:"bg-blue",onClick:a=>y.btnTap(0,t)},{default:o((()=>[h("置顶聊天")])),_:2},1032,["onClick"])),1==t.is_notice?(c(),i(k,{key:2,class:"bg-orange",onClick:a=>y.btnTap(2,t)},{default:o((()=>[h("免扰")])),_:2},1032,["onClick"])):(c(),i(k,{key:3,class:"bg-orange",onClick:a=>y.btnTap(2,t)},{default:o((()=>[h("取消免扰")])),_:2},1032,["onClick"])),0==t.is_group?(c(),i(k,{key:4,class:"bg-red",onClick:a=>y.btnTap(1,t)},{default:o((()=>[h("删除会话")])),_:2},1032,["onClick"])):p("",!0)])),_:2},1032,["class"])])),_:2},1032,["class","onTouchstart","onTouchmove","onTouchend","onClick","data-target"])))),128))])),_:1},8,["style"])):(c(),i(S,{key:1,noDatatext:"暂无聊天",textcolor:"#999"}))])),_:1})}],["__scopeId","data-v-19af59d0"]]),F=C(a),{contacts:X}=y(F),z=t(a),{multiport:E}=y(z);const Q=e({components:{messageList:D},data:()=>({navCurrent:0,msgs:X,mainHeight:500,pageLoading:!0,multiport:E,socketStatus:!0}),mounted(){k("socketStatus",(t=>{t||(this.multiport=!1),this.socketStatus=t}))},methods:{btnTap:function(t,a){0==t?(a.is_top=0==a.is_top?1:0,this.$api.msgApi.setChatTopAPI({id:a.id,is_top:a.is_top,is_group:a.is_group}).then((t=>{0==t.code&&F.updateContacts(a)}))):1==t?I({title:"确定要删除吗?",success:t=>{t.confirm&&this.$api.msgApi.delChatAPI({id:a.id,is_group:a.is_group}).then((t=>{0==t.code&&F.deleteContacts(a)}))}}):2==t&&(a.is_notice=0==a.is_notice?1:0,this.$api.msgApi.setIsNotice({id:a.id,is_notice:a.is_notice,is_group:a.is_group}).then((t=>{0==t.code&&F.updateContacts(a)})))},itemTap:function(t,a){F.unread-=a.unread;let e=this.msgs;e[t].unread=0,F.initContacts(e),T({url:"/pages/message/chat?id="+a.id})},reconnect(){v({title:"重连中..."}),this.socketIo.connectSocketInit({type:"ping"}),setTimeout((()=>{w()}),1500)}}},[["render",function(t,a,e,s,n,u){const d=b,r=l("messageList");return c(),i(d,null,{default:o((()=>[n.socketStatus?p("",!0):(c(),i(d,{key:0,class:"socket-status pd-10 im-flex justify-between im-align-items-center"},{default:o((()=>[f(d,{class:"cuIcon-infofill text-red f-18"}),f(d,{class:"c-666 f-12"},{default:o((()=>[h(" WS通信已断开，检查网络设置是否正常")])),_:1}),f(d,{onClick:a[0]||(a[0]=t=>u.reconnect())},{default:o((()=>[h("重连")])),_:1})])),_:1})),n.multiport?(c(),i(d,{key:1,class:"border-b pd-10 text-gray im-flex im-justify-content-start"},{default:o((()=>[f(d,{class:"iconfont icon-web f-18 ml-20"}),f(d,{class:"f-12 ml-20"},{default:o((()=>[h(" Web网页端已登录")])),_:1})])),_:1})):p("",!0),f(r,{msgs:n.msgs,onItemTap:u.itemTap,onBtnTap:u.btnTap},null,8,["msgs","onItemTap","onBtnTap"])])),_:1})}],["__scopeId","data-v-01419346"]]),H=""+new URL("user-card-bg-ba5b09d7.jpg",import.meta.url).href,U=t();const V=e({data:()=>({isCard:!0,userInfo:U.userInfo,paddingB:0}),created:function(){this.paddingB=this.inlineTools},methods:{IsCard(t){this.isCard=t.detail.value}}},[["render",function(t,a,e,s,l,n){const p=S,C=b,y=x;return c(),i(C,{style:u({paddingBottom:l.paddingB+"px"})},{default:o((()=>[f(C,{class:"im-friend-header"},{default:o((()=>[f(C,{class:"im-friend-bg"},{default:o((()=>[f(p,{class:"im-friend-image",src:H,mode:"widthFix"})])),_:1}),f(C,{class:"im-user im-flex im-justify-content-start align-center"},{default:o((()=>[f(y,{class:"text-white mr-5"},{default:o((()=>[h(_(l.userInfo.realname),1)])),_:1}),f(p,{class:"radius-10",style:{width:"120rpx",height:"120rpx"},src:l.userInfo.avatar,mode:"widthFix"},null,8,["src"])])),_:1})])),_:1}),f(C,{class:"m-10 text-center"},{default:o((()=>[h("此页面是静态模板！")])),_:1}),f(C,{class:"cu-card dynamic no-card"},{default:o((()=>[f(C,{class:"cu-item shadow"},{default:o((()=>[f(C,{class:"cu-list menu-avatar"},{default:o((()=>[f(C,{class:"cu-item"},{default:o((()=>[f(C,{class:"cu-avatar round lg",style:{"background-image":"url(https://api.multiavatar.com/raingad3.png?apikey=zdvXV3W4MjwhP9)"}}),f(C,{class:"content flex-sub"},{default:o((()=>[f(C,null,{default:o((()=>[h("凯尔")])),_:1}),f(C,{class:"text-gray text-sm flex justify-between"},{default:o((()=>[h(" 2019年12月3日 ")])),_:1})])),_:1})])),_:1})])),_:1}),f(C,{class:"text-content"},{default:o((()=>[h(" 折磨生出苦难，苦难又会加剧折磨，凡间这无穷的循环，将有我来终结！ ")])),_:1}),f(C,{class:g(["grid flex-sub padding-lr",l.isCard?"col-3 grid-square":"col-1"])},{default:o((()=>[(c(!0),d(r,null,m(l.isCard?9:1,((t,a)=>(c(),i(C,{class:g(["bg-img",l.isCard?"":"only-img"]),style:{"background-image":"url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg)"},key:a},null,8,["class"])))),128))])),_:1},8,["class"]),f(C,{class:"text-gray text-sm text-right padding"},{default:o((()=>[f(y,{class:"cuIcon-attentionfill margin-lr-xs"}),h(" 10 "),f(y,{class:"cuIcon-appreciatefill margin-lr-xs"}),h(" 20 "),f(y,{class:"cuIcon-messagefill margin-lr-xs"}),h(" 30 ")])),_:1}),f(C,{class:"cu-list menu-avatar comment solids-top"},{default:o((()=>[f(C,{class:"cu-item"},{default:o((()=>[f(C,{class:"cu-avatar round",style:{"background-image":"url(https://api.multiavatar.com/raingad5.png?apikey=zdvXV3W4MjwhP9)"}}),f(C,{class:"content"},{default:o((()=>[f(C,{class:"text-grey"},{default:o((()=>[h("莫甘娜")])),_:1}),f(C,{class:"text-gray text-content text-df"},{default:o((()=>[h(" 凯尔，你被自己的光芒变的盲目。 ")])),_:1}),f(C,{class:"bg-grey padding-sm radius margin-top-sm text-sm"},{default:o((()=>[f(C,{class:"flex"},{default:o((()=>[f(C,null,{default:o((()=>[h("凯尔：")])),_:1}),f(C,{class:"flex-sub"},{default:o((()=>[h("妹妹，你在帮他们给黑暗找借口吗?")])),_:1})])),_:1})])),_:1}),f(C,{class:"margin-top-sm flex justify-between"},{default:o((()=>[f(C,{class:"text-gray text-df"},{default:o((()=>[h("2018年12月4日")])),_:1}),f(C,null,{default:o((()=>[f(y,{class:"cuIcon-appreciatefill text-red"}),f(y,{class:"cuIcon-messagefill text-gray margin-left-sm"})])),_:1})])),_:1})])),_:1})])),_:1}),f(C,{class:"cu-item"},{default:o((()=>[f(C,{class:"cu-avatar round",style:{"background-image":"url(https://api.multiavatar.com/raingad2.png?apikey=zdvXV3W4MjwhP9)"}}),f(C,{class:"content"},{default:o((()=>[f(C,{class:"text-grey"},{default:o((()=>[h("凯尔")])),_:1}),f(C,{class:"text-gray text-content text-df"},{default:o((()=>[h(" 妹妹，如果不是为了飞翔，我们要这翅膀有什么用? ")])),_:1}),f(C,{class:"bg-grey padding-sm radius margin-top-sm text-sm"},{default:o((()=>[f(C,{class:"flex"},{default:o((()=>[f(C,null,{default:o((()=>[h("莫甘娜：")])),_:1}),f(C,{class:"flex-sub"},{default:o((()=>[h("如果不能立足于大地，要这双脚又有何用?")])),_:1})])),_:1})])),_:1}),f(C,{class:"margin-top-sm flex justify-between"},{default:o((()=>[f(C,{class:"text-gray text-df"},{default:o((()=>[h("2018年12月4日")])),_:1}),f(C,null,{default:o((()=>[f(y,{class:"cuIcon-appreciate text-gray"}),f(y,{class:"cuIcon-messagefill text-gray margin-left-sm"})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["style"])}],["__scopeId","data-v-f6597acf"]]),G=t(a);const R=e({data:()=>({loginStore:G,globalConfig:G.globalConfig,appSetting:G.appSetting}),onShow(){},methods:{logout(){let t=j("client_id");this.$api.LoginApi.logout({client_id:t}).then((t=>{0==t.code&&G.logout()}))},about(){if(this.globalConfig&&this.globalConfig.demon_mode){T({url:"/pages/mine/webview?src="+"https://im.raingad.com"})}else T({url:"/pages/mine/about"})},showSetting(){T({url:"/pages/mine/setting"})},showsecure(){T({url:"/pages/mine/secure"})},editInfo(){T({url:"/pages/mine/profile"})},scan(){$.scanQr()},openQr(){T({url:"/pages/index/qrcode"})}}},[["render",function(t,a,e,s,l,n){const d=b,r=x,m=P;return c(),i(d,null,{default:o((()=>[f(d,{class:"padding flex im-space-between im-align-items-center bg-white mb-10"},{default:o((()=>[f(d,{class:"flex justify-start bg-white",onClick:a[0]||(a[0]=t=>n.editInfo())},{default:o((()=>[f(d,{class:g(["cu-avatar lg mr-15",l.appSetting.circleAvatar?"round":"radius"]),style:u([{backgroundImage:"url("+l.loginStore.userInfo.avatar+")"}])},null,8,["class","style"]),f(d,{class:"im-flex im-justify-content-start im-columns"},{default:o((()=>[f(d,{class:"mb-5 f-18 mb-10 im-flex im-align-items-center"},{default:o((()=>[f(d,{class:"c-333"},{default:o((()=>[h(_(l.loginStore.userInfo.realname),1)])),_:1}),f(d,{class:g(["cu-tag ml-10 round light",l.loginStore.userInfo.is_auth?"bg-orange":"bg-grey"])},{default:o((()=>[h(_(l.loginStore.userInfo.is_auth?"已认证":"未认证"),1)])),_:1},8,["class"])])),_:1}),f(d,{class:"text-gray mb-10"},{default:o((()=>[h(_(l.loginStore.userInfo.account),1)])),_:1})])),_:1})])),_:1}),f(d,{class:"cuIcon-qrcode f-24 text-gray",onClick:n.openQr},null,8,["onClick"])])),_:1}),f(d,{class:"cu-list menu"},{default:o((()=>[f(d,{class:"cu-item",onClick:n.scan},{default:o((()=>[f(d,{class:"content"},{default:o((()=>[f(r,{class:"cuIcon-scan text-blue"}),f(r,null,{default:o((()=>[h("扫一扫")])),_:1})])),_:1}),f(d,{class:"action"},{default:o((()=>[f(r,{class:"text-grey cuIcon-right"})])),_:1})])),_:1},8,["onClick"]),f(d,{class:"cu-item",onClick:n.showSetting},{default:o((()=>[f(d,{class:"content"},{default:o((()=>[f(r,{class:"cuIcon-settings text-grey"}),f(r,null,{default:o((()=>[h("通用设置")])),_:1})])),_:1}),f(d,{class:"action"},{default:o((()=>[f(r,{class:"text-grey cuIcon-right"})])),_:1})])),_:1},8,["onClick"]),f(d,{class:"cu-item",onClick:n.showsecure},{default:o((()=>[f(d,{class:"content"},{default:o((()=>[f(r,{class:"cuIcon-safe text-orange"}),f(r,null,{default:o((()=>[h("账号安全")])),_:1})])),_:1}),f(d,{class:"action"},{default:o((()=>[f(r,{class:"text-grey cuIcon-right"})])),_:1})])),_:1},8,["onClick"]),l.globalConfig.demon_mode?(c(),i(d,{key:0,class:"cu-item",onClick:a[1]||(a[1]=t=>n.about())},{default:o((()=>[f(d,{class:"content"},{default:o((()=>[f(r,{class:"cuIcon-info text-green"}),f(r,null,{default:o((()=>[h("关于IM")])),_:1})])),_:1}),f(d,{class:"action"},{default:o((()=>[f(r,{class:"text-grey cuIcon-right"})])),_:1})])),_:1})):p("",!0)])),_:1}),f(d,{class:"padding flex flex-direction"},{default:o((()=>[f(m,{class:"cu-btn bg-red lg",onClick:a[2]||(a[2]=t=>n.logout())},{default:o((()=>[h("退出登录")])),_:1})])),_:1})])),_:1})}]]),Y=C(a),J=t(a),{unread:K,sysUnread:O}=y(Y);const Z=e({components:{message:Q,contacts:W,compass:V,mine:R},data(){let t=[{name:"message",title:"消息",notice:K},{name:"contacts",title:"通讯录",notice:O}],a={name:"compass",title:"探索",notice:0};J.globalConfig&&J.globalConfig.demon_mode&&t.push(a);return t.push({name:"mine",title:"我的",notice:0}),{globalConfig:J.globalConfig,PageCur:"message",PageName:"消息",TabCur:0,modelName:!1,navList:t}},onShow(){},mounted(){N(),j("allContacts").length||this.initContacts(),k("socketStatus",(t=>{t&&this.initContacts()}))},methods:{closeModel(){this.modelName=!1},scan(){$.scanQr()},NavChange:function(t){this.PageCur=t.name,this.PageName=t.title},showContacts(){1==this.TabCur?this.TabCur=0:this.TabCur=1},initContacts(){this.modelName="",this.$api.msgApi.initContacts().then((t=>{Y.sysUnread=t.count,Y.initContacts(t.data)}))},addGroup(){T({url:"/pages/index/userSelection?type=1"})},addFriend(){T({url:"/pages/contacts/search"})},search(){const t="message"==this.PageCur?1:2;T({url:"/pages/index/search?type="+t})}}},[["render",function(t,a,e,s,n,u){const C=x,y=b,k=l("cu-custom"),I=l("message"),T=l("contacts"),v=l("compass"),w=l("mine"),j=S;return c(),i(y,null,{default:o((()=>[f(k,{bgColor:"bg-white"},{backText:o((()=>["message"==n.PageCur||"contacts"==n.PageCur?(c(),i(y,{key:0,class:"f-20 ml-10 mr-10",onClick:a[0]||(a[0]=t=>u.search())},{default:o((()=>[f(C,{class:"cuIcon-search",style:{"margin-left":"-10px"}})])),_:1})):p("",!0)])),content:o((()=>[h(_(n.PageName),1)])),right:o((()=>["contacts"==n.PageCur&&n.globalConfig&&n.globalConfig.demon_mode?(c(),i(y,{key:0,class:"f-20 ml-10 mr-10",onClick:a[1]||(a[1]=t=>u.showContacts())},{default:o((()=>[f(C,{class:g(["f-24",n.TabCur?"cuIcon-peoplelist":"cuIcon-friend"])},null,8,["class"])])),_:1})):p("",!0),"message"==n.PageCur?(c(),i(y,{key:1,class:"f-20 ml-10 mr-10",onClick:a[2]||(a[2]=t=>n.modelName="add")},{default:o((()=>[f(C,{class:"cuIcon-add f-28"})])),_:1})):p("",!0)])),_:1}),f(y,null,{default:o((()=>["message"==n.PageCur?(c(),i(I,{key:0})):p("",!0),"contacts"==n.PageCur?(c(),i(T,{key:1,TabCur:n.TabCur},null,8,["TabCur"])):p("",!0),"compass"==n.PageCur?(c(),i(v,{key:2})):p("",!0),"mine"==n.PageCur?(c(),i(w,{key:3})):p("",!0)])),_:1}),f(y,{class:"cu-bar tabbar bg-white shadow foot"},{default:o((()=>[(c(!0),d(r,null,m(n.navList,((t,a)=>(c(),i(y,{class:"action",onClick:a=>u.NavChange(t),key:a,"data-cur":"message"},{default:o((()=>[f(y,{class:"cuIcon-cu-image"},{default:o((()=>[f(j,{src:"/static/image/tabbar/"+[t.name]+[n.PageCur==t.name?"-active":""]+".svg"},null,8,["src"]),t.notice>0?(c(),i(y,{key:0,class:"cu-tag badge"},{default:o((()=>[h(_(t.notice),1)])),_:2},1024)):p("",!0)])),_:2},1024),f(y,{class:g(n.PageCur==t.name?"text-green":"text-black")},{default:o((()=>[h(_(t.title),1)])),_:2},1032,["class"])])),_:2},1032,["onClick"])))),128))])),_:1}),f(y,{class:g(["cu-modal bottom-modal","add"==n.modelName?"show":""]),onClick:a[8]||(a[8]=t=>n.modelName="")},{default:o((()=>[f(y,{class:"cu-dialog"},{default:o((()=>[f(y,{class:"manage-content"},{default:o((()=>[f(y,{class:"cu-list menu bg-white"},{default:o((()=>[f(y,{class:"cu-item",onClick:a[3]||(a[3]=t=>{u.initContacts()})},{default:o((()=>[f(y,{class:"content padding-tb-sm"},{default:o((()=>[f(C,{class:"cuIcon-refresh"}),f(C,null,{default:o((()=>[h("更新消息列表")])),_:1})])),_:1})])),_:1}),2==n.globalConfig.sysInfo.runMode?(c(),i(y,{key:0,class:"cu-item",onClick:a[4]||(a[4]=t=>u.addFriend())},{default:o((()=>[f(y,{class:"content padding-tb-sm"},{default:o((()=>[f(C,{class:"cuIcon-friendadd"}),f(C,null,{default:o((()=>[h("添加朋友")])),_:1})])),_:1})])),_:1})):p("",!0),f(y,{class:"cu-item",onClick:a[5]||(a[5]=t=>u.addGroup())},{default:o((()=>[f(y,{class:"content padding-tb-sm"},{default:o((()=>[f(C,{class:"cuIcon-friend"}),f(C,null,{default:o((()=>[h("创建群聊")])),_:1})])),_:1})])),_:1}),f(y,{class:"cu-item",onClick:a[6]||(a[6]=t=>u.scan())},{default:o((()=>[f(y,{class:"content padding-tb-sm"},{default:o((()=>[f(C,{class:"cuIcon-scan mr-10"}),f(C,null,{default:o((()=>[h("扫 一 扫")])),_:1})])),_:1})])),_:1}),f(y,{class:"parting-line-5"}),f(y,{class:"cu-item",onClick:a[7]||(a[7]=t=>n.modelName="")},{default:o((()=>[f(y,{class:"content padding-tb-sm"},{default:o((()=>[f(C,{class:"c-red"},{default:o((()=>[h("取消")])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1})])),_:1},8,["class"])])),_:1})}]]);export{Z as default};
