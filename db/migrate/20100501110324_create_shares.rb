class CreateShares < ActiveRecord::Migration
  def self.up
    create_table :shares do |t|
      t.string :title
      t.text :description
      t.string :url
      t.text :tags
      t.integer :user_id
      t.timestamps
    end
  end

  def self.down
    drop_table :shares
  end
end
