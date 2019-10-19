class CreatePageVersions < ActiveRecord::Migration[5.2]
  def change
    create_table :page_versions do |t|
      t.references :page, foreign_key: true
      t.text :capture_path
      t.string :version

      t.timestamps
    end
  end
end
