// Generated by CoffeeScript 1.6.3
(function(){$(function(){var e,t,n,r,i;return r=function(e,t,n,r){var i,s;return s=t.position,i=e+"\n"+n.type+" at "+r.pageX+", "+r.pageY+"\n"+"draggie position at "+s.x+", "+s.y,console.log(i)},e=document.querySelector("#mask"),n=e.querySelector("#image"),t=new Draggabilly(n),i=e.querySelector("code"),t.on("dragStart",function(e,t,n){return r("DRAG START",e,t,n)}),t.on("dragMove",function(e,t,n){return r("DRAG MOVE",e,t,n)}),t.on("dragEnd",function(e,t,n){return r("DRAG END",e,t,n)}),$("input[type='range']").change(function(){var e,t,n;t=$(this).val(),t=parseInt(t),n=$(this).attr("data-property"),e=$(this).attr("data-unit"),$(this).attr("data-value",t);switch(n){case"background-size":return image.css({"background-size":""+t+e});case"animation-duration":return image.css({"animation-duration":""+t+e});case"animation-delay":return image.css({"animation-delay":""+t+e});case"animation-iteration-count":return image.css({"animation-iteration-count":""+t})}}),$("input[type='text']").change(function(){var e,t;t=$(this).data("property"),e=$(this).val(),$(this).attr("data-value",val);switch(t){case"animation-name":return image.css({"animation-name":""+e})}}),$("select").change(function(){var e,t;t=$(this).data("property"),e=$(this).val(),$(this).attr("data-value",val);switch(t){case"animation-timing-function":return image.css({"animation-timing-function":""+e})}}),$("a[data-property='animation-iteration-count']").click(function(e){return e.preventDefault(),$(this).attr("data-value",val),image.css({"animation-iteration-count":"infinite"})})})}).call(this);