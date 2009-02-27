
function $import(jsFile){
	var e=document.createElement('script');
	 e.setAttribute('type','text/javascript');
	 e.setAttribute('src','http://localhost:3000/javascripts/'+jsFile);
	 document.body.appendChild(e)
}
$import("jquery.js")
function positionDiv(adiv){
	
    var oheight = 11,//($.browser.msie?11:26)
        w=adiv.offsetWidth,
        left=(document.body.offsetWidth-w)/2+'px';
  
  adiv.style.left=left;
	adiv.style.width = w+26
	adiv.style.height = adiv.offsetHeight+oheight;
	
	adiv.style.top = 0.5 * ($.viewport_size()[1] - adiv.offsetHeight) + 140;
	
}
$import("jquery.js")
function center(elem){
    elem.style.left=(document.documentElement.offsetWidth-elem.offsetWidth)/2+'px',
    elem.style.top=(viewport_size()[1]-elem.offsetHeight)*.45+'px'
}

viewport_size = function(){
	var size = [0, 0];
	if (typeof window.innerWidth != 'undefined'){
		size = [window.innerWidth, window.innerHeight];
	}else if (typeof document.documentElement != 'undefined' && typeof document.documentElement.clientWidth != 'undefined' && document.documentElement.clientWidth != 0){
		size = [document.documentElement.clientWidth, document.documentElement.clientHeight];
	}else{
		size = [document.body.clientWidth, document.body.clientHeight];
	}
	return size;
}

