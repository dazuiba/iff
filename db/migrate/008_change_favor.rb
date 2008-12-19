class ChangeFavor < ActiveRecord::Migration
  def self.up
		rename_column "favors","obj_id","favorable_id"
		rename_column "favors","type","favorable_type"
	end
end
