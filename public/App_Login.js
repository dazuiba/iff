$j(document).bind("loginFormLoaded",null,function(){
  $j(document).unbind("loginFormLoaded");
  var A=(D&&D.currentDialog)?D.currentDialog:"";
  var J=$j(".login-register",A);
  var H=$j(".button-login-register",A);
  var I=$j(".login-digg",A);
  var L=$j(".button-login-digg",A);
  var C=$j(".login-facebook",A);
  var F=$j(".button-login-fb",A);
  var E=$j(".alreadyDigg",A);
  var G=$j(".forgot-link",A);
  $j.each(L,function(){
    if(this.bound!=true){
$j(this).click(function(){
  $j(this).addClass("current");
  F.removeClass("current");
  H.removeClass("current");
  J.css("display","none");
  C.css("display","none");
  E.css("display","none");
  if($j.browser.msie){
    I.css("display","block");
    $j(".login-digg-username",I).focus()
  }
  else{
I.fadeIn(function(){
  $j(".login-digg-username",I).focus()
}
)
}
$j.cookie("last_auth_method","digg",{
path:"/"
}
);
return false
}
);
this.bound=true
}
}
);
$j.each(H,function(){
if(this.bound!=true){
$j(this).click(function(){
  $j(this).addClass("current");
  F.removeClass("current");
  L.removeClass("current");
  I.css("display","none");
  C.css("display","none");
  E.css("display","block");
  if($j.browser.msie){
    J.css("display","block");
    $j(".username",J).focus()
  }
  else{
J.fadeIn(function(){
  $j(".username",J).focus()
}
)
}
$j.cookie("last_auth_method","register",{
path:"/"
}
);
return false
}
);
this.bound=true
}
}
);
$j.each(F,function(){
if(this.bound!=true){
$j(this).click(function(){
  $j(this).addClass("current");
  H.removeClass("current");
  L.removeClass("current");
  I.css("display","none");
  J.css("display","none");
  if(!$j.browser.msie){
    C.fadeIn()
  }
  else{
    C.css("display","block")
  }
  $j.cookie("last_auth_method","fb",{
    path:"/"
  }
  );
  return false
}
);
this.bound=true
}
}
);
$j.each(G,function(){
if(this.bound!=true){
$j(this).click(function(){
  var M=$j("form.forgot",$j(this).parent().parent().parent());
  if(M.length){
    if(M.css("display")=="none"){
      M.fadeIn()
    }
    else{
      M.fadeOut()
    }
  }
  return false
}
);
this.bound=true
}
}
);
var K=$j.cookie("last_auth_method");
if(K==null){
K="register";
$j(".dialog h3",A).html("Become a member of Digg")
}
var B=$j(".button-login-"+K,A);
if(B.length){
B.click()
}
else{
L.click()
}
}
);
