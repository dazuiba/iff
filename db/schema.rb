# This file is auto-generated from the current state of the database. Instead of editing this file, 
# please use the migrations feature of Active Record to incrementally modify your database, and
# then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your database schema. If you need
# to create the application database on another system, you should be using db:schema:load, not running
# all the migrations from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20081208132613) do

  create_table "add_friend_requests", :force => true do |t|
    t.integer "user_id",                       :null => false
    t.integer "to_user_id",                    :null => false
    t.date    "created_on"
    t.boolean "allow",      :default => false
  end

  create_table "album_relateds", :force => true do |t|
    t.integer "album_id",   :null => false
    t.integer "related_id", :null => false
    t.integer "position"
  end

  add_index "album_relateds", ["album_id"], :name => "Index_2"

  create_table "album_statics", :force => true do |t|
    t.integer "album_id", :null => false
    t.integer "count"
  end

  add_index "album_statics", ["album_id"], :name => "Index_2"
  add_index "album_statics", ["count"], :name => "Index_3"

  create_table "album_tags", :force => true do |t|
    t.integer "album_id",                 :null => false
    t.string  "tag",      :default => "", :null => false
    t.integer "count"
  end

  add_index "album_tags", ["album_id"], :name => "Index_2"
  add_index "album_tags", ["tag"], :name => "Index_3"

  create_table "albums", :force => true do |t|
    t.integer "singer_id",                       :null => false
    t.string  "uid"
    t.string  "publish_date"
    t.string  "name",         :default => "",    :null => false
    t.string  "alias"
    t.boolean "checked",      :default => false
    t.integer "image"
  end

  add_index "albums", ["name"], :name => "Index_3"
  add_index "albums", ["publish_date"], :name => "Index_4"
  add_index "albums", ["singer_id"], :name => "Index_2"

  create_table "albums_no_music", :force => true do |t|
    t.integer "singer_id",                       :null => false
    t.string  "uid"
    t.string  "publish_date"
    t.string  "name",         :default => "",    :null => false
    t.string  "alias"
    t.boolean "checked",      :default => false
    t.integer "image"
  end

  create_table "comments", :force => true do |t|
    t.integer  "user_id",          :null => false
    t.integer  "commentable_id"
    t.string   "commentable_type"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "favors", :force => true do |t|
    t.integer "user_id",                       :null => false
    t.integer "favorable_id"
    t.string  "favorable_type"
    t.date    "created_on"
    t.integer "grade",          :default => 0
  end

  create_table "followships", :force => true do |t|
    t.integer "user_id",     :null => false
    t.integer "follower_id", :null => false
  end

  create_table "friendships", :force => true do |t|
    t.integer "user_id",   :null => false
    t.integer "friend_id", :null => false
  end

  create_table "lyrics", :force => true do |t|
    t.integer "music_id", :default => 0, :null => false
    t.text    "content"
  end

  add_index "lyrics", ["music_id"], :name => "music_index", :unique => true

  create_table "music_albums", :force => true do |t|
    t.integer "album_id", :null => false
    t.integer "music_id", :null => false
    t.integer "position"
  end

  add_index "music_albums", ["album_id"], :name => "Index_2"
  add_index "music_albums", ["music_id"], :name => "Index_3"

  create_table "music_ratings", :force => true do |t|
    t.integer "user_id",  :null => false
    t.integer "music_id", :null => false
    t.integer "mark",     :null => false
  end

  create_table "musics", :force => true do |t|
    t.integer "singer_id",                      :null => false
    t.string  "name",           :default => "", :null => false
    t.string  "download_url"
    t.string  "play_url"
    t.string  "play_url2"
    t.string  "play_url3"
    t.string  "play_url4"
    t.string  "play_url5"
    t.integer "play_url_count"
  end

  add_index "musics", ["singer_id"], :name => "Index_2"

  create_table "notes", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.text     "content",    :null => false
    t.date     "created_on"
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "play_urls", :force => true do |t|
    t.integer "music_id",                                :null => false
    t.string  "url",      :limit => 800, :default => "", :null => false
  end

  add_index "play_urls", ["id"], :name => "Index_3", :unique => true
  add_index "play_urls", ["music_id"], :name => "Index_2"
  add_index "play_urls", ["url"], :name => "Index_4"

  create_table "record_parse_froms", :force => true do |t|
    t.integer  "record_id",                   :null => false
    t.string   "record_type", :default => "", :null => false
    t.string   "site"
    t.integer  "from_id",                     :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "settings", :force => true do |t|
    t.integer "user_id"
    t.string  "logo"
    t.string  "intro"
  end

  create_table "singers", :force => true do |t|
    t.string  "name",        :default => "", :null => false
    t.integer "music_count"
    t.integer "album_count"
  end

  add_index "singers", ["album_count"], :name => "Index_4"
  add_index "singers", ["music_count"], :name => "Index_3"
  add_index "singers", ["name"], :name => "Index_2"

  create_table "singers_no_music", :force => true do |t|
    t.string "name", :default => "", :null => false
  end

  create_table "system_settings", :force => true do |t|
    t.string "name",  :limit => 300, :default => "", :null => false
    t.text   "value"
  end

  create_table "tb_crawler_errors", :force => true do |t|
    t.string  "extractor"
    t.string  "error_msg"
    t.integer "obj_id"
    t.string  "url"
  end

  create_table "temp", :id => false, :force => true do |t|
    t.integer "max(id)"
  end

  create_table "temp_url", :force => true do |t|
  end

  create_table "temp_url2", :force => true do |t|
  end

  create_table "users", :force => true do |t|
    t.string   "email",                       :default => "",    :null => false
    t.string   "password",                    :default => "",    :null => false
    t.string   "nick_name"
    t.string   "activate_code"
    t.datetime "created_at"
    t.boolean  "activate",                    :default => false
    t.string   "logo",          :limit => 45, :default => "",    :null => false
    t.string   "intro",         :limit => 45, :default => "",    :null => false
  end

end
