class CreateBlocks < ActiveRecord::Migration[7.2]
  def change
    create_table :blocks do |t|
      t.string :title
      t.text :description
      t.integer :status
      t.integer :position

      t.timestamps
    end
  end
end
