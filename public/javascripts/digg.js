var DialogError=Error;
$j.extend(DialogError.prototype,{
  toDialog:function(){
    return $j('<div class="dialog"><div class="body"><div class="content"><h3>ERROR:</h3><p class="first">'+this.message+'</p></div></div><div class="foot"><a class="close" href="#">close</a></div></div>')
  }  
});

var Dialog=function(E,A,C,B){
  this.enableLog=false;
  try{
    this.init(E,A,C,B)
  }
  catch(F){
    this.log(F)
  }
};

$j.extend(Dialog.prototype,{
  init:function(E,A,C,B){
    this.el=$j(E);
    this.mount=A;
    this.autoTrigger=C||false;
    this.content=null;
    this.cbs={
    };
    this.attachCallbacks(B);
    if(this.autoTrigger){
      this.trigger()
    }
  }
  ,attachCallbacks:function(A){
    var C=["onTrigger","onShow","onPreShow","onPost","onPostComplete","onCancel"],B=function(){
      return true
    };
    this.cbs.onCancel=function(){
      this.hide()
    };
    var E=this;
    $j.each(C,function(){
      E.cbs[this]=A[this]?A[this]:B
    }
    )
  }
  ,trigger:function(){
    try{
      if(this.cbs.onTrigger()){
        this.fetch()
      }
      else{
        throw new DialogError("Dialog failed to trigger")
      }
    }
    catch(A){
      this.error(A)
    }
  }
  ,fetch:function(){
    if(!this.content){
      var B=$j(this.el).attr("href");
      var A=$j(B);
      try{
        if(A.length>0){
          this.content=A
        }
        else{
          if(B){
            var E=this;
            $j.ajax({
              url:B,async:false,type:"GET",dataType:"html",success:function(F){
                E.content=$j(F);
                if(E.content.length>1){
                  E.content=$j("<div>"+F+"</div>")
                }
                D.currentDialog=E.content
              }
              ,error:function(F){
                if(this.enableLog){
                  throw new DialogError("Something bad happened while looking for dialog at:\n"+B)
                }
                else{
                  alert(F.responseText)
                }
              }
            }
            )
          }
          else{
            throw new DialogError("No can do, I ain't got no content.")
          }
        }
      }
      catch(C){
        this.error(C)
      }
    }
    this.show()
  }
  ,show:function(count){
    var _this=this;
    if(!count){
      count=0
    }
    if(count==20){
      this.mount="BODY"
    }
    var mount=$j(this.mount);
    if(mount.length){
      this.content.hide().insertBefore(mount).hide()
    }
    else{
			setTimeout(function(){_this.show(++count)},100);
		return
		}
		hideDialogs();
		if(this.mount=="#h"){
			var offset=$j(this.el).offset();
			var elheight=(offset)?offset.top:100;
			var st=(elheight-100>0)?elheight-100:0;
			$j(document.documentElement?document.documentElement:document.body).animate({
			  scrollTop:st
			}
			,1250,"swing");
			this.content.css("top",(elheight-50>100)?elheight-50:100)
		}
		$j(".close",this.content).unbind().click(function(evt){
		  _this.hide();
		  _this.cbs.onCancel();
		  evt.preventDefault();
		  analyticsEvent("event12","dialog close")
		});
		var forms=this.content.find("form");
		if(forms.size()>0){
			forms.unbind().submit(function(evt){
			  var form=$j(this);
			  var onPostCheck=_this.cbs.onPost(form);
			  try{
			    if(String(form.attr("action")).length>0&&onPostCheck==true){
			      var data=new Object();
						form.find(":input").each(function(i){
						  if(["button","submit","reset","image"].indexOf($j(this).attr("type"))>-1){
						    return true
						  }
						  var key=$j(this).attr("name")||i;
						  var checkCheck=($j(this).attr("type")=="checkbox"&&$j(this).attr("checked"))?true:false;
						  data[key]=checkCheck?true:$j(this).val();
						  data.token=eval(form.attr("action").substr(1).replace(/\//g,".").replace(/ajax/,"tokens"))
						});
						$j.ajax({
						  url:form.attr("action"),type:"POST",dataType:"json",data:data,success:function(json){
						    _this.cbs.onPostComplete(json)
						  }
						  ,error:function(xml){
						    throw new DialogError("Darn! That dialog post failed:\n"+xml)
						  }
						})
					}//if
				}catch(err){
					_this.error(err)
				}
				if(onPostCheck){
					evt.preventDefault()
				}
			});//submit
			forms.find(".cancel").unbind().click(function(evt){
			  _this.hide();
			  _this.cbs.onCancel();
			  evt.preventDefault()
			})
		}//if(forms.size()>0)
		$j(".msad, .comments_ad_image, .rectangle_ad_unit, .vertical_ad_unit, .hottest_ad_image, .top_ad_image, #wrapper select").css("visibility","hidden");
		$j(".dialog select").css("visibility","visible");
		var __this=this;
		if(!$j.browser.msie){
			__this.content.fadeTo("normal",0.1,function(){
			  _this.cbs.onPreShow();
			  __this.content.show();
			  __this.content.fadeTo("normal",1,function(){
			    _this.cbs.onShow()
			  }
			  )
			})
		}else{
			__this.content.css("opacity",0.01);
			__this.content.show(function(){
			  _this.cbs.onPreShow();
			  __this.content.css("opacity","");
			  _this.cbs.onShow()
			})
		}
	}
	,hide:function(){
		try{
		this.content.hide();
		$j(".msad, .comments_ad_image, .rectangle_ad_unit, .vertical_ad_unit, .hottest_ad_image, .top_ad_image, #wrapper select").css("visibility","visible")
		}
		catch(A){
		}
	}
	,error:function(A){
		if(!this.el.is(":visible")){
			this.content=A.toDialog();
			this.show()
		}
		else{
			this.content.find(".error").text(A).show()
		}
	}
	,log:function(A){
		if(this.enableLog&&console){
			console.log(A)
		}
	}
});//$j.extend(Dialog.prototype,
	
var dialogs={};
function buildDialogs(C,A,B,F){
  try{
    C=C||".dialog-anchor";
    A=A||"#h";
    B=B||false;
    F=F||{};
		$j(C).each(function(){
		  var G=$j(this).attr("id");
		  G=(G!="")?G:"d"+Math.floor(Math.random()*200+1);
		  if(!dialogs[G]){
		    dialogs[G]=new Dialog(this,A,B,F)
		  }
		  else{
		    dialogs[G].attachCallbacks(F);
		    dialogs[G].trigger()
		  }
		}
		)
	}
	catch(E){
		if(console&&console.log){
		  	console.log("Dialog Error: "+E)
		}
	}
}//buildDialogs
function submitWithrocessing(){
  if($j("#submit_button").length*$j(".button-processing")==0){
  	return
  }  
	$j(document).ready(function(){
		$j("#submit_button").click(function(){
			$j(this).hide();
			$j(".button-processing").show();
			return true
		});
});
}
function findDialog(A){
  return dialogs[A]?dialogs[A]:false
}

function hideDialogs(){
  $j.each(dialogs,function(A,B){
    B.hide()
  })
};

var countdownTimer=new Object();
var commentshowreply=new Object();

[].indexOf||(Array.prototype.indexOf=function(B,E){
  E=(E==null)?0:E;
  var A=this.length;
  for(var C=E;C<A;C++){
    if(this[C]==B){
      return C
    }
  }
  return -1
});

Function.prototype.bind=function(){
  var A=this,C=arguments[0],B=[];
  for(i=1;i<arguments.length;i++){
    B.push(arguments[i])
  }
	return function(){
	  return A.apply(C,B)
	}
};

var D=Class.create(true);
D.namespace({
	meta:{
	  page:{
	    number:0,type:"other"
	  }
	  ,user:{
	    loggedIn:false
	  }
	  ,iHopeYouLikeText:function(){
	    document.location="http://www.penny-arcade.com/comic/2006/04/10/"
	  }
	}
});

D.namespace("story");
D.story.namespace({
	bury:{
	  toggle:function(A){
	    $j(A.target).siblings(".bury-opt").toggle()
	  }
	  ,hover:function(C){
	    var B=$j(C.target);
	    if(B.children(".bury-opt").is(":hidden")){
	      var A=C.type=="mouseenter"?"show":"hide";
	      B.children(".bury-toggle")[A]()
	    }
	  }
	  ,hideMenus:function(){
	    $j(".bury-toggle, .bury-opt").hide()
	  }
	  ,reports:[],post:function(e){
	    var code=16;
	    var el=$j(e.target);
	    if(el.hasClass("bury-reason")){
	      code=el.attr("id").match(/_(\d+)/)[1];
	      el=el.parents(".bury").find(".bury-link")
	    }
	    var id=el.attr("id").match(/_(\d+)/)[1];
	    var row=el.parent().attr("id").match(/_(\d+)/)[1];
	    if(this.reports[row]){
	      return
	    }
	    this.reports[row]=1;
	    $j.ajax({
	      url:"/ajax/report/store",type:"post",dataType:"text",data:{
	        id:id,code:code,token:tokens.report.store
	      }
	      ,success:function(text){
	        $j("#enclosure"+row).addClass("news-buried");
	        $j("#diglink"+row).attr("class","buried-it").html("<span>buried</span>");
	        $j("#burymenum, #burymenul").hide();
	        analyticsEvent("event15","bury")
	      }
	      ,error:function(xml){
	        var json=eval("("+xml.responseText+")");
	        alert(json.message)
	      }
	    }
	    )
	  }
	}//bury
});//D.story.namespace

D.namespace({
	captcha:{
	  show:function(){
	    var A=$j("#commentcaptcha");
	    A.attr("onclick",null).show();
	    if(A.html().length==0){
	      $j("#submitbutton").attr("disabled","disabled");
	      $j.ajax({
	        url:"/ajax/captcha/get",type:"post",dataType:"json",data:{
	          token:$j("#token").val(),tpl:"none"
	        }
	        ,success:function(B){
	          $j("#commentcaptcha").html(B.data);
	          $j("#submitbutton").removeAttr("disabled")
	        }
	      }
	      )
	    }
	  }
	  ,playAudio:function(A){
	    if(jQuery.browser.msie){
	      var B='<object classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95" type="audio/x-mpeg" data="'+A+'" height="0" width="0"><param name="FileName" value="'+A+'" /><param name="AutoStart" value="true"></object>'
	    }
	    else{
	      var B='<object type="audio/x-mpeg" data="'+A+'" height="0" width="0"><param name="src" value="'+A+'" /><param name="autostart" value="true" /><param name="controls" value="false" /><param name="loop" value="false" /></object>'
	    }
	    $j("#playAudio").html(B);
	    return false
	  }
	  ,generateAudio:function(A){
	    $j("#playAudio").css("position","absolute");
	    if(jQuery.browser.msie){
	      var B='<object classid="clsid:22D6F312-B0F6-11D0-94AB-0080C74C7E95" type="audio/x-mpeg" data="'+A+'" height="0" width="0"><param name="FileName" value="'+A+'" /><param name="AutoStart" value="true"></object>'
	    }
	    else{
	      var B='<object type="audio/x-mpeg" data="'+A+'" height="0" width="0"><param name="src" value="'+A+'" /><param name="autostart" value="true" /><param name="controls" value="false" /><param name="loop" value="false" /></object>'
	    }
	    $j("#playAudio").html(B);
	    $j("#audiocaptchalink").innerHTML='Can\'t read the text? <a href="#" onclick="return D.captcha.playAudio(\''+A+"');\">Listen to it</a>";
	    return false
	  }
	}//captcha
});

D.namespace({
	form:{
	  limitChars:function(C,B,A){
	    if(B.constructor==Number){
	      A=B;
	      B=false
	    }
	    if($j(C).val().length>A){
	      $j(C).val($j(C).val().substring(0,A))
	    }
	    if(B){
	      $j(B).text(A-$j(C).val().length)
	    }
	  }
	}//form
});

D.namespace({
	auth:{
	  doLogin:function(){
	    jspost("/login",{
	      returnpage:window.location.pathname
	    }
	    );
	    return false
	  }
	  ,doLogout:function(A,B){
	    jspost("/logout",{
	      logout_check:A,returnpage:B
	    }
	    );
	    return false
	  }
	  ,toggleLogin:function(){
	    if($j("#login-form").css("display")=="none"){
	      $j(".side-header").css("display","none");
				$j("#login-form").fadeIn(function(){$j("#side-username").focus()})
			}else{
				$j("#login-form").fadeOut(function(){$j(".side-header").css("display","block")})
			}
			return false
		}
	}//auth
});

D.namespace("friends");
D.friends.namespace({
	activity:{
		toggle:function(){
			if($j("#submenu-friends").css("display")=="none"){
				clearMenus();
				$j("#submenu-friends").css("display","block");
				$j("#friends-alink").addClass("current")
			}
			else{
				$j("#submenu-friends").css("display","none");
				$j("#friends-alink").removeClass("current")
			}
			return false
		}
		,init:function(){
			if(typeof friendsjson!="undefined"&&friendsjson.constructor==Object){
				var B="/users/"+friendsjson.name+"/friends";
				var A="";
				$j.each(friendsjson.activity,function(C){
				  A+='<li><a href="'+B+"/"+this.key+'"><em>'+this.value+"</em> "+C+"</a></li>"
				});
				$j("#submenu-friends-list").html(A);
				$j("#friends-activity").html(""+friendsjson.count)
			}
		}//init
	}//activity
});

D.namespace({
	topTen:{
		get:function(G,F){
			var C={
				type:"json",size:"a",endPoint:G
			};
			var B=F.split("&");
			for(var A=0;A<B.length;A++){
				var E=B[A].split("=");
				if(E[0]&&E[1]){
				  C[E[0]]=E[1]
				}
			}
			$j.ajax({
				url:"/services",type:"post",dataType:"json",data:C,success:function(H){
				  D.topTen.update(H)
				}
			});
			return false
		}
	,update:function(F,B,J,C,L){
		var B=B||8;
		var J=J||"toptenlist";
		var H=$j("#"+J);
		var C=C||"topten-list";
		var K=$j("#"+C);
		var L=L||"Currently, there are not enough recent stories of this type on Digg to generate a list.";
		K.html("");
		if(!F){
			K.html("We were unable to retrieve matching stories from Digg. Please refresh the page to try again.");
			return false
		}
		if(!F.stories||F.stories.length<B){
			K.html(L);
			return false
		}
		if(H){
			H.css("display","block")
		}
		ttaddhtml="";
		for(var G=0;G<F.stories.length;G++){
			if(F.stories[G].diggs>10000){
			  F.stories[G].diggs=Math.floor(F.stories[G].diggs/1000)+"K+"
			}
			var I="";
			var A="";
			if(typeof (F.stories[G].friends)=="object"){
			  A='<img src="/img/digg-friend-s.png" width="15" height="15" alt="A Friend Dugg This Post" />';
			  I="<h6>Friends who dugg this</h6>";
			  for(var E=0;(E<F.stories[G].friends.users.length&&E<4);E++){
			    var I=I+"<img src=\\'"+F.stories[G].friends.users[E].icon+"\\'/> "+F.stories[G].friends.users[E].name+"<br/>"
			  }
			  if(I!=""){
			    I="onmouseover=\"Tip('"+I+"')\""
			  }
			}
			thumb="";
			thumbclass="";
			thumburl="";
			if(F.stories[G].thumbnail){
			  thumburl=F.stories[G].thumbnail.src;
			  if(F.stories[G].media=="news"){
			    thumbclass=" news-thumb";
			    thumb=' <span><em style="background-image: url('+thumburl+')">thumb</em></span>'
			  }
			}
			if(F.stories[G].media=="videos"){
			  thumb=" <span><em"+((thumburl.length>0)?' style="background-image: url('+thumburl+')"':"")+">thumb</em></span>";
			  thumbclass=" vid-thumb"
			}
			else{
			  if(F.stories[G].media=="images"){
			    thumb=" <span><em"+((thumburl.length>0)?' style="background-image: url('+thumburl+')"':"")+">thumb</em></span>";
			    thumbclass=" img-thumb"
			  }
			}
			ttaddhtml=ttaddhtml+'<div class="news-summary'+thumbclass+'"><h3><a href="'+F.stories[G].href+'">'+F.stories[G].title+thumb+'</a></h3><ul class="news-digg"><li class="digg-count"><a href="'+F.stories[G].href+'" '+I+"><strong>"+F.stories[G].diggs+"</strong>"+A+"</a></li></ul></div>"
		}//for
		$j("#"+C).append(ttaddhtml)
	}//~update
	}//~topTen
});

D.namespace({
	userNotify:function(B,A){
		var C=$j("#userNotify");
		if(C.attr("timer")){
			clearTimeout(C.attr("timer"));
			C.removeAttr("timer")
		}
		C.hide().html(B).fadeIn(function(){
		  if(typeof A=="undefined"){
		    A=10000
		  }
		  if(A){
				var E=setTimeout(function(){C.fadeOut()},A);
				C.attr("timer",E)
			}
		})
	}//~userNotify
	,userToaster:function(E,C){
		var A=$j("#toasterBox");
		if(A.length==0){
		A=$j('<div id="toasterBox" style="position: fixed; right: 0px; bottom: 0px; width: 650px;" ></div>').appendTo("body");
		if($j.browser.msie){
		A.css("position","absolute")
		}
		}
		var B=$j('<div style="padding: 10px;">'+E+"</div>");
		B.hide();
		A.append(B);
		B.fadeIn(function(){
		  if(typeof C=="undefined"){
		    C=10000
		  }
		  if(C){
				setTimeout(function(){B.fadeOut()},C)
			}
		})//~fadeIn
	}//~userToaster
});

function unpopp(){
  poppDiv=$j("#poppDiv");
  if(poppDiv){
    poppDiv.remove();
    poppDiv=false
  }
}

function popp(E,B,A){
  var C=$j(A);
  C.attr("href","/login/dialog?title="+B);
  C.attr("id","dialog"+E);
  buildDialogs(C,null,true,{
    onPost:function(F){
      return false
    }
    ,onPreShow:function(){
      if(B=="digg"){
        B="Digg"
      }
      $j(".dialogVerb").text(B);
      $j(document).trigger("loginFormLoaded",null);
      $j(document).trigger("registerFormLoaded",null)
    }
  }
  );
  return false
}

function popr(C,B){
  if($j("#lbContent")){
    valid.deactivate()
  }
  unpopp();
  var A=$j("#enclosure"+C);
  A.html(A.html()+'<div id="poppDiv" class="inline-warning"><div><p><strong>Make your vote count!</strong> To '+B+', <a href="/remote-login">login</a> or <a href="/remote-register">join Digg</a> for free.</p><a href="javascript:unpopp()"><img src="/img/close.gif" class="close" width="22" height="22" alt="Close" /></a></div></div>');
  analyticsEvent("event12","login lightbox");
  return(false)
}

function poppd(C,A){
  var B='{ "userMessage" : "Thanks for logging in. Look! We just dugg that story for you. Automagically!", "action" : function() { eval($j("#'+$j("#diglink"+C+" a").attr("id")+'").attr("href")); } }';
  D.StoredAction.store("digg","you are logged in",B);
  return(popp(C,"digg",A))
}

function poppdr(A){
  return(popr(A,"digg"))
}

function poppe(B,A){
  return(popp(B,"email",A))
}

function poppr(C,A){
  var B='{ "userMessage" : "Thanks for logging in. Look! We just buried that story for you. Automagically!", "action" : function() { $j("#'+$j("#bury-tool_"+C+" a").attr("id")+'").click(); } }';
  D.StoredAction.store("bury","you are logged in",B);
  return(popp(C,"bury",A))
}

function poppb(B,A){
  return(popp(B,"blog",A))
}

function popps(E,A,B){
  var C='{ "userMessage" : "Thanks for logging in. Now, weren\\\'t you just about to share something?", "action" : function() { $j(".share'+A+'").click(); } }';
  D.StoredAction.store("share","you are logged in",C);
  return(popp(E,"share",B))
}

function poppf(B,A){
  return(popp(B,"add friends",A))
}

function topsearch(){
  $j("#top-submit").attr("disabled","true");
  return true
}
var digging=-9;

function dig(row,item){
  var html=$j("#diglink"+row+",lightbox-digg-it").html();
  $j("#diglink"+row+",lightbox-digg-it").html('<a href="javascript:void(0)">digg it</a>');
  $j("#lightbox-diggs").animate({
    opacity:0
  }
  );
  $j("#diggs-strong-"+row).animate({
    opacity:0
  }
  ,function(){
    $j.ajax({
      url:"/ajax/digg/perform",type:"POST",dataType:"json",data:{
        token:tokens.digg.perform,itemid:item,location:D.meta.page.type
      }
      ,success:function(json){
        if(json.success==true){
          $j("#bury-tool_"+row).css("display","none");
          $j("#burymenul").css("display","none");
          $j("#burymenum").css("display","none");
          if(json.count==2){
            $j("#diggs"+row).html($j("#diggs"+row).html().replace(/\bdigg\b/,"diggs"))
          }
          $j("#diggs-strong-"+row+",#lightbox-diggs").text(json.count);
          $j("#diglink"+row+",#lightbox-digg-it").attr("class","dugg-it").html("<span>dugg!</span>");
          $j("#fave"+row).css("display","block");
          $j("#favmenul").css("display","block");
          $j("#favmenum").css("display","block");
          analyticsEvent("event14","digg");
          $j("#diggs-strong-"+row+",#lightbox-diggs").animate({
            opacity:100
          }
          )
        }
      }
      ,error:function(xml){
        $j("#lightbox-diggs").animate({
          opacity:100
        }
        );
        $j("#diggs-strong-"+row).animate({
          opacity:100
        }
        );
        $j("#diglink"+row+",lightbox-digg-it").html(html);
        var json=eval("("+xml.responseText+")");
        alert(json.message)
      }
    }
    )
  }
  )
}

function getdpage(C,B,A){
  $j.ajax({
    url:window.location.pathname,type:"post",dataType:"html",data:{
      getdpage:1,id:C,page:B,friends:A
    }
    ,success:function(E){
      $j("#diggers").html(E)
    }
  }
  );
  return false
}

function dismiss(C,A,B){
  $j.cookie("dismiss-"+A,B,{
    expires:365,path:"/"
  }
  );
  $j("#"+C).css("display","none");
  return false
}

function fave(story,which,check){
  $j.ajax({
    url:"/ajax/favorites/fave",type:"post",dataType:"json",data:{
      token:check,item:story
    }
    ,success:function(json){
      $j("a .tool .faved").removeAttr("onclick").attr("class","tool fave");
      $j("#fave"+which).attr("class","tool faved").removeAttr("onclick").attr("href",mydiffref+"/history/favorites").html("Favorite!");
      analyticsEvent("event17","favorite")
    }
    ,error:function(xml){
      var json=eval("("+xml.responseText+")");
      alert(json.message)
    }
  }
  );
  return false
}

function unfave(B,A){
  analyticsEvent("event12","unfavorite");
  jspost("/unfave",{
    item:B,check:A
  }
  );
  return false
}

allowpost=true;

function jspost(A,C){
  if(allowpost){
    allowpost=false;
    var B='<form id="newpost" action="'+A+'" method="post">';
    for(v in C){
      B+='<input type="hidden" name="'+v+'" value="'+C[v]+'" />'
    }
    B+="</form>";
    $j("#container").append(B);
    $j("#newpost").submit()
  }
}

function phpads_deliverActiveX(A){
  document.write(A)
}

function gotoLink(B,A){
  $j.ajax({
    url:"/ajax/useritemviews/store",type:"post",dataType:"json",data:{
      token:A,l:B
    }
  }
  );
  return true
}

function toggleCatDrop(B){
  var A=$j("#catdrop"+B);
  if(A.css("display")=="none"){
    A.css("display","block")
  }
  else{
    A.css("display","none")
  }
  return false
}

function clearMenus(){
  $j(".menu").hide();
  $j("#friends-alink").removeClass("current")
}

function handleHover(){
  $j("body").bind("click",function(B){
    var A=$j(B.target).data("events");
    if(typeof A!="undefined"&&typeof A.click!="undefined"){
      for(i in A.click){
        if(A.click[i].type&&A.click[i].type=="menu"){
          return false
        }
      }
    }
    clearMenus()
  });
	$j(".catdrop").click(function(){
	  var A=$j(this).parents("li.h-drop").children(".catdropm");
	  A.toggle();
	  $j(".catdropm:visible, #submenu-friends").not(A).hide();
	  $j("#friends-alink, .h-drop").removeClass("current");
	  return false
	});
	catTimeouts={};
	$j(".catdrop").bind("mouseleave",function(){
	  var A=$j(this).attr("id");
		catTimeouts[A]=setTimeout(function(){
		  $j(".catdropm").hide();
		  $j(".h-drop > a").blur()
		},500)
	});
	$j(".catdropm").bind("mouseenter",function(){
	var A=$j(this).parents("li.h-drop").find(".catdrop").attr("id");
	clearTimeout(catTimeouts[A])
	});
	$j(".catdropm").bind("mouseleave",function(){
		$j(this).hide();
		$j(".h-drop > a").blur()
	})
}

function reportGalleryPhoto(A){
  $j.ajax({
    url:"/ajax/gallery/report",type:"POST",data:{
      photoId:A,token:tokens.gallery.report
    }
    ,success:function(B){
      $j(".side-remove").html('<a name="reported">You Reported This Image</a>')
    }
    ,error:function(B){
      alert("Sorry, we couldn't save your report. Please try again.")
    }
  }
  )
}

$j(document).ready(function(){
  var B=new Array();
  
	$j(".promo").each(function(){
	  var C=this.id;
		$j(this).find("a").each(function(){
		  var E="";
		  if(E=$j(this).find("img").attr("src")){
		    E=E.replace(/^.*?([a-z0-9_-]+)\..*$/i,"$1");
		    E=E.replace(/[^a-z0-9]/gi,"");
		    E="IMG"+E
		  }else{
		    E=$j(this).text();
		    E=E.replace(/[^a-z0-9]/gi,"")
		  }
		  E=";"+C+"_"+E;
		  B.push(E);
		  $j(this).bind("click",function(){
		    analyticsPromoClick(E)
		  })
		})
	});
	
	if(B.length&&D.analytics.enabled){
		var A=s_gi(s_account);
		A.linkTrackVars="products,events";
		A.linkTrackEvents="event13";
		A.events="event13";
		A.products=B.join(",");
		A.visitorSampling=5;
		A.visitorSamplingGroup="1";
		A.tl(true,"o","Promo Impressions");
		delete A.visitorSampling;
		delete A.visitorSamplingGroup
	}
});

$j(document).ready(function(){
  if(typeof msAnalytics!="undefined"){
	$j(".offsite").each(function(){
	  $j(this).bind("click",function(){
	    if(rgx=$j(this).attr("class").match(/[ ]ct-([^ ]+)/)){
	      msAnalytics.TrackLink($j(this).attr("href"),LinkType.Outbound,rgx[1])
	    }
	    return true
	  })
	})
	}
});

$j.IEevent=function(A){
	if(!$j.browser.msie){
		A()
	}
	else{
		$j(document).ready(function(){A()})
	}
};

$j(document).bind("loginLoaded",null,function(){
	var A=/^(\/login|\/register)/.exec(window.location.pathname);
	if(!A){
	$j(".header-login").attr("href","/login/dialog").click(function(){
	  var B=$j.cookie("last_auth_method");
	  if(B==null||B=="register"){
	    $j.cookie("last_auth_method","digg",{
	      path:"/"
	    }
	    )
	  }
	  var C=$j(this);
	$j.IEevent(function(){
	  buildDialogs(C,null,true,{
	    onPost:function(E){
	      return false
	    }
	    ,onPreShow:function(){
	      $j(document).trigger("loginFormLoaded",null);
	      $j(document).trigger("registerFormLoaded",null)
	    }
	    ,onTrigger:function(){
	      C.fadeOut();
	      return true
	    }
	    ,onCancel:function(){
	      C.fadeIn()
	    }
	  }
	  )
	}
	);
	return false
	}
	)
	}
	$j(".header-disconnect").click(function(){
	  var B=$j(this);
	  B.attr("href","/register/disconnectDialog");
	  B.attr("id","dialogDisconnect");
	  buildDialogs(B,"#wrapper",true,null);
	  return false
	}
	)
});

$j(document).ready(function(){
  if(D.meta.user.loggedIn){
		$j(".bury .bury-link").click(function(A){
		  D.story.bury.post(A)
		}
		);
		$j(".bury .bury-toggle").bind("click.menu",function(A){
		  D.story.bury.toggle(A)
		}
		);
		$j(".bury").hover(function(A){
		  D.story.bury.hover(A)
		}
		,function(A){
		  D.story.bury.hover(A)
		}
		);
		$j(".bury .bury-reason").click(function(A){
		  D.story.bury.post(A)
		}
		);
		D.friends.activity.init();
		$j("#friends-alink").bind("click.menu",function(A){
		  D.friends.activity.toggle()
		}
		);
		$j("#friends-activity").bind("click.menu",function(){
		}
		)
	}else{
		$j(".bury .bury-link").click(function(A){
		  var B=$j(A.target).parent().attr("id").match(/_(\d+)/)[1];
		  return poppr(B,this)
		})
	}
	if(!D.meta.user.loggedIn){
		$j(".customize-login").click(function(){
		  D.StoredAction.setReturnPage("/settings/topics");
		  this.href="/login/dialog?title=settings";
		  buildDialogs(this,null,true,{
		    onPost:function(A){
		      return false
		    }
		    ,onPreShow:function(){
		      $j(document).trigger("loginFormLoaded",null);
		      $j(document).trigger("registerFormLoaded",null)
		    }
		  }
		  );
		  return false
		}
		);
		$j("#c-menu-hide, #c-menu-settings").click(function(){
		  D.StoredAction.setReturnPage("/settings/viewing");
		  this.href="/login/dialog?title=settings";
		  buildDialogs(this,null,true,{
		    onPost:function(A){
		      return false
		    }
		    ,onPreShow:function(){
		      $j(document).trigger("loginFormLoaded",null);
		      $j(document).trigger("registerFormLoaded",null)
		    }
		  }
		  );
		  return false
		}
		)
	}
});

function sendShout(data,callback,error){
  $j.ajax({
    type:"POST",url:"/ajax/shouts/post",dataType:"json",data:data,success:function(json){
      if(typeof (callback)=="function"){
        return callback(json)
      }
      analyticsEvent("event16","shout")
    }
    ,error:function(xml){
      var json=eval("("+xml.responseText+")");
      if(typeof (error)=="function"){
        return error(json)
      }
      else{
        alert((json.error)?json.error:json.message)
      }
    }
  }
  );
  return false
}

function remShout(data,callback){
  $j.ajax({
    type:"POST",url:"/ajax/shouts/remove",dataType:"json",data:data,success:function(json){
      if(typeof (callback)=="function"){
        return callback(json)
      }
      analyticsEvent("event12","remove shout")
    }
    ,error:function(xml){
      var json=eval("("+xml.responseText+")");
      alert((json.error)?json.error:json.message)
    }
  }
  )
};

UserPrefixSearch=Class.create({
  init:function(C,A,B){
    this.jfield=$j("#"+C);
    this.limit=500;
    this.callback=B.success||function(){};
    this.errorFunc=B.error||function(){};
    this.change=false;
    this.updater=false;
    this.prefix="";
    this.oldValue=false;
    if($j.browser.safari&&Number($j.browser.version)<500){
      this.limit=30
    }
    var D=this;
		this.getMutualFriendCount(function(E){
		  D.jfield.bind("keyup",function(G){
		    clearTimeout(D.change);
		    D.prefix=D.jfield.val();
		    if(E<D.limit||D.prefix.length>0){
		      var F=D.prefix.length>0?500:1000;
		      if(D.prefix!=D.oldValue){
		        D.change=setTimeout(D.search.bind(D),F)
		      }
		    }
		    else{
		      if(E>this.limit&&D.prefix.length==0){
		        D.errorFunc.apply(D,[{
		          title:"Crikey!",message:"You have lots of friends! Type below to filter them down a bit."
		        }
		        ]);
		        if(D.prefix!=D.oldValue){
		          D.change=setTimeout(D.search.bind(D),F)
		        }
		      }
		      else{
		        D.errorFunc.apply(D,[{
		          message:"We didn't really like your input. Please try again."
		        }
		        ])
		      }
		    }
		    D.oldValue=D.prefix
		  });
		  if(E>D.limit){
		    D.errorFunc.apply(D,[{
		      title:"Crikey!",message:"You have lots of friends! Type below to filter them down a bit."
		    }
		    ])
		  }
		  D.search()
		})//~getMutualFriendCount
	}//~init
	,search:function(){
		var A=this;
		$j.ajax({
			  url:"/ajax/usersearch/mutual.html",type:"POST",data:{
			    prefix:A.prefix,token:tokens.usersearch.mutual
			  }
			  ,success:function(B){
			    B.length>0?A.callback.apply(A,[B]):A.errorFunc.apply(A,[{
			      title:"Darn!",message:"Your filter had no results. Try being less specific."
			    }])
			  }
			  ,error:function(B){
			    A.errorFunc.apply(A,[{
			      title:"Whoops!",message:"We couldn't fetch your friends. Please reopen this window."
			    }])
			  }
		})
	}//~search
	,getMutualFriendCount:function(B){
		B=B||false;
		var A=this;
		$j.ajax({
		  url:"/ajax/usersearch/mutualCount",type:"POST",dataType:"json",data:{
		    token:tokens.usersearch.mutualCount
		  }
		  ,success:function(C){
		    return B?B.apply(A,[C.mutualFriendCount]):C.mutualFriendCount
		  }
		  ,error:function(C){
		    A.errorFunc.apply(A,[{
		      message:"A pretty bad error occurred. Please reload and try again."
		    }])
		  }
		})
	}
});//~UserPrefixSearch

var Sharebox=Class.create({
	tab:function(A){
		$j("#lightbox-blog-it-tab, #lightbox-email-it-tab, #lightbox-shout-it-tab").removeClass("active");
		$j("#lightbox-"+A+"-tab").addClass("active");
		$j("#lightbox-blog-it, #lightbox-email-it, #lightbox-shout-it, #lightbox-share-notice").hide();
		$j("#lightbox-"+A).show()
	}
	,reCaptcha:function(A){
		var B=$j(A+"-captcha");
		if(B.length==0){
		  return
		}
		B.html('<img src="/img/c-spinner.gif" alt=""/> Loading captcha...');
		$j(A+"-post").attr("disabled","disabled");
		$j.ajax({
		  url:"/ajax/captcha/lightbox.html",async:true,type:"POST",dataType:"html",data:{
		    token:tokens.captcha.lightbox
		  }
		  ,success:function(C){
		    B.html(C);
		    $j(A+"-post").removeAttr("disabled")
		  }
		  ,error:function(C){
		    B.html('<li class="warning">We couldn\'t load a new captcha for you ,Please reload the page.</li>');
		    $j(".warning").show()
		  }
		})//~ajax
	}
},true);

Sharebox.namespace({
	shouts:{
		select:function(B){
		  var A=$j("#friend"+B);
		  if(A.hasClass("selected")){
		    A.removeClass("selected")
		  }
		  else{
		    A.addClass("selected")
		  }
		}
		,toggleAll:function(){
		  var B="addClass",A=$j("#lightbox-shout-friends a");
		  if(A.length==$j(".selected",A).length){
		    B="removeClass"
		  }
		  A[B]("selected");
		  $j("#lightbox-shout-filter").focus()
		}
		,send:function(D){
		  var E=[],B=$j("#lightbox-shout-friends a.selected");
		  if(B.length<1){
		    alert("Please select one or more friends to send this shout to");
		    return false
		  }
		  $j("#sendShout").val("Shouting!").attr("disabled","disabled");
		  var A="",C="";
		  if($j("#lightbox-shout-captcha-text").length){
		    A=$j("#lightbox-shout-captcha-text").val();
		    C=$j("#md5").val()
		  }
			B.each(function(){
			  E.push($j(this).text()!=""?$j(this).text():",")
			});
			sendShout({
			  	token:tokens.shouts.post,to:E.join(","),shout:$j("#lightbox-shout-text").val(),activity:9,activityid:D,captcha:A,md5:C
				},function(F){
				  $j("#lightbox-share-notice").html('<div class="confirm"><div><h3>Success!</h3>Your shout was successfully sent</div></div>').show().fadeTo(3000,1,function(){
				    $j("#lightbox-share-notice").fadeOut(3000)
				  }
				  );
				  $j("#lightbox-shout-filter").val("");
				  $j("#lightbox-shout-text").val("");
				  $j("#sendShout").removeAttr("disabled").val("Shout It!");
				  if(ups){
				    ups.prefix="";
				    ups.search()
				  }
				  $j("#lightbox-shout-friends a").removeClass("selected");
				  $j("#lightbox-shout-filter").focus()
				},function(F){
				  errorMsg=F.error?F.error:F.message;
				  $j("#lightbox-share-notice").html('<div class="warning"><div><h3>ERROR!</h3>'+errorMsg+"</div></div>").show().fadeTo(3000,1,function(){
				    $j("#lightbox-share-notice").fadeOut(3000)
				  })//~faceTo
				}
			)//~sendShout
		}//~send
	}//~shouts
	,email:{
		add:function(){
			var C=$j(".lightbox-email-wrapper");
			var B=C.length+1;
			var A=$j(".lightbox-email-wrapper:last");
			if(B<7){
			  A.after('<div class="lightbox-email-wrapper" style="margin-right: 200px; clear: left;"><input style="width: 200px; margin-bottom: 3px;" class="lightbox-email" type="text" name="email'+B+'" id="email'+B+'" value="" /></div>')
			}
			if(B==6){
			  $j(".lightbox-add").hide()
			}
		}//~add
		,viewMessage:function(){
			$j("#lightbox-message-text-toggle").hide();
			$j("#lightbox-message-text").show()
		}
		,updateAppLink:function(){
			var B="";
			$j(".lightbox-email").each(function(C){
			  B+=C.val()!=""?C.val()+",":""
			});
			B=B.replace(/,$/,"");
			var A=$j("#lightbox-email-app");
			A.attr("href",A.attr("href").replace(/mailto:[^\?]*\?/,"mailto:"+B+"?"))
		}
	}//~email
});

$j(document).bind("shareBoxLoaded",function(){
	$j("#lightbox-shout-it-tab a").click(function(e){
	  Sharebox.tab("shout-it");
	  e.preventDefault()
	});
	$j("#lightbox-email-it-tab a").click(function(e){
	  Sharebox.tab("email-it");
	  e.preventDefault()
	});
	$j("#lightbox-blog-it-tab a").click(function(e){
	  Sharebox.tab("blog-it");
	  e.preventDefault()
	});
	$j("#lightbox-email-post").click(function(e){
	  var el=$j(e.target);
	  var form=el.parents("form").get(0);
	  el.val("Sending...").attr("disabled","disabled");
	  var data={
	    token:tokens.share.email
	  };
		$j(":text, textarea, #lightbox-email-id, #md5",form).not("#message-text2").each(function(){
		  var _this=$j(this);
		  data[_this.attr("id")]=_this.val()
		});
		$j.ajax({
		  url:"/ajax/share/email",
		  data:data,
		  type:"POST",
		  dataType:"json",
		  success:function(json){
		    $j("#lightbox-email-captcha").remove();
		    el.val("Send Message").removeAttr("disabled");
		    $j("#lightbox-share-notice").html('<div class="confirm"><div><h3>Success!</h3>Your email was successfully sent</div></div>').show().fadeTo(3000,1,function(){
		      $j("#lightbox-share-notice").fadeOut(3000)
		    })},
		  error:function(xml){
		    var json=eval("("+xml.responseText+")");
		    Sharebox.reCaptcha("#lightbox-email");
		    el.val("Send Message").removeAttr("disabled");
		    errorMsg=json.error?json.error:json.message;
		    $j("#lightbox-share-notice").html('<div class="warning"><div><h3>ERROR!</h3>'+errorMsg+"</div></div>").show().fadeTo(3000,1,function(){
		      $j("#lightbox-share-notice").fadeOut(3000)
		    })
		  }
		})
	});//~$j("#lightbox-email-post").click
	$j("#lightbox-blog-post").click(function(e){
	  var el=$j(e.target);
	  var form=el.parents("form").get(0);
	  el.val("Posting...").attr("disabled","disabled");
	  var data={
	    token:tokens.share.blog
	  };
		$j(":text, textarea, #lightbox-blog-id",form).each(function(){
		  var _this=$j(this);
		  data[_this.attr("name")]=_this.val()
		});
		$j.ajax({
		  url:"/ajax/share/blog",data:data,type:"POST",dataType:"json",success:function(json){
		    el.val("Blog it!").removeAttr("disabled");
		    $j("#lightbox-share-notice").html('<div class="confirm"><div><h3>Success!</h3>Your blog was successfully posted</div></div>').show().fadeTo(3000,1,function(){
		      $j("#lightbox-share-notice").fadeOut(3000)
		    }
		    )
		  }
		  ,error:function(xml){
		    el.val("Blog it!").removeAttr("disabled");
		    var json=eval("("+xml.responseText+")");
		    errorMsg=json.error?json.error:json.message;
		    $j("#lightbox-share-notice").html('<div class="warning"><div><h3>ERROR!</h3>'+errorMsg+"</div></div>").show().fadeTo(3000,1,function(){
		      $j("#lightbox-share-notice").fadeOut(3000)
		    }
		    )
		  }
		})
	})//~$j("#lightbox-blog-post").click
});//~$j(document).bind("shareBoxLoaded"

D.namespace({
	StoredAction:{
		store:function(B,E,C,A){
		  var A=(A)?A:window.location.pathname;
		  $j.ajax({
		    url:"/ajax/StoredAction/store",async:true,type:"POST",dataType:"json",data:{
		      token:tokens.StoredAction.store,action:C,trigger:A
		    }
		    ,error:function(F){
		    }
		  }
		  )
		}
		,setReturnPage:function(A){
		  $j.ajax({
		    url:"/ajax/StoredAction/setReturnPage",async:true,type:"POST",dataType:"json",data:{
		      token:tokens.StoredAction.setReturnPage,returnPage:A
		    }
		  })
		}
	}//~StoredAction
});
