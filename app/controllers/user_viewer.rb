class UserViewer
	attr_reader :user
	def initialize(user,params)
		@user=user
		@params=params
	end	
	def notes
		user.notes.paginate(:page=>@params[:page]||1)
	end
	def musics
		user.favor_musics.paginate(:page=>@params[:page]||1)
	end
end