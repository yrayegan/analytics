!function(){"use strict";var e,t,i,n=window.location,r=window.document,o=r.getElementById("plausible"),l=o.getAttribute("data-api")||(e=o.src.split("/"),t=e[0],i=e[2],t+"//"+i+"/api/event");function a(e,t){try{if("true"===window.localStorage.plausible_ignore)return void console.warn("Ignoring Event: localStorage flag")}catch(e){}var i={};i.n=e,i.u=n.href,i.d=o.getAttribute("data-domain"),i.r=r.referrer||null,i.w=window.innerWidth,t&&t.meta&&(i.m=JSON.stringify(t.meta)),t&&t.props&&(i.p=t.props),i.h=1;var a=new XMLHttpRequest;a.open("POST",l,!0),a.setRequestHeader("Content-Type","text/plain"),a.send(JSON.stringify(i)),a.onreadystatechange=function(){4===a.readyState&&t&&t.callback&&t.callback()}}function s(e){for(var t=e.target,i="auxclick"===e.type&&2===e.which,a="click"===e.type;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;t&&t.href&&t.host&&t.host!==n.host&&((i||a)&&plausible("Outbound Link: Click",{props:{url:t.href}}),t.target&&!t.target.match(/^_(self|parent|top)$/i)||e.ctrlKey||e.metaKey||e.shiftKey||!a||(setTimeout(function(){n.href=t.href},150),e.preventDefault()))}r.addEventListener("click",s),r.addEventListener("auxclick",s);var c=window.plausible&&window.plausible.q||[];window.plausible=a;for(var d,p=0;p<c.length;p++)a.apply(this,c[p]);function u(){d=n.pathname,a("pageview")}window.addEventListener("hashchange",u),"prerender"===r.visibilityState?r.addEventListener("visibilitychange",function(){d||"visible"!==r.visibilityState||u()}):u()}();