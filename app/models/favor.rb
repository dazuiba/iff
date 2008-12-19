class Favor < ActiveRecord::Base
	belongs_to :user
	belongs_to :favorable,:polymorphic=>true
	validates_uniqueness_of :favorable_id,:scope=>[:user_id,:favorable_type]
end
