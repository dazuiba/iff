class SingerController < ApplicationController
	
	def show
		@singer=Singer.find params[:id]
		@albums=@singer.albums
		respond_to do |format|
			format.html
			format.xml{render :xml=>@singer.to_xml}
		end
	end
	
	def search
		@query=params[:q]
		@singers=Singer.search(@query, :page => params[:page])
	end
	
	def create
		singer_params=params['singer']
		options=(singer_params.delete 'options').merge(:info=>singer_params.delete('intro'))
		
		result=Singer.create_or_update(singer_params,options)
		respond_to do |format|
			format.xml{render :xml=>result.to_xml}
		end
	end

end