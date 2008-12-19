class AddFriendRequest< ActiveRecord::Base
	validates_uniqueness_of :to_user_id ,:scope=>[:user_id]
	belongs_to :user
	belongs_to :to_user, :class_name => "User"
end