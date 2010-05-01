class CreateSetting < ActiveRecord::Migration
  def self.up
  	create_table :settings do |t|
  	    t.integer :user_id
  	    t.string :logo
  	    t.string :intro  	    
  	end
	end
end
