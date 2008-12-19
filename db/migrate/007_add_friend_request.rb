class AddFriendRequest< ActiveRecord::Migration
  def self.up
	 create_table :add_friend_requests do |t|
      t.integer :user_id,:null => false
      t.integer :to_user_id,:null => false
			t.date :created_on
			t.boolean :allow,:default=> false
    end
  end
end