////////////////////////////////////////////////////////////////////////////
var kMinImageSize = 30;
var kOutlineColor = "#1030cc";
var kOutlineSize = 3;
var kShadowSize = 7;
var gAvailableImages = [];
function bookmarklet() {
	if (byId("ff__container")) {
		return;
	}
	
	var selection;
	if (window.getSelection) {
		selection = ''+window.getSelection();
	} else if (document.selection) {
		selection = document.selection.createRange().text;
	}
	// Highlight all the images on the page
	var numImages = 0;
	var imageElements = window.ff__reshare ? [] : document.getElementsByTagName("img");
	for (var i = 0; i < imageElements.length; i++) {
		var image = imageElements[i];
		if (image.width < kMinImageSize || image.height < kMinImageSize) {
			continue;
		}
		numImages++;
		var listener = addEventListener(image, "mouseover", curry(onImageMouseOver, image));
		gAvailableImages.push({
			element: image,
			cursor: image.style.cursor,
			listener: listener
		});
	}
	// Create the share dialog in the corner of the window
	var container = div();
	container.id = "ff__container";
	container.style.position = "absolute";
  center(container)
	
	container.style.zIndex = 100000;
	var shadow = div(container);
	shadow.id = "ff__shadow";
	shadow.style.backgroundColor = "black";
	shadow.style.position = "absolute";
	center(container)
	setOpacity(shadow, 0.3);
	var foreground = div(container);
	foreground.id = "ff__foreground";
	foreground.style.backgroundColor = "white";
	foreground.style.zIndex = 2;
	foreground.style.width = "450px";
	foreground.style.height = "220px";
	foreground.innerHTML = '<iframe frameborder="0" id="ff__iframe" style="width:100%;height:100%;border:0px;padding:0px;margin:0px"></iframe>';
	document.body.appendChild(container);
	var msg = {
		title:document.title,
		url:location.href,
		parenturl:location.href
	};
	if (window.ff__reshare) {
		msg = {reshare:"1"};
		window.handleShareMessage = handleMessage;
	}
	msg.selection = selection || '';
	var links = document.getElementsByTagName('link');
	for (var i = 0; i < links.length; i++) {
		if (links[i].rel == 'image_src') {
			msg.image = links[i].href;
		} else if (links[i].rel == 'video_src') {
			msg.video = links[i].href;
		}
	}
	var metas = document.getElementsByTagName('meta');
	for (var i = 0; i < metas.length; i++) {
		if (metas[i].name == 'video_thumb') {
			msg.image = metas[i].content;
		}
	}
	if (location.host == 'www.theonion.com' && typeof(player) != "undefined" && typeof(player.playlist) != "undefined") {
		msg.video = player.playlist;
	}
	if(msg.image && msg.image.indexOf("http://www.comedycentral.com/sitewide/droplets/img_rez.jhtml") != -1) {
		msg.image = "http://www.comedycentral.com" + msg.image.slice(msg.image.indexOf('/', msg.image.indexOf('?')), msg.image.indexOf('&'));
	}
	sendFrameMessage(msg);
	// Make a container for our "click to include" images
	var popupContainer = div();
	popupContainer.id = "ff__popup";
	popupContainer.style.position = "absolute";
	popupContainer.style.display = "none";
	popupContainer.style.left = "0px";
	popupContainer.style.top = "0px";
	popupContainer.style.zIndex = 99999;
	popupContainer.style.fontSize = "8pt";
	popupContainer.style.fontFamily = "Arial";
	popupContainer.style.fontStyle = "normal";
	popupContainer.style.fontWeight = "normal";
	popupContainer.style.background = "transparent";
	document.body.appendChild(popupContainer);
	// Size the shadow as the DIV changes
	var lastShadowWidth = 0;
	var lastShadowHeight = 0;
	function resizeShadow() {
		var shadow = byId("ff__shadow");
		var foreground = byId("ff__foreground");
		if (!shadow || !foreground) {
			clearInterval(interval);
			return;
		}
		if (lastShadowWidth != foreground.offsetWidth || lastShadowHeight != foreground.offsetHeight) {
			lastShadowWidth = foreground.offsetWidth;
			lastShadowHeight = foreground.offsetHeight;
			shadow.style.width = (lastShadowWidth + kShadowSize) + "px";
			shadow.style.height = (lastShadowHeight + kShadowSize) + "px";
		}
	}
	var interval = window.setInterval(function() {
		checkForFrameMessage();
		resizeShadow();
	}, 50);
	resizeShadow();
	window.onscroll = function() {
		container.style.top = scrollPos().y + "px";
	};
}
function onImageMouseOver(image, e) {
	var popupContainer = byId("ff__popup");
	popupContainer.style.display = "none";
	clearNode(popupContainer);
	var clickTarget = div(popupContainer);
	clickTarget.style.position = "absolute";
	var offset = getOffset(image);
	clickTarget.style.left = (offset.left - kOutlineSize + 1) + "px";
	clickTarget.style.top = (offset.top - kOutlineSize + 1) + "px";
	clickTarget.style.width = image.width + "px";
	clickTarget.style.height = image.height + "px";
	clickTarget.style.border = kOutlineSize + "px solid " + kOutlineColor;
	clickTarget.style.cursor = "pointer";
	clickTarget.innerHTML = '<div style="margin:0;padding:0;width:100%;height:100%;position:relative;z-index:1;background-color:white;filter:alpha(opacity=1);opacity: 0.01"></div><div style="margin:0;position:absolute;top:0;left:0;background-color:white;padding:3px;color:#1030cc;border: 1px solid #1030cc;border-width: 0px 1px 1px 0px;z-index:2">' + '在FriendFeed上共享图像' + '</div>';
	addEventListener(clickTarget, "click", curry(onImageClick, image));
	addEventListener(clickTarget, "mouseout", onHoverMouseOut);
	popupContainer.style.display = "";
	cancelEvent(e);
}
function onHoverMouseOut(e) {
	var popupContainer = byId("ff__popup");
	if (!popupContainer) return;
	for (var n = e.toElement || e.relatedTarget; n; n = n.parentNode)
		if (n == popupContainer) return; // moused over child
	clearNode(popupContainer);
	popupContainer.style.display = "none";
	cancelEvent(e);
}
function onImageClick(image, e) {
	cancelEvent(e);
	// work around flickr photos with notes
	if(image.src == "http://l.yimg.com/g/images/spaceball.gif")
	image = image.previousSibling;
	sendFrameMessage({image:image.src, w:image.width, h:image.height});
}
function addEventListener(instance, eventName, listener) {
	var listenerFn = listener;
	if (instance.addEventListener) {
		instance.addEventListener(eventName, listenerFn, false);
	} else if (instance.attachEvent) {
		listenerFn = function() {
			listener(window.event);
		}
		instance.attachEvent("on" + eventName, listenerFn);
	} else {
		throw new Error("Event registration not supported");
	}
	return {
		instance: instance,
		name: eventName,
		listener: listenerFn
	};
}
function removeEventListener(event) {
	var instance = event.instance;
	if (instance.removeEventListener) {
		instance.removeEventListener(event.name, event.listener, false);
	} else if (instance.detachEvent) {
		instance.detachEvent("on" + event.name, event.listener);
	}
}
function cancelEvent(e) {
	if (!e) e = window.event;
	if (e.preventDefault) {
		e.preventDefault();
	} else {
		e.returnValue = false;
	}
}
function scrollPos() {
	if (self.pageYOffset !== undefined) {
	return {
		x: self.pageXOffset,
		y: self.pageYOffset
	 };
	}
	var d = document.documentElement;
	return {
		x: d.scrollLeft,
		y: d.scrollTop
	};
}
function setScrollPos(pos) {
	var e = document.documentElement, b = document.body;
	e.scrollLeft = b.scrollLeft = pos.x;
	e.scrollTop = b.scrollTop = pos.y;
}
function getOffset(obj) {
	var curleft = 0;
	var curtop = 0;
	if (obj.offsetParent) {
		curleft = obj.offsetLeft;
		curtop = obj.offsetTop;
		while (obj = obj.offsetParent) {
			curleft += obj.offsetLeft;
			curtop += obj.offsetTop;
		}
	}
	return {
		left: curleft,
		top: curtop
	};
}
function clearNode(node) {
	while (node.firstChild) {
	node.removeChild(node.firstChild);
	}
}
function removeNode(node) {
	if (node && node.parentNode) {
	node.parentNode.removeChild(node);
	}
}
function div(opt_parent) {
	var e = document.createElement("div");
	e.style.padding = "0";
	e.style.margin = "0";
	e.style.border = "0";
	e.style.position = "relative";
	if (opt_parent) {
	opt_parent.appendChild(e);
	}
	return e;
}
function curry(method) {
	var curried = [];
	for (var i = 1; i < arguments.length; i++) {
		curried.push(arguments[i]);
	}
	return function() {
		var args = [];
		for (var i = 0; i < curried.length; i++) {
			args.push(curried[i]);
		}
		for (var i = 0; i < arguments.length; i++) {
			args.push(arguments[i]);
		}
		return method.apply(null, args);
	}
}

