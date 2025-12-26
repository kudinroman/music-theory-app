class CreateLessonProgresses < ActiveRecord::Migration[7.2]
  def change
    create_table :lesson_progresses do |t|
      t.references :user, null: false, foreign_key: true
      t.references :lesson, null: false, foreign_key: true
      t.integer :status

      t.timestamps
    end

    add_index :lesson_progresses,
      [ :user_id, :lesson_id ],
      unique: true
  end
end
