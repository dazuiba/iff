class CreateFriends< ActiveRecord::Migration
  def self.up
	 create_table :friendships do |t|
      t.integer :user_id,:null => false
      t.integer :friend_id,:null => false
    end
	 create_table :followships do |t|
      t.integer :user_id,:null => false
      t.integer :follower_id,:null => false
    end
  end
end
