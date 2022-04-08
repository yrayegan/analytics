!function(){"use strict";var e,t,i,o=window.location,r=window.document,n=r.getElementById("plausible"),l=n.getAttribute("data-api")||(e=n.src.split("/"),t=e[0],i=e[2],t+"//"+i+"/api/event");function a(e,t){if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"==window.localStorage.plausible_ignore)return void console.warn("Ignoring Event: localStorage flag")}catch(e){}var i={};i.n=e,i.u=o.href,i.d=n.getAttribute("data-domain"),i.r=r.referrer||null,i.w=window.innerWidth,t&&t.meta&&(i.m=JSON.stringify(t.meta)),t&&t.props&&(i.p=JSON.stringify(t.props)),i.h=1;var a=new XMLHttpRequest;a.open("POST",l,!0),a.setRequestHeader("Content-Type","text/plain"),a.send(JSON.stringify(i)),a.onreadystatechange=function(){4==a.readyState&&t&&t.callback&&t.callback()}}}function p(e){for(var t=e.target,i="auxclick"==e.type&&2==e.which,a="click"==e.type;t&&(void 0===t.tagName||"a"!=t.tagName.toLowerCase()||!t.href);)t=t.parentNode;t&&t.href&&t.host&&t.host!==o.host&&((i||a)&&plausible("Outbound Link: Click",{props:{url:t.href}}),t.target&&!t.target.match(/^_(self|parent|top)$/i)||e.ctrlKey||e.metaKey||e.shiftKey||!a||(setTimeout(function(){o.href=t.href},150),e.preventDefault()))}r.addEventListener("click",p),r.addEventListener("auxclick",p);var s=n.getAttribute("file-types"),c=s&&s.split(",")||["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"];function d(e){for(var t,i,a=e.target,r="auxclick"==e.type&&2==e.which,n="click"==e.type;a&&(void 0===a.tagName||"a"!=a.tagName.toLowerCase()||!a.href);)a=a.parentNode;a&&a.href&&(t=a.href,i=t.split(".").pop(),c.some(function(e){return e==i}))&&((r||n)&&plausible("File Download",{props:{url:a.href}}),a.target&&!a.target.match(/^_(self|parent|top)$/i)||e.ctrlKey||e.metaKey||e.shiftKey||!n||(setTimeout(function(){o.href=a.href},150),e.preventDefault()))}r.addEventListener("click",d),r.addEventListener("auxclick",d);var f=window.plausible&&window.plausible.q||[];window.plausible=a;for(var u,w=0;w<f.length;w++)a.apply(this,f[w]);function h(){u=o.pathname,a("pageview")}window.addEventListener("hashchange",h),"prerender"===r.visibilityState?r.addEventListener("visibilitychange",function(){u||"visible"!==r.visibilityState||h()}):h()}();