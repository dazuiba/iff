class Object
	def deep_copy
  	Marshal.load(Marshal.dump(self))
	end
end
ActionController::Resources.module_eval do
	DEFAULT_OPTIONS={:requirements=>{:id => /\d+/}}
	def resources_with_deep_copy(*entities, &block)
      options = entities.extract_options!
      add_default!(options)
      entities.each { |entity| map_resource(entity, options.deep_copy, &block) }
	end
	def add_default!(options)
    options.reverse_merge! DEFAULT_OPTIONS
	end
	alias_method_chain :resources, :deep_copy
end