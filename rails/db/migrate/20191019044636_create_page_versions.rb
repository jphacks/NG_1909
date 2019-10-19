class CreatePageVersions < ActiveRecord::Migration[5.2]
  def change
    create_table :page_versions do |t|
      t.references :page, foreign_key: true
      t.references :capture_path, foreign_key: true
      t.string :version

      t.timestamps
    end
  end
end
