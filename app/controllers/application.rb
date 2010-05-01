# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
   helper :all     
   layout proc{ |controller|
     if controller.params[:tiny]
       'tiny'
     else
       'application'
     end
   }
   
   rescue_from ActiveRecord::RecordInvalid,:with=>:render_invalid_record

   rescue_from ActiveRecord::RecordNotFound ,:with=>:render_error
   rescue_from IFF::SecurityError do |exception|
      redirect_to exception.url
   end
   protected

   def get_current_user(url="/login")
      return User.current if User.current
      if session[:user_id].nil?
         raise IFF::SecurityError.new(:tiny => params[:tiny]) 
      else
        User.current = User.find session[:user_id]
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
