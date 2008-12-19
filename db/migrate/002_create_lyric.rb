class CreateLyric < ActiveRecord::Migration
  def self.up
    create_table :lyrics,:options=>"DEFAULT CHARSET=gbk" do |t|
      t.integer :music_id
      t.text :content
    end
  end

  def self.down
    drop_table :lyrics
  end
end
