class UserController < ApplicationController
	before_filter :find_record,:except=>[:login,:logout,:register]

	def login
		return if request.get?
		if @user=User.find_by_email_and_password(params[:email],params[:password])
			session[:user_id]=@user.id
			redirect_to "/"
		else
			@user=User.new
			@user.errors.add_to_base("你的email和密码不符")
		end
	end
  
	def register             
  	@user=User.new params[:user]
		return if request.get?      
		@user.activate_code_create
		if @user.save
      UserMailer.deliver UserMailer.create_reg_success(@user)
      render :action => "register_ok" 
    end
	end

	def logout
		session[:user_id]=nil
		redirect_to "/"
	end

	def show
		@viewer=UserViewer.new @user,params
	end

	def activate
		code=params[:code][0..31]
		id=params[:code][32..params[:code].size]
		@user=User.find id
		if Digest::MD5.hexdigest(@user.activate_code)==code
			@user.activate=true
			@user.save
		else
			render_link_error 
		end
	end
end
