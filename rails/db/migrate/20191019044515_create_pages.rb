class CreatePages < ActiveRecord::Migration[5.2]
  def change
    create_table :pages do |t|
      t.references :domain, foreign_key: true
      t.text :path

      t.timestamps
    end
  end
end
