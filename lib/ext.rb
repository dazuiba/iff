require 'string_ext'
###########################################################
class MultiLogger
	def initialize(*files)
		@loggers=files.map{|l|Logger.new l}
	end
	def info(msg)
		@loggers.each{|l|l.info msg}
	end
	def error(msg)
		@loggers.each{|l|l.error msg}
	end
end
class Logger
  def format_message(severity, timestamp, progname, msg)
    "#{timestamp.to_s(:db)} #{msg}\n" 
  end
end
###########################################################
class Hash
  alias :old_update :update
	def update(key,options={})
		return  old_update(key) if key.is_a? Hash

		options.reverse_merge! :allow_nil=>true
		return self if options[:allow_nil]&&self[key].nil?		
		self[key]=(yield self[key])
		self
	end
end
class String
 def has_text?
    !blank?
 end
 def clean_name
 	trim_all.gsub(/\(.*\)|\[.*\]|（.*）|【.*】/,"")
 end
 def china_strip
  strip.self.gsub(/^　/,"").gsub(/　$/,"")
 end
 def trim_all
 	 self.gsub(/ |　|\.|-|'|`|,|!|/,"")
 end
 def to_xs
	 to_s
 end
end
class File
	def self.suffix(f)
		f[f.rindex(".")+1..f.size]
	end
	def self.without_suffix(f)
		file_path_without_suffix(f)
	end
	def self.file_path_without_suffix(f)
		f[0..f.rindex(".")].chomp "."
	end
	def self.replace_suffix(f,new_suffix)
		f[0..f.rindex(".")]+new_suffix
	end
end
class Array
   def random
      self[rand(self.length)]
   end
   def shuffle
      sort_by { rand }
   end
   def shuffle!
      self.replace shuffle
   end
   def rand_sub(count)
      return  self if	count>=self.size
      return random if	count<=1
      shuffle[0..count-1]
   end
end