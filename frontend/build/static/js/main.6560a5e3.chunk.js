(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{19:function(e,t,a){},33:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},36:function(e,t,a){e.exports=a(65)},41:function(e,t,a){},42:function(e,t,a){},65:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(32),s=a.n(l),o=a(5),h=a(14);a(41),a(33),a(42);var c=a(12),i=a(16),p=a(6),u=a(7),m=a(13),d=a(8),g=a(9),E=a(11),b=a.n(E),f=(a(19),function(e){Object(g.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).handleChange=function(e){var t=e.target.name,a=e.target.value;n.setState(Object(i.a)({},n.state,Object(c.a)({},t,a))),console.log("the error is here2")},n.handleSubmit=function(e){var t=n.props.history;if(n.setState({error:""}),console.log("the error is here3"),n.state.helpeeAddr&&n.state.helpeeName&&n.state.helpeePhone&&n.state.helpeeRequest)if(10==n.state.helpeePhone.length){n.setState({error:""}),console.log("here4");var a=new FormData;console.log("the error is here bodyFormData"),a.set("name_help",n.state.helpeeName),console.log("the error is here name_help"),a.set("address_help",n.state.helpeeAddr),console.log("the error is here address_help"),a.set("phone_help",n.state.helpeePhone),console.log("the error is here phone_help"),a.set("content",n.state.helpeeRequest),b()({method:"post",url:"/",data:a,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){console.log(e),t.push("/helpeeSuccess")})).catch((function(e){console.log(e)}))}else n.setState({error:"Please enter a valid 10 digit phone number"});else n.setState({error:"Error: Field Empty: Please fill all Fields"})},n.state={helpeeName:"",helpeeAddr:"",helpeePhone:"",helpeeRequest:"",error:""},n.handleChange=n.handleChange.bind(Object(m.a)(n)),n.handleSubmit=n.handleSubmit.bind(Object(m.a)(n)),console.log("the error is here1"),n}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{class:"home-page"},r.a.createElement("form",null,r.a.createElement("div",{class:"segment"},r.a.createElement("h1",null,"Sign up to request Assistance")),r.a.createElement("label",null,r.a.createElement("input",{type:"text",placeholder:"Name",value:this.state.helpeeName,name:"helpeeName",onChange:this.handleChange})),r.a.createElement("label",null,r.a.createElement("textarea",{type:"text",placeholder:"Address",value:this.state.helpeeAddr,name:"helpeeAddr",onChange:this.handleChange})),r.a.createElement("label",null,r.a.createElement("input",{type:"text",placeholder:"Phone Number",value:this.state.helpeePhone,name:"helpeePhone",onChange:this.handleChange})),r.a.createElement("label",null,r.a.createElement("textarea",{placeholder:"You need help with ...",value:this.state.helpeeRequest,name:"helpeeRequest",onChange:this.handleChange})),r.a.createElement("button",{class:"red",type:"button",onClick:this.handleSubmit},"Sign Up"),this.state.error&&r.a.createElement("div",{class:"card-container"},r.a.createElement("h3",{class:"error"}," ",this.state.error))))}}]),a}(n.Component)),v=function(e){Object(g.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).handleChange=function(e){var t=e.target.name,a=e.target.value;n.setState(Object(i.a)({},n.state,Object(c.a)({},t,a)))},n.handleSubmit=function(e){var t=n.props.history;if(n.setState({error:""}),n.state.addr&&n.state.name&&n.state.phone)if(10==n.state.phone.length){var a=new FormData;a.set("name_helper",n.state.name),a.set("address_helper",n.state.addr),a.set("phone_helper",n.state.phone),b()({method:"post",url:"/helper/".concat(n.state.req.id),data:a,headers:{"Content-Type":"multipart/form-data"}}).then((function(e){console.log(e),t.push("/helperSuccess")})).catch((function(e){console.log(e)}))}else n.setState({error:"Please enter a valid 10 digit phone number"});else n.setState({error:"Error: Field Empty: Please fill all Fields"})},n.state={req:{},name:"",phone:"",addr:"",error:""},n}return Object(u.a)(a,[{key:"componentWillMount",value:function(){var e=this.props.location.state.req;this.setState({req:e})}},{key:"render",value:function(){var e=this.state.req;return r.a.createElement("div",{class:"form-page"},r.a.createElement("form",null,r.a.createElement("div",{class:"segment"},r.a.createElement("h1",null," ","Register to Help ",e.name_help," with ",e.content," at"," ",e.address_help,". Phone Number: ",e.phone_help)),r.a.createElement("label",null,r.a.createElement("input",{type:"text",placeholder:"Name",value:this.state.helpeeName,name:"name",onChange:this.handleChange})),r.a.createElement("label",null,r.a.createElement("textarea",{type:"text",placeholder:"Address",value:this.state.helpeeAddr,name:"addr",onChange:this.handleChange})),r.a.createElement("label",null,r.a.createElement("input",{type:"text",placeholder:"Phone Number",value:this.state.helpeePhone,name:"phone",onChange:this.handleChange})),r.a.createElement("button",{class:"red",type:"button",onClick:this.handleSubmit},"Sign Up"),this.state.error&&r.a.createElement("div",{class:"card-container"},r.a.createElement("h3",{class:"error"}," ",this.state.error))))}}]),a}(n.Component),y=function(e){Object(g.a)(a,e);var t=Object(d.a)(a);function a(){return Object(p.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{class:"home-page"},r.a.createElement("h1",null,"Thanks for assisting some one! Please contact them soon!"),r.a.createElement(o.b,{to:""},r.a.createElement("button",null,"Home")))}}]),a}(n.Component),C=function(e){Object(g.a)(a,e);var t=Object(d.a)(a);function a(){return Object(p.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{class:"home-page"},r.a.createElement("h1",null,"Thanks for signing up, someone will reach out to assist you shortly"),r.a.createElement(o.b,{to:""},r.a.createElement("button",null,"Home")))}}]),a}(n.Component),S=function(e){Object(g.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(p.a)(this,a),(n=t.call(this,e)).handleChange=function(e){var t=e.target.name,a=e.target.value;if(n.setState(Object(i.a)({},n.state,Object(c.a)({},t,a))),6===a.length){n.state.pin;b()({method:"get",url:"/pins/"+a}).then((function(e){console.log(e);var t=[],a=[];e.data.requests.forEach((function(e){e.name_helper?t.push(e):a.push(e)})),n.setState({gotResponse:t,needResponse:a})}))}if(0===a.length){n.state.pin;b()({method:"get",url:"/requests/all"}).then((function(e){var t=[],a=[];e.data.requests.forEach((function(e){e.name_helper?t.push(e):a.push(e)})),n.setState({gotResponse:t,needResponse:a})}))}},n.onFormSubmit=function(e){},n.state={gotResponse:[],needResponse:[],pin:""},n.componentDidMount=n.componentDidMount.bind(Object(m.a)(n)),n.handleChange=n.handleChange.bind(Object(m.a)(n)),n}return Object(u.a)(a,[{key:"componentDidMount",value:function(){var e=this;if(this.state.pin){var t=this.state.pin;b()({method:"get",url:"/pins/"+t}).then((function(t){var a=[],n=[];t.data.requests.forEach((function(e){e.name_helper?a.push(e):n.push(e)})),e.setState({gotResponse:a,needResponse:n})}))}else console.log("woohoo"),b()({method:"get",url:"/requests/all"}).then((function(t){var a=[],n=[];t.data.requests.forEach((function(e){e.name_helper?a.push(e):n.push(e)})),e.setState({gotResponse:a,needResponse:n})}))}},{key:"render",value:function(){return console.log("Hi this is a test"),r.a.createElement("div",{class:"home-page"},r.a.createElement("h1",{class:"header",type:"h1"}," ","Assistance Log"),r.a.createElement("label",{style:{width:300,padding:10}},r.a.createElement("input",{type:"text",placeholder:"Enter your pin code",value:this.state.pin,name:"pin",onChange:this.handleChange})),r.a.createElement("div",{class:"card-container",style:{flexGrow:1}},r.a.createElement(o.b,{to:"/helpeeForm",style:{textDecoration:"none"}},r.a.createElement("button",{class:"red"},r.a.createElement("h2",null,"Sign Up for Assistance")," "))),r.a.createElement("h2",{class:"need",type:"h2"}," ","Requests for Assistance"),r.a.createElement("div",{class:"card-container"},0===this.state.needResponse.length&&r.a.createElement("h3",null,this.state.pin?"None for this pin":"No Requests Registerd"),this.state.needResponse.map((function(e){return r.a.createElement(j,{req:e,key:e.id})}))),r.a.createElement("br",null),r.a.createElement("h2",{class:"got",type:"h2"}," ","Assistance provided"),r.a.createElement("div",{class:"card-container"},0===this.state.gotResponse.length&&r.a.createElement("h3",null,this.state.pin?"None for this pin":"No Requests Answered"),this.state.gotResponse.map((function(e){return r.a.createElement(q,{req:e,key:e.id})}))))}}]),a}(n.Component),j=function(e){return r.a.createElement(o.b,{to:{pathname:"/helperForm",state:{req:e.req}},style:{textDecoration:"none"}},r.a.createElement("button",{class:"card-need",type:"button"},r.a.createElement("h3",null," ","Help with ",r.a.createElement("b",null,e.req.content)," at"," ",e.req.address_help)))},q=function(e){return r.a.createElement("button",{class:"card-got",type:"button"},r.a.createElement("h3",null," ",e.req.name_helper," helped ",r.a.createElement("b",null,e.req.name_help)," with"," ",r.a.createElement("b",null,e.req.content)," at ",e.req.address_help))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(o.a,null,r.a.createElement("div",null,r.a.createElement(h.a,{exact:!0,path:"/",component:S}),r.a.createElement(h.a,{path:"/helpeeForm",component:f}),r.a.createElement(h.a,{path:"/helperForm",component:v}),r.a.createElement(h.a,{path:"/helpeeSuccess",component:C}),r.a.createElement(h.a,{path:"/helperSuccess",component:y})))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[36,1,2]]]);
//# sourceMappingURL=main.6560a5e3.chunk.js.map