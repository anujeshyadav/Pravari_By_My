(this["webpackJsonpvuexy-react-admin-dashboard"]=this["webpackJsonpvuexy-react-admin-dashboard"]||[]).push([[288],{2375:function(e,a,t){"use strict";t.r(a);var n=t(10),l=t(11),c=t(13),s=t(12),r=t(1),m=t.n(r),i=t(821),d=t(822),u=t(823),o=t(813),E=t(198),f=t(826),h=t(818),v=t(189),p=t(22),N=(t(852),function(e){Object(c.a)(t,e);var a=Object(s.a)(t);function t(e){var l;return Object(n.a)(this,t),(l=a.call(this,e)).state={data:{}},l}return Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this,a=this.props.match.params.id;v.a.get("/viewonebanner/".concat(a)).then((function(a){console.log(a.data),console.log(a.data.data),e.setState({data:a.data.data})})).catch((function(e){console.log(e)}))}},{key:"render",value:function(){var e,a;return m.a.createElement(m.a.Fragment,null,m.a.createElement(i.a,null,m.a.createElement(d.a,{sm:"12"},m.a.createElement(u.a,null,m.a.createElement(i.a,{className:"m-2"},m.a.createElement(d.a,null,m.a.createElement("h1",{"col-sm-6":!0,className:"float-left"},"Rejected Request Detail")),m.a.createElement(d.a,{className:"float-right"},m.a.createElement("h3",null,"Change Refund Status"),m.a.createElement(o.a,{type:"select",name:"type",value:this.state.type,onChange:this.changeHandler},m.a.createElement("option",{value:"Pending"},"Pending"),m.a.createElement("option",{value:"Approved"},"Approved"),m.a.createElement("option",{value:"Refunded"},"Refunded"),m.a.createElement("option",{value:"Rejected"},"Rejected"))),m.a.createElement(d.a,{className:"m-2"},m.a.createElement(E.a,{className:" btn btn-danger float-right",onClick:function(){return p.a.push("/app/freshlist/refundrequest/rejectedRequest")}},"Back"))),m.a.createElement(f.a,null,m.a.createElement(i.a,{className:"mx-0",col:"12"},m.a.createElement(d.a,{className:"pl-0",sm:"12",lg:"6"},m.a.createElement(h.a,{className:"d-sm-flex d-block"},m.a.createElement(h.a,{className:"mt-md-1 mt-0",left:!0},null===(e=this.state.data)||void 0===e||null===(a=e.banner_img)||void 0===a?void 0:a.map((function(e){return m.a.createElement("img",{className:"border-black m-0",src:e,alt:"user avatar",height:"400"})}))),m.a.createElement(h.a,{body:!0},m.a.createElement(i.a,{className:"ml-4"},m.a.createElement(d.a,{sm:"9",md:"12",lg:"12"},m.a.createElement("div",{className:"users-page-view-table"},m.a.createElement("div",{className:"d-flex user-info"},m.a.createElement("div",{className:"user-info-title font-weight-bold"},m.a.createElement("h3",null,"Refund id")),m.a.createElement("div",{className:"text-truncate"},m.a.createElement("span",null,this.state.data.banner_title))),m.a.createElement("div",{className:"d-flex user-info"},m.a.createElement("div",{className:"user-info-title font-weight-bold"},m.a.createElement("h3",null,"Item Image")),m.a.createElement("div",{className:"text-truncate"},m.a.createElement("span",null,this.state.data.bannertype))),m.a.createElement("div",{className:"d-flex user-info"},m.a.createElement("div",{className:"user-info-title font-weight-bold"},m.a.createElement("h3",null,"Payment Method")),m.a.createElement("div",{className:"text-truncate"},m.a.createElement("span",null,this.state.data.bannertype))),m.a.createElement("div",{className:"d-flex user-info"},m.a.createElement("div",{className:"user-info-title font-weight-bold"},m.a.createElement("h3",null,"Refund Status")),m.a.createElement("div",{className:"text-truncate"},m.a.createElement("span",null,this.state.data.bannertype))),m.a.createElement("div",{className:"d-flex user-info"},m.a.createElement("div",{className:"user-info-title font-weight-bold"},m.a.createElement("h3",null,"Tax")),m.a.createElement("div",{className:"text-truncate"},m.a.createElement("span",null,this.state.data.bannertype))),m.a.createElement("div",{className:"d-flex user-info"},m.a.createElement("div",{className:"user-info-title font-weight-bold"},m.a.createElement("h3",null,"Discount")),m.a.createElement("div",{className:"text-truncate"},m.a.createElement("span",null,this.state.data.bannertype))),m.a.createElement("div",{className:"d-flex user-info"},m.a.createElement("div",{className:"user-info-title font-weight-bold"},m.a.createElement("h3",null,"Price:")),m.a.createElement("div",{className:"text-truncate"},m.a.createElement("span",null,this.state.data.bannertype)))))))))))))))}}]),t}(m.a.Component));a.default=N},852:function(e,a,t){}}]);
//# sourceMappingURL=288.b12ef584.chunk.js.map