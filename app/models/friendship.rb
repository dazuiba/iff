class Friendship < ActiveRecord::Base
	belongs_to :user
	belongs_to :friend
	def self.remove(user1,user2)
		delete_all("(user_id=#{user1.id} and friend_id=#{user2.id})
							 or (user_id=#{user2.id} and friend_id=#{user1.id})")
	end
end