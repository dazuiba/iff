class CreateRecordParseFroms < ActiveRecord::Migration
  def self.up
    create_table :record_parse_froms do |t|
    	t.integer :record_id,:null=>false
    	t.string :record_type,:null=>false
    	t.string :site
    	t.integer :from_id,:null=>false
      t.timestamps
    end
    self.singer_info
		singer_info2
  end
  def self.singer_info2
  	add_column :singer_infos, :clazz_name, :string
  end
  def self.singer_info
  	add_column :singers, :image, :string
  	create_table :singer_infos do |t|
  		t.integer :singer_id
  		t.string :country
  		t.string :eng_name
  		t.text :info  		
  	end
  end
  def self.down
    drop_table :record_parse_froms
    
  end
end
