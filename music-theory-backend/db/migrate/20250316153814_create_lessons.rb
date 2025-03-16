class CreateLessons < ActiveRecord::Migration[7.2]
  def change
    create_table :lessons do |t|
      t.string :title
      t.text :description
      t.string :difficulty

      t.timestamps
    end
  end
end
