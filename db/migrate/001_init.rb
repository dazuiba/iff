class Init < ActiveRecord::Migration
  def self.up
    create_table :musics do |t|
      t.integer :singer_id,:null => false
      t.string :name,:null => false
      t.string :download_url
    end
	  create_table :music_albums do |t|
      t.integer :album_id,:null => false
      t.integer :music_id,:null => false
      t.integer :position
    end
    create_table :albums do |t|
      t.integer :singer_id,:null => false
      t.string :name,:null => false
      t.string :uid
      t.string :publish_date
    end
    create_table :singers do |t|
      t.string :name,:null => false
    end
    create_table :users do |t|
      t.string :email,:null => false
      t.string :password,:null => false
    end
    create_table :music_ratings do|t|
      t.integer :user_id,:null => false
      t.integer :music_id,:null => false
      t.integer :mark,:null => false
    end
    create_table :favors do |t|
      t.integer :user_id,:null => false
      t.integer :obj_id,:null => false
      t.string :type,:null => false# music,singer,album
      t.date :created_on
    end
    create_table :album_tags do |t|
      t.integer :album_id,:null => false
      t.string :tag,:null => false
      t.string :count
    end
    create_table :album_relateds do |t|
      t.integer :album_id,:null => false
      t.integer :related_id,:null => false
      t.integer :position
    end
    create_table :album_statics do |t|
      t.integer :album_id,:null => false
      t.integer :count
    end
  end
end
