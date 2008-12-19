class AlbumController < ApplicationController
	def show
		@album=Album.find params[:id]
		@title=@album.name
	end
	def play_url
		@album=Album.find params[:album_id]
		@remote_url="http://www.douban.com/subject/#{@allbum.id}/"
		parser=DoubanAlbumParser.from_url(open(remote_url));
		parser.parse;
		@parser_musics=parser.musics
	    @parser_album=parser.album_info
	    @parser_meta=parser.meta_info
	end
end