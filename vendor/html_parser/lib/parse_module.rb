module ParseModule
  def self.included(base)
  	base.extend ClassModule
		super
  end
  module ClassModule	
		def meta(params) 
			cattr_accessor :meta_hash
      self.meta_hash=params
		end
	end
	attr_reader :result
	def initialize(params)
		@params=params
	end
	
	
	def fetch
		@result={}
		if result=self.class.meta_hash[:result]
			@result=result.inject({}){|a,b|a[b]=nil;a}
		end
		do_fetch
		OpenStruct.new @result
	end
	
	def parse(var,path,options={})
		
		element=if options[:at]==false
		           doc.search(path)
						else
							doc.at(path)
						end
						
		if block_given?
			element=yield element
		end
		
		if element.kind_of? Hpricot::Elem
			 element=if element.name=='img'
		 	 	element[:src]
		 	 else
		 	 	element.inner_text
	 		 end
		end
		if k=options[:key]
			element={k=>element}
		end
    set var,element
		element
	end
	def	set(var,value)
		v=@result[var]
    if v.nil?
		  @result[var]=value
		else
		  if v.respond_to? :merge
			 v.merge!(value)
			elsif v.resond_to :<<
			 v<<value
			else
			 @result[var]=value
			end
		end
	end
	def parse_colon_text(text)
		key,value=text.split("£º")
		return {Util.var_name(key)=>value}		
	end
	
	def doc
		@doc||=	Hpricot(`curl #{meta_hash[:base]}?#{@params.to_param} 2>/dev/null`)
	end
		 
	def save
		open(self.class.to_s,'w'){|f|f<<@result.inspect}
		p "save file success!"
	end
	def	get_href_param(elm,key)
	  elm[:href]=~Regexp.new(key+'=(\w+)')
		$1
	end
end
