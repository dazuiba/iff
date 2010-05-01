(function(){
  function $extend(original, extended){
    for (var key in (extended || {})) original[key] = extended[key];
    return original;
  };
  var SHAREIN=$extend({title: '', url: '', description: '', pid: '', mode: '', domain: 'ifeelfine.cn', tun: '', ts: ''}, window.SHAREIN),
    d=document,
    b=d.body,
    w=window,
    e=w.getSelection,
    k=d.getSelection,
    x=d.selection,
    s=(e?e():(k)?k():(x?x.createRange().text:0)),
    f='http://'+SHAREIN.domain+'/shares/new',
    l=w.location,
    e=encodeURIComponent,
    noui='tiny=1',
    href=l.href,
    o={w:485,h:435},
    $=function(id){ return d.getElementById(id); },
    $t=function(tag){ return d.getElementsByTagName(tag); },
    $tr=function(str){ return str.replace(/^\s+|\s+$/g, ''); },
    $c=function(str){ return $tr(str.replace(/\s+/g, ' ')); },
    $trc=function(str, len){ len=len||250; return (str.length>len) ? str.slice(0, len) : str; };
  
  // get meta tag desc
  var desc = '';
  var m = $t('meta');
  for (var i=0, len=m.length; i<len; i++){
    if (m[i].name.toLowerCase()=='description') desc = m[i].content;
  };
  var filename = (function(){
    var larr = l.href.split('/');
    var last = larr[larr.length-1];
    return (last) ? last : larr[larr.length-2];
  })();
  if (!SHAREIN.url) SHAREIN.url = l.href;
  var urlHash = SHAREIN.url.split('#');
  if (urlHash.length>1 && urlHash[1] == '') SHAREIN.url = urlHash[0];
  if (!SHAREIN.title) SHAREIN.title = d.title||filename;
  if (!SHAREIN.description) SHAREIN.description = desc;
  var uparams = 'v=1&u='+e($tr(SHAREIN.url)) +'&m='+SHAREIN.mode+'&t='+e($trc($c(SHAREIN.title))) +'&d='+e($trc($c(SHAREIN.description)))+'&s='+e($trc($c(''+s)));
  if (SHAREIN.pid) uparams = 'pid='+$c(SHAREIN.pid)+'&'+uparams;
  if (SHAREIN.tun) uparams = 'tun='+$c(SHAREIN.tun)+'&'+uparams;
  if (SHAREIN.ts) uparams = 'ts='+$c(SHAREIN.ts)+'&'+uparams;
  var u=f+'?'+noui+'&'+uparams;
  
  if ($t('frameset').length){
    var a = function(){
      if (!w.open(u,'t','toolbar=0,scrollbars=1,status=1,width='+o.w+',height='+o.h)) l.href=f+'?'+uparams;
    };
    (/Firefox/.test(navigator.userAgent)) ? setTimeout(a,0) : a();
  } else if (!$('_sharein_bookmarklet')){
    var toggle = function(els, hide){
      for (var i=0, l=els.length; i < l; i++) els[i].style.visibility = hide?'hidden':'visible';
    },
    addEvent = function(obj, type, fn){
      if (obj.addEventListener){
        obj.addEventListener(type, fn, false);
      } else if (obj.attachEvent){
        obj['e'+type+fn] = fn;
        obj[type+fn] = function(){ obj['e'+type+fn](w.event); }
        obj.attachEvent('on'+type, obj[type+fn]);
      }
    },
    getOffset = function(obj){
        var curleft = 0;
        var curtop = 0;
        if (obj.offsetParent){
            curleft = obj.offsetLeft;
            curtop = obj.offsetTop;
            while (obj = obj.offsetParent){
                curleft += obj.offsetLeft;
                curtop += obj.offsetTop;
            }
        }
        return { left: curleft, top: curtop };
    },
    windowDim = function(){
      var wi = 0, he = 0;
      if ( typeof( w.innerWidth ) == 'number' ){
        //Non-IE
        wi = w.innerWidth;
        he = w.innerHeight;
      } else if ( d.documentElement && ( d.documentElement.clientWidth || d.documentElement.clientHeight ) ){
        //IE 6+ in 'standards compliant mode'
        wi = d.documentElement.clientWidth;
        he = d.documentElement.clientHeight;
      } else if ( b && ( b.clientWidth || b.clientHeight ) ){
        //IE 4 compatible
        wi = b.clientWidth;
        he = b.clientHeight;
      }
      return { width: wi, height: he };
    },
    winScroll = function(){
      function f_filterResults(n_win, n_docel, n_body){
        var n_result = n_win ? n_win : 0;
        if (n_docel && (!n_result || (n_result > n_docel)))
          n_result = n_docel;
        return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
      };
      return {
        left: f_filterResults (
          w.pageXOffset ? w.pageXOffset : 0,
          d.documentElement ? d.documentElement.scrollLeft : 0,
          b ? b.scrollLeft : 0
        ),
        top: f_filterResults (
          w.pageYOffset ? w.pageYOffset : 0,
          d.documentElement ? d.documentElement.scrollTop : 0,
          b ? b.scrollTop : 0
        )
      };
    },
    center = function(element, offsets){
      offsets = offsets||{x: 0, y: 0};
      var pos = getOffset(element);
      var win = windowDim();
      var scroll = winScroll();
      var dim = {
        width: element.offsetWidth,
        height: element.offsetHeight
      };
      element.style.top = (scroll.top + win.height/2 - dim.height/2 + offsets.y) + 'px';
      element.style.left = (scroll.left + win.width/2 - dim.width/2 + offsets.x) + 'px';
    },
    close = function(){
      if (div && div.parentNode) div.parentNode.removeChild(div);
      toggle(embeds, false);
      toggle(objs, false);
      clearInterval(msgInt);
    },
    listenMessage = function(){
      var prefix = 'sharein-'
      var hash = l.href.split('#')[1];
      if (!hash || hash.substring(0, prefix.length) != prefix) return;
      var msg = hash.split('-')[1];
      msgMethods[msg]();
      var url = href.split('#')[0] + '#';
      try{
        l.replace(url);
      } catch(e) {
        l.href = url;
      }
    },
    msgMethods = {
      close: close
    };
    listenMessage();
    var msgInt = setInterval(listenMessage, 25);

    var embeds = $t('embed'),
      objs = $t('object');
    toggle(embeds, true);
    toggle(objs, true);

    var div = d.createElement('div'),
      ifr = d.createElement('iframe'),
      closeButton = d.createElement('span');
    
    var reset = 'display: block !important; visibility: visible !important; border: 0 !important; padding: 0 !important;';
    
    div.style.cssText = reset+'position: absolute !important; z-index: 2147483647 !important; width: '+o.w+'px !important; height: '+o.h+'px !important; background-color: #fff !important;-moz-box-shadow:0 0 10px #666;-webkit-box-shadow:0 0 10px #666;border: 9px solid #000 !important; border-radius: 8px; -moz-border-radius: 8px; -webkit-border-radius: 8px; -ms-border-radius: 8px;';
    div.id='_sharein_bookmarklet';
    
    ifr.style.cssText = reset+'position: static !important; margin: 0 !important; width: '+o.w+'px !important; height: '+o.h+'px !important;';
    ifr.setAttribute('src', u);
    ifr.setAttribute('frameBorder','no');
    ifr.setAttribute('name', '_sharein_bm');

    closeButton.style.cssText = reset+'position: absolute !important; z-index: 2147483647 !important; display:block !important; width:30px !important; color:transparent !important; text-indent: -99em !important; overflow: hidden !important; height:30px !important; background: url(http://'+SHAREIN.domain+'/images/bookmarklet/iff-bookmarklet-sprite.png) no-repeat -113px 0 !important; right: 0 !important; margin: 5px 5px 0 0 !important; top: 0 !important;cursor: pointer !important;';
    closeButton.innerHTML = 'close';

    div.appendChild(closeButton);
    div.appendChild(ifr);
    b.appendChild(div);
    
    w.onscroll = function(){ center(div); };
    w.onresize = function(){ center(div); };
    center(div);
    
    addEvent(d, 'keyup', function(e){
      if (e.keyCode != 27) return;
      close();
    });
    addEvent(closeButton, 'click', close);
  }
})();
