class Album < ActiveRecord::Base
	has_many :music_albums
	has_many :musics,:through=>:music_albums,:order => "position"
	belongs_to :singer
	has_one :statics,:class_name=>"AlbumStatics"
	has_many :relateds,:class_name=>"AlbumRelated"
	has_many :tags,:class_name=>"AlbumTag"
end