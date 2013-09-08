// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.
/*!
 * imagesLoaded PACKAGED v3.0.4
 * JavaScript is all like "You images are done yet or what?"
 */

(function(){"use strict";function e(){}function t(e,t){for(var n=e.length;n--;)if(e[n].listener===t)return n;return-1}var n=e.prototype;n.getListeners=function(e){var t,n,i=this._getEvents();if("object"==typeof e){t={};for(n in i)i.hasOwnProperty(n)&&e.test(n)&&(t[n]=i[n])}else t=i[e]||(i[e]=[]);return t},n.flattenListeners=function(e){var t,n=[];for(t=0;e.length>t;t+=1)n.push(e[t].listener);return n},n.getListenersAsObject=function(e){var t,n=this.getListeners(e);return n instanceof Array&&(t={},t[e]=n),t||n},n.addListener=function(e,n){var i,r=this.getListenersAsObject(e),o="object"==typeof n;for(i in r)r.hasOwnProperty(i)&&-1===t(r[i],n)&&r[i].push(o?n:{listener:n,once:!1});return this},n.on=n.addListener,n.addOnceListener=function(e,t){return this.addListener(e,{listener:t,once:!0})},n.once=n.addOnceListener,n.defineEvent=function(e){return this.getListeners(e),this},n.defineEvents=function(e){for(var t=0;e.length>t;t+=1)this.defineEvent(e[t]);return this},n.removeListener=function(e,n){var i,r,o=this.getListenersAsObject(e);for(r in o)o.hasOwnProperty(r)&&(i=t(o[r],n),-1!==i&&o[r].splice(i,1));return this},n.off=n.removeListener,n.addListeners=function(e,t){return this.manipulateListeners(!1,e,t)},n.removeListeners=function(e,t){return this.manipulateListeners(!0,e,t)},n.manipulateListeners=function(e,t,n){var i,r,o=e?this.removeListener:this.addListener,s=e?this.removeListeners:this.addListeners;if("object"!=typeof t||t instanceof RegExp)for(i=n.length;i--;)o.call(this,t,n[i]);else for(i in t)t.hasOwnProperty(i)&&(r=t[i])&&("function"==typeof r?o.call(this,i,r):s.call(this,i,r));return this},n.removeEvent=function(e){var t,n=typeof e,i=this._getEvents();if("string"===n)delete i[e];else if("object"===n)for(t in i)i.hasOwnProperty(t)&&e.test(t)&&delete i[t];else delete this._events;return this},n.emitEvent=function(e,t){var n,i,r,o,s=this.getListenersAsObject(e);for(r in s)if(s.hasOwnProperty(r))for(i=s[r].length;i--;)n=s[r][i],o=n.listener.apply(this,t||[]),(o===this._getOnceReturnValue()||n.once===!0)&&this.removeListener(e,s[r][i].listener);return this},n.trigger=n.emitEvent,n.emit=function(e){var t=Array.prototype.slice.call(arguments,1);return this.emitEvent(e,t)},n.setOnceReturnValue=function(e){return this._onceReturnValue=e,this},n._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},n._getEvents=function(){return this._events||(this._events={})},"function"==typeof define&&define.amd?define(function(){return e}):"undefined"!=typeof module&&module.exports?module.exports=e:this.EventEmitter=e}).call(this),function(e){"use strict";var t=document.documentElement,n=function(){};t.addEventListener?n=function(e,t,n){e.addEventListener(t,n,!1)}:t.attachEvent&&(n=function(t,n,i){t[n+i]=i.handleEvent?function(){var t=e.event;t.target=t.target||t.srcElement,i.handleEvent.call(i,t)}:function(){var n=e.event;n.target=n.target||n.srcElement,i.call(t,n)},t.attachEvent("on"+n,t[n+i])});var i=function(){};t.removeEventListener?i=function(e,t,n){e.removeEventListener(t,n,!1)}:t.detachEvent&&(i=function(e,t,n){e.detachEvent("on"+t,e[t+n]);try{delete e[t+n]}catch(i){e[t+n]=void 0}});var r={bind:n,unbind:i};"function"==typeof define&&define.amd?define(r):e.eventie=r}(this),function(e){"use strict";function t(e,t){for(var n in t)e[n]=t[n];return e}function n(e){return"[object Array]"===c.call(e)}function i(e){var t=[];if(n(e))t=e;else if("number"==typeof e.length)for(var i=0,r=e.length;r>i;i++)t.push(e[i]);else t.push(e);return t}function r(e,n){function r(e,n,s){if(!(this instanceof r))return new r(e,n);"string"==typeof e&&(e=document.querySelectorAll(e)),this.elements=i(e),this.options=t({},this.options),"function"==typeof n?s=n:t(this.options,n),s&&this.on("always",s),this.getImages(),o&&(this.jqDeferred=new o.Deferred);var a=this;setTimeout(function(){a.check()})}function c(e){this.img=e}r.prototype=new e,r.prototype.options={},r.prototype.getImages=function(){this.images=[];for(var e=0,t=this.elements.length;t>e;e++){var n=this.elements[e];"IMG"===n.nodeName&&this.addImage(n);for(var i=n.querySelectorAll("img"),r=0,o=i.length;o>r;r++){var s=i[r];this.addImage(s)}}},r.prototype.addImage=function(e){var t=new c(e);this.images.push(t)},r.prototype.check=function(){function e(e,r){return t.options.debug&&a&&s.log("confirm",e,r),t.progress(e),n++,n===i&&t.complete(),!0}var t=this,n=0,i=this.images.length;if(this.hasAnyBroken=!1,!i)return this.complete(),void 0;for(var r=0;i>r;r++){var o=this.images[r];o.on("confirm",e),o.check()}},r.prototype.progress=function(e){this.hasAnyBroken=this.hasAnyBroken||!e.isLoaded;var t=this;setTimeout(function(){t.emit("progress",t,e),t.jqDeferred&&t.jqDeferred.notify(t,e)})},r.prototype.complete=function(){var e=this.hasAnyBroken?"fail":"done";this.isComplete=!0;var t=this;setTimeout(function(){if(t.emit(e,t),t.emit("always",t),t.jqDeferred){var n=t.hasAnyBroken?"reject":"resolve";t.jqDeferred[n](t)}})},o&&(o.fn.imagesLoaded=function(e,t){var n=new r(this,e,t);return n.jqDeferred.promise(o(this))});var f={};return c.prototype=new e,c.prototype.check=function(){var e=f[this.img.src];if(e)return this.useCached(e),void 0;if(f[this.img.src]=this,this.img.complete&&void 0!==this.img.naturalWidth)return this.confirm(0!==this.img.naturalWidth,"naturalWidth"),void 0;var t=this.proxyImage=new Image;n.bind(t,"load",this),n.bind(t,"error",this),t.src=this.img.src},c.prototype.useCached=function(e){if(e.isConfirmed)this.confirm(e.isLoaded,"cached was confirmed");else{var t=this;e.on("confirm",function(e){return t.confirm(e.isLoaded,"cache emitted confirmed"),!0})}},c.prototype.confirm=function(e,t){this.isConfirmed=!0,this.isLoaded=e,this.emit("confirm",this,t)},c.prototype.handleEvent=function(e){var t="on"+e.type;this[t]&&this[t](e)},c.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindProxyEvents()},c.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindProxyEvents()},c.prototype.unbindProxyEvents=function(){n.unbind(this.proxyImage,"load",this),n.unbind(this.proxyImage,"error",this)},r}var o=e.jQuery,s=e.console,a=s!==void 0,c=Object.prototype.toString;"function"==typeof define&&define.amd?define(["eventEmitter/EventEmitter","eventie/eventie"],r):e.imagesLoaded=r(e.EventEmitter,e.eventie)}(window);


