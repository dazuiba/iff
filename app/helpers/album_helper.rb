# Methods added to this helper will be available to all templates in the application.
module AlbumHelper
	ImageSize={
		:s => "86x76",
		:m => "121x120",
		:l => "363x366"
  }
  def album_image_tag(album,options={})
		options.reverse_merge! :size=>:m,:alt=>album.name
  	imag_src=album.image? ? "http://otho.douban.com/#{options[:size]}pic/s#{album.image}.jpg" : "/images/none_150x150.gif"
  	image_tag(imag_src,options.merge(:size=>ImageSize[options[:size]]))
  end
end