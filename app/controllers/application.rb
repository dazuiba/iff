# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
   helper :all
   layout 'default'
   rescue_from ActiveRecord::RecordInvalid,:with=>:render_invalid_record
   #rescue_from ActiveRecord::CannotDelete do|exception|
   #	  flash[:error]=exception.message
   #		redirect_to :action => "edit",:id=>exception.record
   #end
   rescue_from ActiveRecord::RecordNotFound ,:with=>:render_error
   rescue_from SecurityError do |exception|
      render_login(exception.options)
   end
   protected
   def get_current_user
      return @current_user if @current_user
      if session[:user_id].nil?
         redirect_to "/login"
         return false;
      else
         @current_user=User.find session[:user_id]
      end
   end
   def find_record(id_param_key=:id)
      instance_variable_set record_var_name("@"),record_var_name.classify.constantize.find(params[id_param_key])
   end
   def record_var_name(prefix="")
      prefix+params[:controller]
   end
   def render_error
      render(:file => "#{RAILS_ROOT}/public/404.html", :status => '404 Not Found')
   end
   def render_invalid_record(exception)
      @invalid_record=exception.record
      respond_to do |format|
         format.html do
            if @invalid_record.new_record?
               render :action =>'new'
            else
               render :action =>'edit',:id=>@invalid_record
            end
         end
         format.js do
            render :update do |page|
               page.alert @invalid_record.message
            end
         end
      end
   end
end
