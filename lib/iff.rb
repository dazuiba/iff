module IFF
  class SecurityError < Exception  
    attr_reader :url
    def initialize(options={})
      @options = {}
      if options.is_a? String
        @url = options
      else 
        @url = options.delete(:url)
        @options.merge!(options)
      end           
      
      @url||="/login"
    end    
    
    def url   
      if @options[:tiny]
        @url+"?tiny=1"
      else
        @url
      end
    end
  end
end