$:.unshift(File.dirname(__FILE__))
load 'init.rb'
class Sougou
	include ParseModule
  meta :base=>%[http://iff/out.htm]
	def do_fetch
	  set :name,@params[:singer] 
    parse :intro,".titleBox > h1 > strong >a",:key=>'clazz_name'
	    
	  parse(:singerid, ".titleBox > h1 > a" ){|elm|get_href_param(elm,"singerid")}
	        
	  parse :image_url, ".starIntro img"    
	    
	  parse :intro, "#intro_area",:key=>'info'
		
	  parse :intro, ".starIntro dd",:at=>false do |elm_array|
	    elm_array.pop#remove last one
	    elm_array.map(&:inner_text).inject({}){|result,text|result.merge(parse_colon_text(text))}
	  end

	end
	
	def save
   	options={:force_update=>true,:from=>{:site=>'sougou',:from_id=>@result.delete(:singerid)}}
		Resource::Singer.create(@result.merge(:options=>options))
	end
end

class Sougou
 	def self.test
		singer=Sougou.new(:singer=>Util.msg(:singer1))
		singer.fetch
		singer
		#singer.save
	end
end
if $0==__FILE__
 Sougou.test
end