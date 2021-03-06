// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
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

// webticker
(function(e){var f=(function(){var k=document.createElement("p").style,j=["ms","O","Moz","Webkit"];if(k.transition==""){return true}while(j.length){if(j.pop()+"Transition" in k){return true}}return false})();function b(k,j){var m=k.data("settings");if(typeof j==="undefined"){j=false}if(j){a(k)}var l=h(k);k.animate(l.css,l.time,"linear",function(){k.css(m.direction,"0");b(k,true)})}function h(j){var m=j.data("settings");var n=j.children().first();var o=Math.abs(-j.css(m.direction).replace("px","").replace("auto","0")-n.outerWidth(true));var m=j.data("settings");var k=o*1000/m.speed;var l={};l[m.direction]=j.css(m.direction).replace("px","").replace("auto","0")-o;return{css:l,time:k}}function a(j){var k=j.data("settings");j.css("transition-duration","0s").css(k.direction,"0");var l=j.children().first();if(l.hasClass("webticker-init")){l.remove()}else{j.children().last().after(l)}}function d(k,j){if(typeof j==="undefined"){j=false}if(j){a(k)}var l=h(k);var m=l.time/1000;m+="s";k.css(l.css).css("transition-duration",m)}function i(l,k,j){var m;e.get(l,function(o){var n=e(o);n.find("item").each(function(){var q=e(this),p={title:q.find("title").text(),link:q.find("link").text()};listItem="<li><a href='"+p.link+"'>"+p.title+"</a></li>";m+=listItem});j.webTicker("update",m,k)})}function g(l){var n=l.data("settings");l.width("auto");var m=0;l.children("li").each(function(){m+=e(this).outerWidth(true)});if(m<l.parent().width()||l.children().length==1){if(n.duplicate){itemWidth=Math.max.apply(Math,l.children().map(function(){return e(this).width()}).get());while(m-itemWidth<l.parent().width()||l.children().length==1){var o=l.children().clone();l.append(o);m=0;l.children("li").each(function(){m+=e(this).outerWidth(true)});itemWidth=Math.max.apply(Math,l.children().map(function(){return e(this).width()}).get())}}else{var k=l.parent().width()-m;k+=l.find("li:first").width();var j=l.find("li:first").height();l.append('<li class="ticker-spacer" style="width:'+k+"px;height:"+j+'px;"></li>')}}if(n.startEmpty){var j=l.find("li:first").height();l.prepend('<li class="webticker-init" style="width:'+l.parent().width()+"px;height:"+j+'px;"></li>')}m=0;l.children("li").each(function(){m+=e(this).outerWidth(true)});l.width(m+200);widthCompare=0;l.children("li").each(function(){widthCompare+=e(this).outerWidth(true)});while(widthCompare>=l.width()){l.width(l.width()+200);widthCompare=0;l.children("li").each(function(){widthCompare+=e(this).outerWidth(true)})}}var c={init:function(j){j=jQuery.extend({speed:50,direction:"left",moving:true,startEmpty:true,duplicate:false,rssurl:false,hoverpause:true,rssfrequency:0,updatetype:"reset"},j);return this.each(function(){jQuery(this).data("settings",j);var k=jQuery(this);k.addClass("newsticker");var m=k.wrap("<div class='mask'></div>");m.after("<span class='tickeroverlay-left'>&nbsp;</span><span class='tickeroverlay-right'>&nbsp;</span>");var l=k.parent().wrap("<div class='tickercontainer'></div>");g(k);if(j.rssurl){i(j.rssurl,j.type,k);if(j.rssfrequency>0){window.setInterval(function(){i(j.rssurl,j.type,k)},j.rssfrequency*1000*60)}}if(f){k.css("transition-duration","0s").css(j.direction,"0");d(k,false);k.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend",function(n){if(!k.is(n.target)){return false}d(e(this),true)})}else{b(e(this))}if(j.hoverpause){k.hover(function(){if(f){var n=e(this).css(j.direction);e(this).css("transition-duration","0s").css(j.direction,n)}else{jQuery(this).stop()}},function(){if(jQuery(this).data("settings").moving){if(f){d(e(this),false)}else{b(k)}}})}})},stop:function(){var j=e(this).data("settings");if(j.moving){j.moving=false;return this.each(function(){if(f){var k=e(this).css(j.direction);e(this).css("transition-duration","0s").css(j.direction,k)}else{e(this).stop()}})}},cont:function(){var j=e(this).data("settings");if(!j.moving){j.moving=true;return this.each(function(){if(f){d(e(this),false)}else{b(e(this))}})}},update:function(p,n,o,j){n=n||"reset";if(typeof o==="undefined"){o=true}if(typeof j==="undefined"){j=false}if(typeof p==="string"){p=e(p)}var k=e(this);k.webTicker("stop");var m=e(this).data("settings");if(n=="reset"){k.html(p);k.css(m.direction,"0");g(k)}else{if(n=="swap"){k.children("li").addClass("old");for(var l=0;l<p.length;l++){id=e(p[l]).data("update");match=k.find('[data-update="'+id+'"]');if(match.length<1){if(o){if(k.find(".ticker-spacer:first-child").length==0&&k.find(".ticker-spacer").length>0){k.children("li.ticker-spacer").before(p[l])}else{k.append(p[l])}}}else{k.find('[data-update="'+id+'"]').replaceWith(p[l])}}k.children("li.webticker-init, li.ticker-spacer").removeClass("old");if(j){k.children("li").remove(".old")}stripWidth=0;k.children("li").each(function(){stripWidth+=e(this).outerWidth(true)});k.width(stripWidth+200)}}k.webTicker("cont")}};e.fn.webTicker=function(j){if(c[j]){return c[j].apply(this,Array.prototype.slice.call(arguments,1))}else{if(typeof j==="object"||!j){return c.init.apply(this,arguments)}else{e.error("Method "+j+" does not exist on jQuery.webTicker")}}}})(jQuery);

// smooth scroll
/*$(document).ready(function() {
  function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');
 
  $('a[href*=#]').each(function() {
    var thisPath = filterPath(this.pathname) || locationPath;
    if (  locationPath == thisPath
    && (location.hostname == this.hostname || !this.hostname)
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash), target = this.hash;
      if (target) {
        var targetOffset = $target.offset().top;
        $(this).click(function(event) {
          event.preventDefault();
          $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
            location.hash = target;
          });
        });
      }
    }
  });
 
  // use the first element that is "scrollable"
  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
      var el = arguments[i],
          $scrollElement = $(el);
      if ($scrollElement.scrollTop()> 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop()> 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return el;
        }
      }
    }
    return [];
  }
 
});*/