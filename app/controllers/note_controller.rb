class NoteController < ApplicationController
	before_filter :get_current_user,:only=>[:new,:edit,:destory]
	before_filter :find_record,:except=>:new
	before_filter :only_access_by_owner,:only=>[:destory,:edit]
	def show		
	end
	def edit
	end
	def destroy		
		@note.destroy
		flash[:notice]="删除成功！"
    redirect_to my_note_path
	end
	def new
		if request.get?
			return
		else		  
			@current_user.notes.create! params[:note]
			redirect_to my_note_path
		end
	end
 def only_access_by_owner
    if not @current_user.id == (instance_variable_get record_var_name("@"))[:user_id]
       render_error
       false
    else
       true
    end
 end
end