!function(){"use strict";var t,e,a,p=window.location,o=window.document,l=o.getElementById("plausible"),s=l.getAttribute("data-api")||(t=l.src.split("/"),e=t[0],a=t[2],e+"//"+a+"/api/event");function r(t,e){try{if("true"===window.localStorage.plausible_ignore)return void console.warn("Ignoring Event: localStorage flag")}catch(t){}var a={};a.n=t,a.u=e&&e.u?e.u:p.href,a.d=l.getAttribute("data-domain"),a.r=o.referrer||null,a.w=window.innerWidth,e&&e.meta&&(a.m=JSON.stringify(e.meta)),e&&e.props&&(a.p=e.props);var r=l.getAttributeNames().filter(function(t){return"event-"===t.substring(0,6)}),i=a.p||{};r.forEach(function(t){var e=t.replace("event-",""),a=l.getAttribute(t);i[e]=i[e]||a}),a.p=i,a.h=1;var n=new XMLHttpRequest;n.open("POST",s,!0),n.setRequestHeader("Content-Type","text/plain"),n.send(JSON.stringify(a)),n.onreadystatechange=function(){4===n.readyState&&e&&e.callback&&e.callback()}}var i=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],n=l.getAttribute("file-types"),c=l.getAttribute("add-file-types"),u=n&&n.split(",")||c&&c.split(",").concat(i)||i;function d(t){for(var e=t.target,a="auxclick"===t.type&&2===t.which,r="click"===t.type;e&&(void 0===e.tagName||"a"!==e.tagName.toLowerCase()||!e.href);)e=e.parentNode;var i,n=e&&e.href&&e.href.split("?")[0];n&&(i=n.split(".").pop(),u.some(function(t){return t===i}))&&((a||r)&&plausible("File Download",{props:{url:n}}),e.target&&!e.target.match(/^_(self|parent|top)$/i)||t.ctrlKey||t.metaKey||t.shiftKey||!r||(setTimeout(function(){p.href=e.href},150),t.preventDefault()))}o.addEventListener("click",d),o.addEventListener("auxclick",d);var f=window.plausible&&window.plausible.q||[];window.plausible=r;for(var g=0;g<f.length;g++)r.apply(this,f[g])}();