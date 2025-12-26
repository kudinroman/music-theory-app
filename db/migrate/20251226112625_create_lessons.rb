class CreateLessons < ActiveRecord::Migration[7.2]
  def change
    create_table :lessons do |t|
      t.references :block, null: false, foreign_key: true
      t.string :title
      t.text :description
      t.integer :status
      t.jsonb :data
      t.integer :position

      t.timestamps
    end

    add_index :lessons, :data, using: :gin
  end
end
