class UpdateUser < ActiveRecord::Migration
  def self.up
		add_column :users, :nick_name, :string
		add_column :users, :activate_code, :string
		add_column :users, :created_at, :datetime 
		add_column :users, :activate, :boolean,:default=>false
	end
end
