class String
	CLEAN_TOKEN=%w[. - _ ]
	
	def main_text
		self.strip.compact.gsub(/\(.*\)|\[.*\]|£¨.*£©|¡¾.*¡¿/,"").downcase		
	end
	
	def compact
		 self.gsub(/ |¡¡|\.|-|'|`|,|!|/,"")
	end
	
	def strip 
		self.gsub(/^¡¡| /,"").gsub(/¡¡| $/,"")
	end
	
	def blank?
    strip.empty?
  end
  
  def to_key
    self.to_s.split(':').last
  end
  
  def strip_utf8!
  	self.strip!
  	self.gsub! "¡¡",""
  	self
  end 
  
  def strip_html
	  self.delete('&nbsp;').strip
  end
end
if $0==__FILE__
	require 'test/unit'
  class StringExtTest< Test::Unit::TestCase

		def test_strip
		  assert_equal "test"," test¡¡".strip
		end

		def test_uname
			assert_equal "test","test(sdf)".main_text
			assert_equal "test","test¡¾sdf¡¿".main_text
  		assert_equal "test"," test(sdf)¡¡¡¡".main_text
		end
		
  end
  
	
	
end