jQuery.fn.extend({
  validate:function(endPoint,failure,success){
		jQuery(this).blur(function(){
		  if(jQuery(this).val().length==0){
		    return false
		  }
		  jQuery.ajax({
		    type:"POST",url:"/ajax/validate/"+endPoint,dataType:"json",data:{
		      check:jQuery(this).val(),token:tokens.validate[endPoint]
		    }
		    ,success:function(json){
		      if(typeof (success)=="function"){
		        success(json)
		      }
		    }
		    ,error:function(xml){
		      var json=eval("("+xml.responseText+")");
		      failure(json)
		    }
		  })
		})
}});
