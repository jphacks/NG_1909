class CreateSessions < ActiveRecord::Migration[5.2]
  def change
    create_table :sessions do |t|
      t.references :user, foreign_key: true
      t.references :domain, foreign_key: true
      t.string :device_kind
      t.float :device_width
      t.float :device_height

      t.timestamps
    end
  end
end
