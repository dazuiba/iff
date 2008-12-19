require "ferret"
include Ferret::Index
module SearchFu
   module ActMethods
      def search_fu(options={})
         cattr_accessor :conf
         extend ClassMethods
         include InstanceMethods
         self.conf=options
         self.conf[:untokenized_fields]||=[]
         self.conf[:static_fields]||=[]
      end
   end
   module Query
      def hits_by_contents(q, options = {})
         result = []
         total_hits=index.search_each(q, options) do |hit, score|
            doc = index[hit]
            result << {:model => doc[:class_name], :id => doc[:id], :score => score}
         end
         [total_hits,result]
      end
      def query_parser
         @query_parser ||= Ferret::QueryParser.new(@options)
      end
      def search(q,options={})      	
         WillPaginate::Collection.create(options[:page]||1, options[:per_page]||15) do |pager|          
           total_hits,results=hits_by_contents(q,:limit=>pager.per_page,:offset=>pager.offset)
           pager.replace get_models_by_ids(results.map { |e|e[:id].to_i})
           pager.total_entries = total_hits
         end
      end
      def index
         @index||=Index.new :path => index_path,
         :analyzer => MultilingualFerretTools::Analyzer.new
      end
      def get_models_by_ids(ids)
      	results=(self.find ids).inject({}) {|hash, model| hash[model.id]=model;hash;}
      	r=ids.map{|id| results[id]}
      end
   end
   module ClassMethods
      include Query
      def rebuild_index(limit=0)
         index=create_index(:create=>true)
         options={:order=>"id"}
         options[:limit]=limit if limit>0

         data=(self.find :all,options)
         add_data_to_index(index,data)
      end
      def continue_index(start_id)
      	index=create_index(:create=>false)
         data=(self.find :all, :conditions => ["id>=#{start_id}"],:order=>"id")
         add_data_to_index(index,data)
      end
      private      
      def logger
      	@logger||=Logger.new("log/index.log")
      end
      def add_data_to_index(index,datas)
				 c=0
         datas.each do |object|
         	  begin
            	c=c+1
		        	index<<object.to_doc
			        logger.info "[music:#{object.id}] #{c}"	 
			        if(c%30000)==0       
			     	  	logger.info "optimizing"
			     	  	index.optimize 
		     	  	end
	     	  	rescue Exception => e
	     	  		logger.error "[music:#{object.id}] #{c} error: #{e.message}"
         	  end
         end
         index.optimize
         index.close
      end
      def create_index(options)
      	Index.new :path => index_path,
         								 :field_infos=>FieldInfos.load(File.read("config/ferret.yml")),
								         :analyzer => MultilingualFerretTools::Analyzer.new,
								         :create=>options[:create]
      end
      def index_path
         "index/#{self.to_s}"
      end
   end
   module InstanceMethods
   end
end
ActiveRecord::Base.extend SearchFu::ActMethods