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

ActiveRecord::Schema.define(:version => 20100501110324) do

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

  create_table "album_statics", :force => true do |t|
    t.integer "album_id", :null => false
    t.integer "count"
  end

  create_table "album_tags", :force => true do |t|
    t.integer "album_id", :null => false
    t.string  "tag",      :null => false
    t.string  "count"
  end

  create_table "albums", :force => true do |t|
    t.integer "singer_id",    :null => false
    t.string  "name",         :null => false
    t.string  "uid"
    t.string  "publish_date"
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
    t.integer "user_id",        :null => false
    t.integer "favorable_id",   :null => false
    t.string  "favorable_type", :null => false
    t.date    "created_on"
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
    t.integer "music_id"
    t.text    "content"
  end

  create_table "music_albums", :force => true do |t|
    t.integer "album_id", :null => false
    t.integer "music_id", :null => false
    t.integer "position"
  end

  create_table "music_ratings", :force => true do |t|
    t.integer "user_id",  :null => false
    t.integer "music_id", :null => false
    t.integer "mark",     :null => false
  end

  create_table "musics", :force => true do |t|
    t.integer "singer_id",    :null => false
    t.string  "name",         :null => false
    t.string  "download_url"
  end

  create_table "notes", :force => true do |t|
    t.integer  "user_id",    :null => false
    t.text     "content",    :null => false
    t.date     "created_on"
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "play_urls", :force => true do |t|
    t.integer "music_id", :null => false
    t.string  "url",      :null => false
  end

  create_table "record_parse_froms", :force => true do |t|
    t.integer  "record_id",   :null => false
    t.string   "record_type", :null => false
    t.string   "site"
    t.integer  "from_id",     :null => false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "settings", :force => true do |t|
    t.integer "user_id"
    t.string  "logo"
    t.string  "intro"
  end

  create_table "shares", :force => true do |t|
    t.string   "title"
    t.text     "description"
    t.string   "url"
    t.text     "tags"
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "singer_infos", :force => true do |t|
    t.integer "singer_id"
    t.string  "country"
    t.string  "eng_name"
    t.text    "info"
    t.string  "clazz_name"
  end

  create_table "singers", :force => true do |t|
    t.string "name",  :null => false
    t.string "image"
  end

  create_table "users", :force => true do |t|
    t.string   "email",                            :null => false
    t.string   "password",                         :null => false
    t.string   "nick_name"
    t.string   "activate_code"
    t.datetime "created_at"
    t.boolean  "activate",      :default => false
  end

end
