class MusicController<ApplicationController
	def show
		@music=Music.find params[:id]
		@title=@music.name
	end
	def search
		@musics=Music.search(params[:q],:page=>params[:page])			
		
		search_singer
	end
	def search_singer		
		@singers=@musics.map { |e| e.singer }
		s=Singer.find_by_name(params[:q])
		@singers.unshift s if s
		@singers.uniq!{|a,b|a.id==b.id}
				
		@singers=Singer.search(params[:q]) if @singers.empty?
	end
end