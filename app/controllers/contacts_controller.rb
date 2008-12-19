class ContactsController < ApplicationController
  before_filter :get_current_user
	def index
		@friends=@current_user.friends
		@followers=@current_user.followers
		@followtos=@current_user.followtos
	end
	def followtos
		if request.put?
			@current_user.followtos<<User.find(params[:id])
			redirect_to :action => "index"
		elsif request.delete?
			@current_user.followtos.delete(User.find params[:id])
		else	
			return @followtos=@current_user.followtos
		end
	end
	def friends
		if request.put?
			AddFriendRequest.create :user=>@current_user,
															:to_user=>User.find(params[:id])
															
			flash[:notice]="好友申请已经发送！"
			redirect_to :action => "index"
		elsif request.delete?
			object_user = User.find params[:id]
			Friendship.remove(@current_user,object_user)
			
			flash[:notice]="你已经和#{object_user.nick_name}解除了好友关系！"
			redirect_to :action => "index"
		else
			return @followers=@current_user.followers
		end
	end
end