function byId(id) {
	return document.getElementById(id);
}

function setOpacity(element, opacity) {
	if (navigator.userAgent.indexOf("MSIE") != -1) {
	var normalized = Math.round(opacity * 100);
	element.style.filter = "alpha(opacity=" + normalized + ")";
	} else {
	element.style.opacity = opacity;
	}
}

function sendFrameMessage(m) {
	var p = "";
	for (var i in m) {
		if (!m.hasOwnProperty(i))
			continue;
		p += (p.length ? '&' : '');
		p += encodeURIComponent(i) + '=' + encodeURIComponent(m[i]);
	}
	var iframe;
	if (navigator.userAgent.indexOf("Safari") != -1) {
		iframe = frames["ff__iframe"];
	} else {
		iframe = byId("ff__iframe").contentWindow;
	}
	if (!iframe) return;
	var url = window.ff__reshare ? "" : 'https://friendfeed.com';
	url += '/share/bookmarklet/frame#' + p;
	try {
		iframe.location.replace(url);
	} catch (e) {
		iframe.location = url; // safari
	}
}

var gCurScroll = scrollPos();

function checkForFrameMessage() {
	var prefix = "FFSHARE-";
	var hash = location.href.split('#')[1]; // location.hash is decoded
	if (!hash || hash.substring(0, prefix.length) != prefix) {
		gCurScroll = scrollPos(); // save pos
		return;
	}
	location.replace(location.href.split("#")[0] + "#");
	handleMessage(hash)
	var pos = gCurScroll;
	setScrollPos(pos);
	setTimeout(function() { setScrollPos(pos); }, 10);
}

function handleMessage(msg) {
	msg = msg.split('-');
	for (var i = 0; i < msg.length; i++)
		msg[i] = decodeURIComponent(msg[i]);
	switch (msg[1]) {
		case 'close':
			close(msg.slice(2));
			break;
		case 'frameh':
			byId("ff__foreground").style.height = msg[2] + "px";
			break;
	}
}

function close(args) {
	if(window["ff_reshare"]) {
		delete window["ff__reshare"];
  }
	window.onscroll = null; // TODO!
	for (var i = 0; i < gAvailableImages.length; i++)
	removeEventListener(gAvailableImages[i].listener);
	removeNode(byId("ff__popup"));
	function removeContainer() {
		removeNode(byId("ff__container"));
		return false;
	}
	if (!args || !args.length) {
		removeContainer();
		return;
	}
	var message = args[0].replace('<a ', '<a style="font-weight:bold;color:#1030cc" ');
	var foreground = byId("ff__foreground");
	clearNode(foreground);
	foreground.style.color = "black";
	foreground.style.padding = "4px 10px 4px 4px";
	foreground.style.font = "10pt Arial, sans-serif"
	foreground.style.fontStyle = "normal";
	foreground.style.fontWeight = "normal";
	foreground.style.width = "";
	foreground.style.height = "";
	foreground.innerHTML = '<img style="width:16px;height:16px;margin-bottom:-3px;margin-right:1px" 	src="http://friendfeed.com/static/images/icons/internal.png?v=e471e9afdf04ae568dcbddb5584fc6c0"> ' + message + ' <a href="#" id="ff__close" style="margin-left:1em;color:#1030cc">' + '关闭' + '</a>';
	byId("ff__close").onclick = removeContainer;
	setTimeout(removeContainer, 3500);
}
if (document.getElementsByTagName('head').length == 0 || frames.length > document.getElementsByTagName('iframe').length) {
	window.location.href = 'http://friendfeed.com/?link=' + escape(window.location.href);
} else {
	bookmarklet();
}

