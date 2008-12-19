class CreatePlayUrls< ActiveRecord::Migration
  def self.up
	  create_table :play_urls do |t|
      t.integer :music_id,:null => false
      t.string :url,:null => false
    end
	end
end
