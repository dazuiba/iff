class RecordParseFrom < ActiveRecord::Base
	belongs_to :record,:polymorphic=>true	
end
