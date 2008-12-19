class SettingController < ApplicationController
	before_filter :get_current_user
	def index
		
	end
	def logo
		return if request.get?		
		@current_user.logo=params[:picfile]
		@current_user.save!
	end
end