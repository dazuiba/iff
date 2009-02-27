class NewsController < ApplicationController
	before_filter :get_current_user,:only=>[:new,:edit]
	
	def new
		@news=News.new(params[:news])
		return if request.get?
		@news.save
	end
	
	def edit
		
	end
end