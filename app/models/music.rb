class Music < ActiveRecord::Base
	has_many :play_urls
	has_many :music_albums
	has_many :albums,:through=>:music_albums
	has_one :lyric	
	belongs_to :singer
	search_fu
	def to_doc
		returning Ferret::Document.new do |doc|
        doc[:class_name] = self.class.name
        doc[:id]=self.id
        doc[:singer_id]=self.singer_id
        doc[:name]=self.name
        doc[:lyric]=self.lyric.content if lyric
    end
	end
	def sync_play_url_count
		self.play_url=play_urls.first
		self.play_url_count=play_urls.size
	end
	def update_from_kg_music(kg_music)
		changed={:lyric=>false,:play_urls=>0};
		if self.lyric.nil?&&kg_music[:lyricURL].has_text?
			self.create_lyric :content=>kg_music.get_lyric
			changed[:lyric]=true
		end
		urls=play_urls.map { |u| u.url.strip }
		kg_music.get_urls.each do |url|
			url.strip!
			if !url.blank? && !urls.include?(url)
				play_urls.create(:url=>url)
				changed[:play_urls]+=1
			end
		end
		return changed
	end
end