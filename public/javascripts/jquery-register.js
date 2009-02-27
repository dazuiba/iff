$j(document).unbind("registerFormLoaded").bind("registerFormLoaded",null,function(){
	function validate_error_for_info(D){
	  $j(".note-"+D).removeClass("form-note form-error form-success").addClass("form-note").css("visibility","visible").text(info[D])
	}
	function validate_error(E,D){
	  $j(".note-"+E).removeClass("form-note form-error form-success").addClass("form-error").html(D)
	}
	function validate_ok(E,D){
	  $j(".note-"+E).removeClass("form-note form-error form-success").addClass("form-success").text(D)
	}
	$j("input.register-input").focus(function(){
	  var D=$j(this).attr("name").replace(/\[/g,"\\[").replace(/\]/g,"\\]");
	  if($j(this).val().length==0){
	    validate_error_for_info(D)
	  }
	  $j(".note-"+D).css("visibility","visible")
	});
	
	$j("input.register-input").blur(function(){
	  if($j(this).val().length==0){
	    $j(".note-"+$j(this).attr("name").replace(/\[/g,"\\[").replace(/\]/g,"\\]")).css("visibility","hidden")
	  }
	});
	
	$j("input.nocheck").blur(function(){
	  if($j(this).val().length>0){
	    $j(".note-"+$j(this).attr("name").replace(/\[/g,"\\[").replace(/\]/g,"\\]")).css("visibility","hidden")
	  }
	});
	
	$j(".birthday-mm, .birthday-dd, .birthday-yyy").focus(function(){
	  validate_error_for_info("birthday")
	});
	
	$j(".username").validate("usernameAvailable",
		function(D){
		  validate_error("username",D.error?D.error:D.message)
		},
		function(D){
		  validate_ok("username","Yay! The username "+D.username+" is available")
		}
	);
	
	$j(".email").validate("emailAvailable",
		function(D){
	  	validate_error("email",D.error?D.error:D.message)
		},
		function(D){
		  validate_ok("email","Your email address appears valid. This is a good thing.")
		}
	);
	
	$j(".emailverify").blur(function(){
	  if($j(this).val()!=$j("#email").val()){
	    validate_error($j(this).attr("id"),"Email addresses do not match")
	  }
	  else{
	    $j("#note-"+$j(this).attr("id")).css("visibility","hidden")
	  }
	});
	
	$j(".password\\[a\\]").validate("password",
		function(D){
		  validate_error("password\\[a\\]",D.error?D.error:D.message)
		}
		,function(D){
		  validate_ok("password\\[a\\]","Your password looks good. Remember to remember it.")
		}
	);
	
	$j(".password\\[a\\]").keyup(function(){
	  if($j(this).val().length>=6){
	    $j(".note-password\\[a\\]").css("visibility","hidden")
	  }
	});
	
	$j(".password\\[b\\]").blur(function(){
	  if($j(this).val().length&&$j(".password\\[a\\]").val().length){
	    if($j(this).val()!=$j(".password\\[a\\]").val()){
	      validate_error("password\\[b\\]","Passwords do not match")
	    }
	    else{
	      validate_ok("password\\[b\\]","Passwords match! Woohoo!")
	    }
	  }
	});
	
	$j(".password\\[a\\]").blur(function(){
	  if($j(this).val().length&&$j(".password\\[b\\]").val().length){
	    if($j(this).val()!=$j(".password\\[b\\]").val()){
	      validate_error("password\\[b\\]","Passwords do not match")
	    }
	    else{
	      validate_ok("password\\[b\\]","Passwords match! Woohoo!")
	    }
	  }
	});
	
	$j("#invite-skip").click(function(){
	  window.location="/register/done"
	})
	}
);

$j(document).ready(function(){
  $j(document).trigger("registerFormLoaded",null)
});
