class User < ActiveRecord::Base

  validates_format_of :logo,   
    :with => /^.*(.jpg|.JPG|.gif|.GIF|.png|.PNG|.bmp|.BMP)$/,   
    :message => "只能上传JPG、GIF、PNG、BMP的图片文件"
    
	file_column :logo, :magick => {:versions => { "l" => "160>","s"=>"48>" }}
  has_many :notes
	has_many :friends, :class_name => "User", 
										 :through=>:friendships
	has_many :followers, :class_name => "User",
											 :through=>:followships
											 
	has_many :followtos, :class_name => "User",
											 :through=>:followtoships
											 											 
	has_many :favor_musics,:through=>:favors,:source=>:favorable,:source_type=>'Music'
	
	has_many :followships,:foreign_key => "followto_id"
	has_many :followtoships,:class_name=>"Followship",
					 								:foreign_key => "follower_id" 	
	has_many :friendships
	has_many :favors
	
	validates_presence_of :email, :on => :create, :message => "请输入你的email地址"
	validates_format_of :email, :with => /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i, :on => :create, :message => "请输入合法的email地址"
	validates_uniqueness_of :email, :on => :create, :message => "你的email已经注册过。如果你忘记了密码，请到<a href='/reset_password'>这里</a>重设密码。"	
	validates_presence_of :password, :message => "请输入密码"
	validates_length_of :password, :within => 6..20,:message => "密码至少为6位"
	validates_presence_of :nick_name, :on => :create, :message => "请输入名号"
	
	ordered_errors :email,:password,:nick_name
	def activate_code_create(code_len = 8)
		chars = ('a'..'z').to_a + ('A'..'Z').to_a + (0..9).to_a
    code_array =[]
    1.upto(code_len) { code_array << chars[rand(chars.length)] }
    self.activate_code = code_array.to_s
	end	
	def hex_activate_code
		Digest::MD5.hexdigest(self.activate_code)
	end
end
