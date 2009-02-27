class News < ActiveRecord::Base
	
	belongs_to :submmitter, :class_name => "User"
	belongs_to :link_site
	
	validates_presence_of :title, :content	
	ordered_errors :title,:content
end
