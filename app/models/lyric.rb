class Lyric < ActiveRecord::Base
	belongs_to :music
	def to_insert_sql
		"INSERT INTO #{self.class.quoted_table_name} " +
          "(#{quoted_column_names.join(', ')}) " +
          "VALUES(#{attributes_with_quotes.values.join(', ')})"
	end
	def content
		super.gsub(/\[.+\]/,'').gsub("\n",'<br>')
	end
end
