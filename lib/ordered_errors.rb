module ActiveRecord
	class Errors
	  def each
      sort_keys.each{ |attr| @errors[attr.to_s].each { |msg| yield attr, msg } }
    end
    def sort_keys
    	keys=@errors.symbolize_keys.keys
    	defs=@base.class.ordered_errors_conf
    	result=defs-(defs-keys)
    	return result+(keys-result)
    end
	end
end
module OrderedErrors
 module ActMethods
  def ordered_errors(*order_keys)
     cattr_accessor :ordered_errors_conf
     self.ordered_errors_conf=order_keys
  end
 end
end
ActiveRecord::Base.extend OrderedErrors::ActMethods