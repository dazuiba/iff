# Methods added to this helper will be available to all templates in the application.
module ApplicationHelper
	def include_js(*js_array)
		@__js_include=*js_array				
	end
	def clear_float
	   %{<div class="clear"></div>}
	end
	def render_flash_messages
		if msg=flash[:notice]
			content_tag(:div,msg,:class=>"notice")
	  else
	  	""
  	end
	end	
	def top_menu_text(*conditions)
		text=conditions.pop
		(conditions.include? @controller.controller_name) ? "<span>#{text}</span>" : text
	end
	def top_menu_class(*conditions)
		(conditions.include? @controller.controller_name) ? "class='now'" : ""
	end
	def t(time)
		time.to_s(:db)
	end
	def error_message(object_name)
		object=instance_variable_get("@#{object_name}")
		content_tag :p,object.errors.to_a.first.last,:class=>"attn" if object&&!object.errors.empty?
	end
	def content_for_user(user_type,resource_owner_id=nil,&block)		
		current_user_id=session[:user_id]
		show_content=case user_type
			when :guest 
				current_user_id.nil?
			when :login
				current_user_id
			when :owner
				current_user_id==resource_owner_id
			else
				false
			end
			concat(capture(&block),block.binding) if show_content
	end
	def current_user
		@current_user||=User.find session[:user_id]
	end
	def pager(entries,options={})
		load "#{RAILS_ROOT}/vendor/plugins/will_paginate/lib/will_paginate/view_helpers.rb"
		options.merge! :prev_label=>"< 前页", :next_label => "后页 >",:class=>"paginator"
		options.reverse_merge! WillPaginate::ViewHelpers.pagination_options
		if entries.total_pages > 1
        renderer = WillPaginate::LinkRenderer.new
        renderer.prepare  entries, options, self
        content_tag :div, renderer.to_html, renderer.html_attributes
    end
	end
end
