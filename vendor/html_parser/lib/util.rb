class Util
	class<<self
		def var_name(text,fetch=false)
		  text=text.strip if text.is_a? String
			load_msg_file
			fetch ? @msg_hash.fetch(text)  :  @msg_hash[text]
		end
	  alias msg var_name
		
		def load_msg_file
		  file=File.join(File.dirname(__FILE__),'text.txt')
		  if @last_load_time.nil?||@last_load_time<File.stat(file).mtime
			  @last_load_time=Time.now
				@msg_hash=YAML.load_file(file)
			end
		end
	end
end

if $0==__FILE__
	p Util.msg(:singer1)
end