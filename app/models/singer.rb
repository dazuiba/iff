class Singer < ActiveRecord::Base
	
  has_many :albums
  has_many :musics
	has_many :record_parse_froms, :as=>:record
	class<<self	  
	  def create_or_update(params,options={})
	  	options.symbolize_keys!
	  	p options.keys
			record=self.find_or_initialize_by_name(params.delete(:name).main_text)
			code=:not_changed
			if record.new_record?||options[:force_update]
				info=params.delete(:info)
				image_name=ImageFetcher.fetch_image(self,params.delete(:image_url))
				
				self.transaction do
					record.update_attributes! params.merge(:image=>image_name)
					
					singer_info=SingerInfo.find_or_initialize_by_singer_id(record.id)
					singer_info.update_attributes! info
					
					record.record_parse_froms.create!(options['form'])
			  end
				
			  code=:saved
			end
			return CreateOrUpdateResult.new(:record=>record,:code=>code)
		end
	
	  def search(key)
	  	find :all, :conditions => ["name like ?","%#{key}%"]
	  end
	end
end

class ImageFetcher
	NUMBER_LENGTH=5
	IMAGE_DIR="#{RAILS_ROOT}/public/images/data/"
	def self.fetch_image(clazz,url)
		 out_dir="#{IMAGE_DIR}/#{clazz.to_s.downcase}"
		 `mkpath #{out_dir} 2>/dev/null`
		 
	   url=~/\.(\w+)$/
	   subfix=$1
	   file_name="#{next_id}.#{subfix}"
		`curl #{url} 2>/dev/null > #{out_dir}/#{file_name}`
		 file_name
	end
	
	def self.next_id
		if @last_id.nil?
			last=Dir[IMAGE_DIR,'*'].map{|e|e=~/(\d+)\.(\w+)/;[$1.to_i,$2]}.find_all{|e|e[0]>0}.sort.last
			@last_id=last.nil? ? 0:last[0]
		end
		@last_id+=1
		sprintf("%0#{NUMBER_LENGTH}d",@last_id)
	end
end
class CreateOrUpdateResult
	def initialize(hash)
		@hash=hash
	end
	
	def record;@hash[:record];end
	def code;@hash[:code];end
	
	def to_xml
		{:code=>code,:record_id=>record.id}.to_xml
	end
end