/*!
    FileReader.js - a lightweight wrapper for common FileReader usage.
    Copyright 2012 Brian Grinstead - MIT License.
    See http://github.com/bgrins/filereader.js for documentation.
    Built: 2012-11-15 09:11:57 PM
*/

(function(e,t){function f(e,t){function r(e){var t=[],r=e.clipboardData||{},i=r.items||[];for(var s=0;s<i.length;s++){var o=i[s].getAsFile();if(o){var u=(new RegExp("/(.*)")).exec(o.type);if(!o.name&&u){var a=u[1];o.name="clipboard"+s+"."+a}t.push(o)}}t.length&&(d(e,t,n),e.preventDefault(),e.stopPropagation())}if(!u.enabled)return;var n=g(g({},u.opts),t);e.addEventListener("paste",r,!1)}function l(e,t){function r(t){d(t,e.files,n)}function i(e){e.stopPropagation(),e.preventDefault(),d(e,e.dataTransfer.files,n)}if(!u.enabled)return;var n=g(g({},u.opts),t);e.addEventListener("change",r,!1),e.addEventListener("drop",i,!1)}function c(e,n){function o(e){s=!1}function a(e){s=!0}function f(e){e.dataTransfer.files&&e.dataTransfer.files.length&&(e.stopPropagation(),e.preventDefault())}function l(e){return function(){s||e.apply(this,arguments)}}function c(t){t.stopPropagation(),t.preventDefault(),i&&w(e,i),d(t,t.dataTransfer.files,r)}function h(t){t.stopPropagation(),t.preventDefault(),i&&b(e,i)}function p(t){i&&w(e,i)}function v(t){t.stopPropagation(),t.preventDefault(),i&&b(e,i)}if(!u.enabled)return;var r=g(g({},u.opts),n),i=r.dragClass,s=!1;e.addEventListener("dragenter",l(h),!1),e.addEventListener("dragleave",l(p),!1),e.addEventListener("dragover",l(v),!1),e.addEventListener("drop",l(c),!1),t.body.addEventListener("dragstart",a,!0),t.body.addEventListener("dragend",o,!0),t.body.addEventListener("drop",f,!1)}function h(e,t){for(var n=0;n<e.length;n++){var r=e[n];r.extra={nameNoExtension:r.name.substring(0,r.name.lastIndexOf(".")),extension:r.name.substring(r.name.lastIndexOf(".")+1),fileID:n,uniqueID:x(),groupID:t,prettySize:E(r.size)}}}function p(e,t,n){for(var r in t)if(e.match(new RegExp(r)))return"readAs"+t[r];return"readAs"+n}function d(e,t,s){function c(){l.ended=new Date,s.on.groupend(l)}function d(){--f===0&&c()}var f=t.length,l={groupID:S(),files:t,started:new Date};u.output.push(l),h(t,l.groupID),s.on.groupstart(l);if(!t.length){c();return}var v=u.sync&&r,m;v&&(m=a.getWorker(i,function(e){var t=e.data.file,n=e.data.result;t.extra||(t.extra=e.data.extra),t.extra.ended=new Date,s.on[n==="error"?"error":"load"]({target:{result:n}},t),d()})),Array.prototype.forEach.call(t,function(t){t.extra.started=new Date;if(s.accept&&!t.type.match(new RegExp(s.accept))){s.on.skip(t),d();return}if(s.on.beforestart(t)===!1){s.on.skip(t),d();return}var r=p(t.type,s.readAsMap,s.readAsDefault);if(v&&m)m.postMessage({file:t,extra:t.extra,readAs:r});else{var i=new n;i.originalEvent=e,o.forEach(function(e){i["on"+e]=function(n){if(e=="load"||e=="error")t.extra.ended=new Date;s.on[e](n,t),e=="loadend"&&d()}}),i[r](t)}})}function v(){var e=a.getWorker(s,function(e){r=e.data});e&&e.postMessage({})}function m(){}function g(e,t){for(var n in t)t[n]&&t[n].constructor&&t[n].constructor===Object?(e[n]=e[n]||{},arguments.callee(e[n],t[n])):e[n]=t[n];return e}function y(e,t){return(new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)")).test(e.className)}function b(e,t){y(e,t)||(e.className=e.className?[e.className,t].join(" "):t)}function w(e,t){if(y(e,t)){var n=e.className;e.className=n.replace(new RegExp("(?:^|\\s+)"+t+"(?:\\s+|$)","g")," ").replace(/^\s\s*/,"").replace(/\s\s*$/,"")}}function E(e){var t=["bytes","kb","MB","GB","TB","PB"],n=Math.floor(Math.log(e)/Math.log(1024));return(e/Math.pow(1024,Math.floor(n))).toFixed(2)+" "+t[n]}var n=e.FileReader,r=!1,i="self.addEventListener('message', function(e) { var data=e.data; try { var reader = new FileReaderSync; postMessage({ result: reader[data.readAs](data.file), extra: data.extra, file: data.file})} catch(e){ postMessage({ result:'error', extra:data.extra, file:data.file}); } }, false);",s="self.addEventListener('message', function(e) { postMessage(!!FileReaderSync); }, false);",o=["loadstart","progress","load","abort","error","loadend"],u=e.FileReaderJS={enabled:!1,setupInput:l,setupDrop:c,setupClipboard:f,sync:!1,output:[],opts:{dragClass:"drag",accept:!1,readAsDefault:"BinaryString",readAsMap:{"image/*":"DataURL","text/*":"Text"},on:{loadstart:m,progress:m,load:m,abort:m,error:m,loadend:m,skip:m,groupstart:m,groupend:m,beforestart:m}}};typeof jQuery!="undefined"&&(jQuery.fn.fileReaderJS=function(e){return this.each(function(){$(this).is("input")?l(this,e):c(this,e)})},jQuery.fn.fileClipboard=function(e){return this.each(function(){f(this,e)})});if(!n)return;var a=function(){function r(r){if(e.Worker&&n&&t){var i=new n;return i.append(r),t.createObjectURL(i.getBlob())}return null}function i(e,t){var n=r(e);if(n){var i=new Worker(n);return i.onmessage=t,i}return null}var t=e.URL||e.webkitURL,n=e.BlobBuilder||e.WebKitBlobBuilder||e.MozBlobBuilder;return{getURL:r,getWorker:i}}(),S=function(e){return function(){return e++}}(0),x=function(e){return function(){return e++}}(0);u.enabled=!0})(this,document);