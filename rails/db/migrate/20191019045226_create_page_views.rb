class CreatePageViews < ActiveRecord::Migration[5.2]
  def change
    create_table :page_views do |t|
      t.references :session, foreign_key: true
      t.references :page_version, foreign_key: true
      t.references :next_page_view, foreign_key: { to_table: :page_views }
      t.datetime :visit_at
      t.json :gazes

      t.timestamps
    end
  end
end
