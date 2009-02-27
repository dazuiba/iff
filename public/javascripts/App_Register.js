$j(document).bind("almostThereLoaded",function(){
  var A=null;
$j(".loginformtoggle").attr("href","/login/digg/dialog").click(function(){
  var C=$j(this);
  buildDialogs(C,null,true,{
    onTrigger:function(){
      C.fadeTo("slow",0.01);
      return true
    }
    ,onCancel:function(){
      C.fadeTo("fast",1);
      if(A){
        A.find(".warning").remove()
      }
    }
    ,onPost:function(D){
      A=D;
      A.attr("action","/ajax/login/digg");
      A.find(".warning").remove();
      if(A.find("token").length){
        A.find("token").val(tokens.login.digg)
      }
      else{
        A.append('<input type="hidden" class="token" name="token" value="'+tokens.login.digg+'"/>')
      }
      A.find(":submit").attr("disabled","disabled");
      return true
    }
    ,onPostComplete:function(D){
      if(D.error){
        A.prepend('<div class="warning"><div><h3>Please check the errors below:</h3></div><p>'+D.message+"</p></div>");
        A.find(":submit").removeAttr("disabled");
        A.find(".login-digg-username, .login-digg-password").val("");
        A.find(".login-digg-username").focus()
      }
      else{
        window.location.reload(true)
      }
    }
  }
  );
  return false
}
);
$j(".reg-import dl dt input.checkbox").click(function(){
  var E=$j(this);
  var C=E.parent().next();
  if(E.attr("checked")==false){
    var D=$j("img",E.parent());
    if(D.length>0){
      D.addClass("import-hidden").attr("oldsrc",D.attr("src")).hide().attr("src","/img/udl.png").fadeIn()
    }
    C.addClass("import-hidden");
    $j("input",C).val("import-hidden")
  }
  else{
    var D=$j("img",E.parent());
    if(D.length>0){
      D.removeClass("import-hidden").hide().attr("src",D.attr("oldsrc")).fadeIn()
    }
    C.removeClass("import-hidden");
    $j("input",C).val($j.trim(C.text()))
  }
}
);
function B(D,F){
  var C=$j(D);
  var E=$j("#friends");
  var F=F?F:false;
  if(F=="selected"||(!F&&C.hasClass("deselected"))){
    if(E.val().indexOf(C.attr("name")+"|")<0){
      E.val(E.val()+C.attr("name")+"|")
    }
    C.removeClass("deselected")
  }
  else{
    if(E.val().indexOf(C.attr("name")+"|")>=0){
      E.val(E.val().replace(C.attr("name")+"|",""))
    }
    C.addClass("deselected")
  }
  return false
}
$j(".friend-select-box a").click(function(){
  return B(this)
}
);
$j("#importconnectedFriends").click(function(){
  var C=$j(this);
  if(C.html()=="Select All"){
$j("#connectedFriends a").each(function(){
  B(this,"selected")
}
);
C.html("Deselect All")
}
else{
$j("#connectedFriends a").each(function(){
  B(this,"deselected")
}
);
C.html("Select All")
}
}
);
$j("#importotherFriends").click(function(){
  var C=$j(this);
  if(C.html()=="Select All"){
$j("#otherFriends a").each(function(){
  B(this,"selected")
}
);
C.html("Deselect All")
}
else{
$j("#otherFriends a").each(function(){
  B(this,"deselected")
}
);
C.html("Select All")
}
}
)
}
);
