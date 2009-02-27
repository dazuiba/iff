module MultilingualFerretTools
  class Chunker
    def initialize(str, options={})
      @codepoints = str.unpack("U*")
      @u_index = 0
      @s_index = 0
      @options = options.reverse_merge!({ :whitespace => :discard })
    end

    def next
      return nil if @u_index >= @codepoints.length
      start_u_index = @u_index
      start_s_index = @s_index
      this_classification = Chunker.classify(@codepoints[@u_index])
      while @u_index < @codepoints.length - 1 
        current_classification = Chunker.classify(@codepoints[@u_index + 1])
        finished = current_classification != this_classification
        finished = false if @options[:whitespace] == :combine and (
          (current_classification == :latin_whitespace and this_classification == :latin) or 
          (current_classification == :latin and this_classification == :latin_whitespace) or 
          (current_classification == :non_latin_whitespace and this_classification == :non_latin) or
          (current_classification == :non_latin and this_classification == :non_latin_whitespace) 
          )
        break if finished
        this_classification = current_classification unless (current_classification == :latin_whitespace or current_classification == :non_latin_whitespace)
        @u_index += 1
      end

      @u_index += 1

      this_string = @codepoints[start_u_index..@u_index - 1].pack("U*")
      @s_index += this_string.length
      ((this_classification == :latin_whitespace or this_classification == :non_latin_whitespace) and @options[:whitespace] == :discard) ? self.next : [this_string, this_classification, start_s_index, @s_index - 1]
    end

    def self.classify(thing)
      if thing.is_a?(String)
        chars = thing.unpack("U*")

        found_latin = found_nonlatin = found_latin_whitespace = found_nonlatin_whitespace = false
        chars.each do |c|
          classification = classify(c)
          found_latin ||= classification == :latin
          found_nonlatin ||= classification == :non_latin
          found_latin_whitespace ||= classification == :latin_whitespace
          found_nonlatin_whitespace ||= classification == :non_latin_whitespace
        end

        found_latin_whitespace && !found_nonlatin_whitespace && !found_latin && !found_nonlatin ? :latin_whitespace : 
          found_nonlatin_whitespace && !found_latin_whitespace && !found_latin && !found_nonlatin ? :non_latin_whitespace : 
          found_latin && !found_nonlatin ? :latin : found_nonlatin && !found_latin ? :non_latin : :mixed
      elsif thing.is_a?(Integer)
        @@LATIN_WHITESPACE.include?(thing) ? :latin_whitespace : @@NON_LATIN_WHITESPACE.include?(thing) ? :non_latin_whitespace : thing < 0x300 ? :latin : :non_latin
      else
        :unknown
      end
    end

    private

    @@LATIN_WHITESPACE = " \t".unpack("c*")
    @@NON_LATIN_WHITESPACE = [ 0x3000 ]
    @@WHITESPACE = { :latin =>@@LATIN_WHITESPACE, :non_latin => @@NON_LATIN_WHITESPACE }
  end
end