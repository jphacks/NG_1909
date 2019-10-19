class CreateDomains < ActiveRecord::Migration[5.2]
  def change
    create_table :domains do |t|
      t.string :root_domain
      t.string :all_domain

      t.timestamps
    end
  end
end
