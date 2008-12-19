class MusicAlbum < ActiveRecord::Base
	belongs_to :album
	belongs_to :music
end