class CreateNotes< ActiveRecord::Migration
  def self.up
	  create_table :notes do |t|
    	t.integer :user_id,:null => false
			t.text :content,:null=>false
			t.date :created_on
			t.string :title
			t.timestamps
    end
    create_table :comments do |t|
			t.integer :user_id,:null=>false
    	t.integer :commentable_id
    	t.string :commentable_type
    	t.text :content
    	t.timestamps
    end
	end
end
