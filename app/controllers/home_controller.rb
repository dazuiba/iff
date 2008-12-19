class HomeController < ApplicationController
	def re_music
		redirect_to params[:url]
	end
end