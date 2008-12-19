class Followship < ActiveRecord::Base
	validates_uniqueness_of :followto_id,:scope=>[:follower_id]
	belongs_to :follower
	belongs_to :followto
end
