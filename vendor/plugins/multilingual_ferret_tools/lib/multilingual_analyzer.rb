require 'ferret'

module MultilingualFerretTools
  class Analyzer < Ferret::Analysis::Analyzer
    def initialize(lower = true)
      super(lower)
      @lower = lower
    end

    def token_stream(field, str)
      TokenStream.new(field, str, @lower) 
    end
  end
  
  class TokenStream < Ferret::Analysis::TokenStream
    def initialize(field, str, lower)
      @field = field
      @lower = lower
      self.text = str
    end

    def text=(text)
      @input = text
      @index = 0
      @substreams = []
      @token_offset = 0
      build_substreams
    end
    
    def next
      return nil if @index >= @substreams.length
      
      ret = @substreams[@index][:ts].next
      
      if !ret
        @token_offset += @substreams[@index][:len]
        @index += 1
        self.next
      else
        ret.start += @token_offset
        ret.end += @token_offset
        ret
      end
    end
    
    private
    
    def build_substreams
      # if string is completely latin or non-latin, use a single substream
      #
      single_token_stream = token_stream_for(@input)
      @substreams.push({ :ts => single_token_stream, :len => @input.length}) and return if single_token_stream

      # otherwise, build a series of substreams for the text
      #
      chunker = Chunker.new @input, :whitespace => :combine
      while chunk = chunker.next do 
        @substreams.push({ :ts => token_stream_for(chunk[0]), :len => chunk[0].length })
      end
    end

    def token_stream_for(str)
      case Chunker.classify(str)
        when :latin, :latin_whitespace
          analyzer = Ferret::Analysis::StandardAnalyzer.new(Ferret::Analysis::ENGLISH_STOP_WORDS, @lower)

        when :non_latin, :non_latin_whitespace
          analyzer = Ferret::Analysis::RegExpAnalyzer.new(/./, @lower)
      end

      analyzer ? analyzer.token_stream(@field, str) : nil    
    end
  end
  
end