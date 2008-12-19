# Methods added to this helper will be available to all templates in the application.
module UserHelper
 def user_image_tag(user,options={})
    %[<img src="http://otho.douban.com/icon/ul1483010-6.jpg" style="margin: 10px; float: left;">]
 end
end