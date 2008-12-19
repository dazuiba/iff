class MyController < ApplicationController
	before_filter :get_current_user
	def index
		@viewer=UserViewer.new @current_user,params
		render :template => "user/show"
	end
	def notes
		@notes=@current_user.notes.paginate(:page=>params[:page]||1)
		redirect_to new_note_path if @notes.empty?
	end
	def collect
		favorable=params[:type].constantize.find params[:id]
		@current_user.favors.create(:favorable=>favorable)
		redirect_to my_path
	end
end