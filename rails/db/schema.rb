# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_10_19_045226) do

  create_table "domains", force: :cascade do |t|
    t.string "root_domain"
    t.string "all_domain"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "page_versions", force: :cascade do |t|
    t.integer "page_id"
    t.integer "capture_path_id"
    t.string "version"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["capture_path_id"], name: "index_page_versions_on_capture_path_id"
    t.index ["page_id"], name: "index_page_versions_on_page_id"
  end

  create_table "page_views", force: :cascade do |t|
    t.integer "session_id"
    t.integer "page_version_id"
    t.integer "next_page_version_id"
    t.datetime "visit_at"
    t.json "gazes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["next_page_version_id"], name: "index_page_views_on_next_page_version_id"
    t.index ["page_version_id"], name: "index_page_views_on_page_version_id"
    t.index ["session_id"], name: "index_page_views_on_session_id"
  end

  create_table "pages", force: :cascade do |t|
    t.integer "domain_id"
    t.text "path"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["domain_id"], name: "index_pages_on_domain_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.integer "user_id"
    t.integer "domain_id"
    t.string "device_kind"
    t.float "device_width"
    t.float "device_height"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["domain_id"], name: "index_sessions_on_domain_id"
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
