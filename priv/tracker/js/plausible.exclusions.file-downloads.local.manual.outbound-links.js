!function(){"use strict";var c=window.location,s=window.document,u=s.currentScript,f=u.getAttribute("data-api")||new URL(u.src).origin+"/api/event";function d(e){console.warn("Ignoring Event: "+e)}function e(e,t){try{if("true"===window.localStorage.plausible_ignore)return d("localStorage flag")}catch(e){}var a=u&&u.getAttribute("data-include"),r=u&&u.getAttribute("data-exclude");if("pageview"===e){var i=!a||a&&a.split(",").some(o),n=r&&r.split(",").some(o);if(!i||n)return d("exclusion rule")}function o(e){return c.pathname.match(new RegExp("^"+e.trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$"))}var p={};p.n=e,p.u=t&&t.u?t.u:c.href,p.d=u.getAttribute("data-domain"),p.r=s.referrer||null,p.w=window.innerWidth,t&&t.meta&&(p.m=JSON.stringify(t.meta)),t&&t.props&&(p.p=t.props);var l=new XMLHttpRequest;l.open("POST",f,!0),l.setRequestHeader("Content-Type","text/plain"),l.send(JSON.stringify(p)),l.onreadystatechange=function(){4===l.readyState&&t&&t.callback&&t.callback()}}function t(e){for(var t=e.target,a="auxclick"===e.type&&2===e.which,r="click"===e.type;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;t&&t.href&&t.host&&t.host!==c.host&&((a||r)&&plausible("Outbound Link: Click",{props:{url:t.href}}),t.target&&!t.target.match(/^_(self|parent|top)$/i)||e.ctrlKey||e.metaKey||e.shiftKey||!r||(setTimeout(function(){c.href=t.href},150),e.preventDefault()))}s.addEventListener("click",t),s.addEventListener("auxclick",t);var a=["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"],r=u.getAttribute("file-types"),i=u.getAttribute("add-file-types"),o=r&&r.split(",")||i&&i.split(",").concat(a)||a;function n(e){for(var t=e.target,a="auxclick"===e.type&&2===e.which,r="click"===e.type;t&&(void 0===t.tagName||"a"!==t.tagName.toLowerCase()||!t.href);)t=t.parentNode;var i,n=t&&t.href&&t.href.split("?")[0];n&&(i=n.split(".").pop(),o.some(function(e){return e===i}))&&((a||r)&&plausible("File Download",{props:{url:n}}),t.target&&!t.target.match(/^_(self|parent|top)$/i)||e.ctrlKey||e.metaKey||e.shiftKey||!r||(setTimeout(function(){c.href=t.href},150),e.preventDefault()))}s.addEventListener("click",n),s.addEventListener("auxclick",n);var p=window.plausible&&window.plausible.q||[];window.plausible=e;for(var l=0;l<p.length;l++)e.apply(this,p[l])}();