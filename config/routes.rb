ActionController::Routing::Routes.draw do |map|	
	map.connect '',:controller => "home",:action => 'index'
	map.connect 'play.mp3',:controller=>"home",:action=>"re_music"	
	map.connect 'login', :controller => "user",:action=>"login" 
	map.connect 'logout', :controller => "user",:action=>"logout" 
	map.connect 'register', :controller => "user",:action=>"register" 
	map.connect 'activate', :controller => "user",:action=>"activate" 
  
  map.resources :music,:collection =>{:search => :any}
  map.resources :singer,:collection =>{:search => :any}
  map.resources :album,:note,:user
  map.with_options :controller => "my" do |my|
    my.my '', :action => 'index'
    my.my_note 'my/note', :action => 'notes'
  end
  map.connect ':controller/:action/:id'
  map.connect ':controller/:action/:id.:format'
end