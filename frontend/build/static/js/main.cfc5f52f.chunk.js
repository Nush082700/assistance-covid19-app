(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{22:function(e,t,a){},44:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},46:function(e,t,a){e.exports=a(76)},55:function(e,t,a){},56:function(e,t,a){},76:function(e,t,a){"use strict";a.r(t);var n={};a.r(n),a.d(n,"login",(function(){return U})),a.d(n,"signUp",(function(){return R})),a.d(n,"routingFinished",(function(){return T})),a.d(n,"logout",(function(){return k})),a.d(n,"getRequests",(function(){return q}));var r=a(0),s=a.n(r),o=a(24),l=a.n(o),c=a(14),i=a(21),u=a(43),p=a(1),h={user:null,allRequests:[],currentRequests:[],inSearch:!1,error:"",loading:!1,redirect:"",latitude:null,longitude:null,name:null},d=function(e,t){switch(t.type){case"SIGN_UP_STARTED":case"LOGIN_STARTED":case"LOGOUT_STARTED":case"GET_REQUESTS_STARTED":return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h;arguments.length>1&&arguments[1];return Object(p.a)({},e,{loading:!0,redirect:""})}(e,t);case"LOGIN_SUCCESS":return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0;return Object(p.a)({},e,{},t.payload,{loading:!1,error:"",redirect:"/"})}(e,t);case"SIGN_UP_SUCCESS":return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h;arguments.length>1&&arguments[1];return Object(p.a)({},e,{redirect:"/login"})}(e,t);case"LOGOUT_SUCCESS":return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h;arguments.length>1&&arguments[1];return Object(p.a)({},e,{user:null,latitude:null,longitude:null,name:null})}(e,t);case"GET_REQUESTS_SUCCESS":return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0;return Object(p.a)({},e,{allRequests:t.payload.requests,currentRequests:t.payload.requests})}(e,t);case"SIGN_UP_FAILED":case"LOGIN_FAILED":case"LOGOUT_FAILED":case"GET_REQUESTS_FAILED":return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h,t=arguments.length>1?arguments[1]:void 0;return Object(p.a)({},e,{},t.payload,{redirect:""})}(e,t);case"ROUTING_FINISHED":return function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:h;arguments.length>1&&arguments[1];return Object(p.a)({},e,{redirect:""})}(e,t)}},m=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||i.c,g=Object(i.d)(d,{user:null,allRequests:[],currentRequests:[],inSearch:!1,error:"",loading:!1},m(Object(i.a)(u.a)));console.log(g.getState());var b=g,E=a(4),f=a(18);a(55),a(44),a(56);var v=a(13),S=a(5),y=a(6),O=a(3),j=a(7),C=a(8),_=a(9),w=a.n(_),U=(a(22),function(e){return function(t){t({type:"LOGIN_STARTED"}),w()({method:"post",baseURL:"/api",url:"/login",data:e,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){var a;console.log(e.data),t((a=e.data,{type:"LOGIN_SUCCESS",payload:Object(p.a)({},a)}))})).catch((function(e){var a;console.log(e.response&&e.response.data||e),t((a=e.response&&e.response.data||e,{type:"LOGIN_FAILED",payload:Object(p.a)({},a)}))}))}}),R=function(e){return function(t){t({type:"SIGN_UP_STARTED"}),w()({method:"post",baseURL:"/api",url:"/signup",data:e,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){var a;console.log(e.data),t((a=e.data,{type:"SIGN_UP_SUCCESS",payload:Object(p.a)({},a)}))})).catch((function(e){var a;console.log(e),t((a=e.response.data,{type:"SIGN_UP_FAILED",payload:Object(p.a)({},a)}))}))}},T=function(){return function(e){e({type:"ROUTING_FINISHED"})}},k=function(){return function(e){e({type:"LOGOUT_STARTED"}),w()({method:"post",baseURL:"/api",url:"/logout"}).then((function(t){console.log(t.data),e((t.data,{type:"LOGOUT_SUCCESS"}))})).catch((function(t){var a;console.log(t),e((a=t.response.data,{type:"LOGOUT_FAILED",payload:Object(p.a)({},a)}))}))}},q=function(e){return function(t){t({type:"GET_REQUESTS_STARTED"}),w()({method:"get",baseURL:"/api",url:null==e?"/requests/all":"/requests/".concat(e)}).then((function(e){var a;t((a=e.data,{type:"GET_REQUESTS_SUCCESS",payload:Object(p.a)({},a)}))})).catch((function(e){console.log(e),t({type:"GET_REQUESTS_FAILED",payload:{error:"this is an error"}})}))}},L=function(e){Object(C.a)(a,e);var t=Object(j.a)(a);function a(e){var n;return Object(S.a)(this,a),(n=t.call(this,e)).handleChange=function(e){var t=e.target.name,a=e.target.value;n.setState(Object(p.a)({},n.state,Object(v.a)({},t,a)))},n.handleSubmit=function(e){var t=n.props.history;if(n.setState({error:""}),n.state.shortContent&&n.state.content){n.setState({error:""});var a=new FormData;a.set("content",n.state.content),a.set("short_content",n.state.shortContent),a.set("helpee_id",n.props.user),w()({method:"post",baseURL:"/api",url:"/request/add",data:a,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){console.log(e),t.push("/helpeeSuccess")})).catch((function(e){console.log(e)}))}else n.setState({error:"Error: Field Empty: Please fill all Fields"})},n.state={shortContent:"",content:"",error:""},n.handleChange=n.handleChange.bind(Object(O.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(O.a)(n)),n}return Object(y.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{class:"home-page"},s.a.createElement("form",null,s.a.createElement("div",{class:"segment"},s.a.createElement("h1",null,"Sign up to request Assistance")),s.a.createElement("label",null,s.a.createElement("input",{type:"text",placeholder:"Help me with..",value:this.state.shortContent,name:"shortContent",onChange:this.handleChange})),s.a.createElement("label",null,s.a.createElement("textarea",{type:"text",placeholder:"Detailed Request",value:this.state.content,name:"content",onChange:this.handleChange})),s.a.createElement("button",{class:"red",type:"button",onClick:this.handleSubmit},"Sign Up"),this.state.error&&s.a.createElement("div",{class:"card-container"},s.a.createElement("h3",{class:"error"}," ",this.state.error))))}}]),a}(r.Component);var I=Object(c.b)((function(e){return console.log(e),Object(p.a)({},e)}),Object(p.a)({},n))(L),x=a(17),A=a.n(x),D=a(20),G=function(e){Object(C.a)(a,e);var t=Object(j.a)(a);function a(e){var n;return Object(S.a)(this,a),(n=t.call(this,e)).handleChange=function(e){var t=e.target.name,a=e.target.value;n.setState(Object(p.a)({},n.state,Object(v.a)({},t,a)))},n.handleSubmit=function(e){var t=n.props.history;n.setState({error:""});var a=new FormData;n.state.req.id!=n.props.user?(a.set("helper_id",n.props.user),w()({method:"post",baseURL:"/api",url:"/request/accept/".concat(n.state.req.id),data:a,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){console.log(e),t.push("/helperSuccess")})).catch((function(e){console.log(e)}))):n.setState({error:"You can't accept your own request"})},n.state={req:{},name:"",phone:"",addr:"",error:"",helpee:null},n}return Object(y.a)(a,[{key:"componentWillMount",value:function(){var e=Object(D.a)(A.a.mark((function e(){var t,a;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.location.state.req,e.next=3,this.setState({req:t});case 3:return e.next=5,w()({method:"get",baseURL:"/api",url:"/user/".concat(t.helpee_id)}).then((function(e){return e.data})).catch((function(e){return console.error(e),null}));case 5:a=e.sent,console.log(a),this.setState({helpee:a});case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){console.log(this.state);var e=this.state,t=e.req,a=e.helpee;return s.a.createElement("div",{class:"form-page"},s.a.createElement("form",null,s.a.createElement("div",{class:"segment"},s.a.createElement("h1",null," ","Register to Help ",a&&a.name||"Helpee"," with"," ",t.short_content," ")),s.a.createElement("div",{class:"segment"},s.a.createElement("h1",null," Details: ",t.content)),s.a.createElement("div",{class:"segment"},s.a.createElement("h1",null," ",s.a.createElement("a",{href:null==a?"https://maps.google.com":"https://www.google.com/maps/search/?api=1&query=".concat(a.latitude,",").concat(a.longitude),target:"_blank",rel:"noopener noreferrer"},"Click here for directions"))),s.a.createElement("button",{class:"red",type:"button",onClick:this.handleSubmit},"Sign Up"),this.state.error&&s.a.createElement("div",{class:"card-container"},s.a.createElement("h3",{class:"error"}," ",this.state.error))))}}]),a}(r.Component);var F=Object(c.b)((function(e){return console.log(e),Object(p.a)({},e)}),Object(p.a)({},n))(G),N=function(e){Object(C.a)(a,e);var t=Object(j.a)(a);function a(){return Object(S.a)(this,a),t.apply(this,arguments)}return Object(y.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{class:"home-page"},s.a.createElement("h1",null,"Thanks for assisting some one! Please contact them soon!"),s.a.createElement(E.b,{to:""},s.a.createElement("button",null,"Home")))}}]),a}(r.Component),P=function(e){Object(C.a)(a,e);var t=Object(j.a)(a);function a(){return Object(S.a)(this,a),t.apply(this,arguments)}return Object(y.a)(a,[{key:"render",value:function(){return s.a.createElement("div",{class:"home-page"},s.a.createElement("h1",null,"Thanks for signing up, someone will reach out to assist you shortly"),s.a.createElement(E.b,{to:""},s.a.createElement("button",null,"Home")))}}]),a}(r.Component),H=function(e){Object(C.a)(a,e);var t=Object(j.a)(a);function a(e){var n;return Object(S.a)(this,a),(n=t.call(this,e)).handleChange=function(e){var t=e.target.name,a=e.target.value;n.setState(Object(p.a)({},n.state,Object(v.a)({},t,a)))},n.handleClick=function(e){n.props.user?(n.props.logout(),n.props.history.push("/")):n.props.history.push("/login")},n.state={},n.componentDidMount=n.componentDidMount.bind(Object(O.a)(n)),n.handleChange=n.handleChange.bind(Object(O.a)(n)),n.handleClick=n.handleClick.bind(Object(O.a)(n)),n}return Object(y.a)(a,[{key:"componentDidMount",value:function(){this.props.getRequests(this.props.user?parseInt(this.props.user):null)}},{key:"render",value:function(){var e=this;this.props.user;if(this.props.redirect&&"/"!=this.props.redirect){var t=this.props.redirect;return this.props.routingFinished(),s.a.createElement(f.a,{exact:!0,from:"/signUp",to:t})}return s.a.createElement("div",{class:"home-page"},s.a.createElement("div",{class:"card-container"},s.a.createElement("button",{onClick:this.handleClick,style:{visibility:"hidden",margin:20}},this.props.user?"Logout ".concat(this.props.name):"Login/Sign Up"),s.a.createElement("div",{style:{flexGrow:1,padding:10,alignSelf:"center",justifySelf:"center",alignItems:"center",justifyContent:"center",display:"flex"}},s.a.createElement("h1",null,"WE NEED A NAME")),s.a.createElement("button",{onClick:this.handleClick,style:{margin:20}},this.props.user?"Logout ".concat(this.props.name):"Login/Sign Up")),s.a.createElement("div",{class:"card-container"},s.a.createElement("button",{onClick:function(){return e.props.user?e.props.history.push("/helpeeForm"):e.props.history.push("/login")},style:{visibility:"hidden",margin:20}},this.props.user?"Request Assistance":"Login to Request Assistance"),s.a.createElement("div",{style:{flexGrow:1,padding:10,alignSelf:"center",justifySelf:"center",alignItems:"center",justifyContent:"center",display:"flex"}},s.a.createElement("h1",{class:"need"},"Requests for Assistance")),s.a.createElement("button",{onClick:function(){return e.props.user?e.props.history.push("/helpeeForm"):e.props.history.push("/login")},style:{margin:20}},this.props.user?"Request Assistance":"Login to Request Assistance")),s.a.createElement("div",{class:"card-container",style:{flexGrow:1}},(this.props.currentRequests||[]).filter((function(e){return 0==e.helper_id})).slice(0,20).length?(this.props.currentRequests||[]).filter((function(e){return 0==e.helper_id})).slice(0,20).map((function(t){return s.a.createElement(M,{req:t,user:e.props.user})})):s.a.createElement("h1",null,"None yet.")),s.a.createElement("div",{class:"card-container"},s.a.createElement("div",{style:{flexGrow:1,padding:10,alignSelf:"center",justifySelf:"center",alignItems:"center",justifyContent:"center",display:"flex"}},s.a.createElement("h1",{class:"got"},"Success Stories"))),s.a.createElement("div",{class:"card-container",style:{flexGrow:1}},(this.props.currentRequests||[]).filter((function(e){return 0!==e.helper_id})).slice(0,20).length?(this.props.currentRequests||[]).filter((function(e){return 0!==e.helper_id})).slice(0,20).map((function(t){return s.a.createElement(Q,{req:t,user:e.props.user})})):s.a.createElement("h1",null,"None yet.")," "))}}]),a}(r.Component),M=function(e){return s.a.createElement(E.b,{to:e.user?{pathname:"/helperForm",state:{req:e.req}}:{pathname:"/login",state:{req:e.req}},style:{textDecoration:"none"}},s.a.createElement("button",{class:"card-need",type:"button"},s.a.createElement("h3",null," ","Help with ",s.a.createElement("b",null,e.req.short_content))))},Q=function(e){return s.a.createElement("button",{class:"card-got",type:"button"},s.a.createElement("h3",null," ","Helped with ",s.a.createElement("b",null,e.req.short_content)))};var z=Object(c.b)((function(e){return Object(p.a)({},e)}),Object(p.a)({},n))(H),Z=(a(40),a(41),function(e){Object(C.a)(a,e);var t=Object(j.a)(a);function a(e){var n;return Object(S.a)(this,a),(n=t.call(this,e)).handleChange=function(e){var t=e.target.name,a=e.target.value;n.setState(Object(p.a)({},n.state,Object(v.a)({},t,a)))},n.handleSubmit=function(){var e=Object(D.a)(A.a.mark((function e(t){var a;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.setState({error:""}),n.state.email&&n.state.pwd){e.next=4;break}return n.setState({error:"Error: Field Empty: Please fill all Fields"}),e.abrupt("return");case 4:if(n.validateEmail(n.state.email)){e.next=7;break}return n.setState({error:"Please enter a valid email"}),e.abrupt("return");case 7:(a=new FormData).set("email",n.state.email),a.set("password",n.state.pwd),n.props.login(a);case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.state={email:"",addr:"",phone:"",pwd:"",error:"",pwdVisible:!1},n.handleChange=n.handleChange.bind(Object(O.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(O.a)(n)),n}return Object(y.a)(a,[{key:"validateEmail",value:function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}},{key:"render",value:function(){var e=this;if(this.props.redirect&&"/login"!=this.props.redirect){var t=this.props.redirect;return this.props.routingFinished(),s.a.createElement(f.a,{exact:!0,from:"/signUp",to:t})}return s.a.createElement("div",{class:"home-page"},s.a.createElement("form",null,s.a.createElement("div",{class:"segment"},s.a.createElement("h1",null,"Login")),s.a.createElement("label",null,s.a.createElement("input",{type:"text",placeholder:"Email",value:this.state.email,name:"email",onChange:this.handleChange})),s.a.createElement("label",null,s.a.createElement("input",{type:"password",placeholder:"Password",value:this.state.pwd,name:"pwd",onChange:this.handleChange})),s.a.createElement("button",{class:"red",type:"button",onClick:this.handleSubmit},"Log in"),s.a.createElement("button",{class:"red",type:"button",onClick:function(){return e.props.history.push("/signUp")},style:{marginTop:20}},"Dont have an account?"),(this.state.error||this.props.error)&&s.a.createElement("div",{class:"card-container"},s.a.createElement("h3",{class:"error"}," ",this.state.error||this.props.error))))}}]),a}(r.Component));var W=Object(c.b)((function(e){return Object(p.a)({},e)}),Object(p.a)({},n))(Z),V=function(e){Object(C.a)(a,e);var t=Object(j.a)(a);function a(e){var n;return Object(S.a)(this,a),(n=t.call(this,e)).handleChange=function(e){var t=e.target.name,a=e.target.value;n.setState(Object(p.a)({},n.state,Object(v.a)({},t,a)))},n.handleSubmit=function(){var e=Object(D.a)(A.a.mark((function e(t){var a,r,s,o,l;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.props.history,n.setState({error:""}),n.state.addr&&n.state.name&&n.state.email&&n.state.pwd){e.next=5;break}return n.setState({error:"Error: Field Empty: Please fill all Fields"}),e.abrupt("return");case 5:if(n.validateEmail(n.state.email)){e.next=8;break}return n.setState({error:"Please enter a valid email"}),e.abrupt("return");case 8:return a=n.state.addr,e.next=11,w()({method:"get",url:"https://maps.googleapis.com/maps/api/geocode/json",params:{address:a,key:"AIzaSyAU1IoiFZRckN7r8gMpAcEXEPRw2Ml6CKc"}}).then((function(e){return e.data.results[0].geometry.location}));case 11:r=e.sent,s=r.lat,o=r.lng,(l=new FormData).set("user_name",n.state.name),l.set("password",n.state.pwd),l.set("email",n.state.email),l.set("latitude",s),l.set("longitude",o),n.props.signUp(l);case 21:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.state={name:"",addr:"",phone:"",pwd:"",error:"",pwdVisible:!1},n.handleChange=n.handleChange.bind(Object(O.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(O.a)(n)),n}return Object(y.a)(a,[{key:"validateEmail",value:function(e){return/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(e).toLowerCase())}},{key:"render",value:function(){if(this.props.redirect&&"/signUp"!=this.props.redirect){var e=this.props.redirect;return this.props.routingFinished(),s.a.createElement(f.a,{exact:!0,from:"/signUp",to:e})}return s.a.createElement("div",{class:"home-page"},s.a.createElement("form",null,s.a.createElement("div",{class:"segment"},s.a.createElement("h1",null,"Sign up")),s.a.createElement("label",null,s.a.createElement("input",{type:"text",placeholder:"UserName",value:this.state.name,name:"name",onChange:this.handleChange})),s.a.createElement("label",null,s.a.createElement("textarea",{type:"text",placeholder:"Address",value:this.state.addr,name:"addr",onChange:this.handleChange})),s.a.createElement("label",null,s.a.createElement("input",{type:"text",placeholder:"Email",value:this.state.email,name:"email",onChange:this.handleChange})),s.a.createElement("label",null,s.a.createElement("input",{type:"password",placeholder:"Password",value:this.state.pwd,name:"pwd",onChange:this.handleChange})),s.a.createElement("button",{class:"red",type:"button",onClick:this.handleSubmit},"Sign Up"),(this.state.error||this.props.error)&&s.a.createElement("div",{class:"card-container"},s.a.createElement("h3",{class:"error"}," ",this.state.error||this.props.error))))}}]),a}(r.Component);var X=Object(c.b)((function(e){return console.log(e),Object(p.a)({},e)}),Object(p.a)({},n))(V);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(s.a.createElement(c.a,{store:b},s.a.createElement(s.a.StrictMode,null,s.a.createElement(E.a,null,s.a.createElement("div",null,s.a.createElement(f.b,{exact:!0,path:"/",component:z}),s.a.createElement(f.b,{path:"/helpeeForm",component:I}),s.a.createElement(f.b,{path:"/helperForm",component:F}),s.a.createElement(f.b,{path:"/helpeeSuccess",component:P}),s.a.createElement(f.b,{path:"/helperSuccess",component:N}),s.a.createElement(f.b,{path:"/login",component:W}),s.a.createElement(f.b,{path:"/signUp",component:X}))))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[46,1,2]]]);
//# sourceMappingURL=main.cfc5f52f.chunk.js.map