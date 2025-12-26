class Lesson < ApplicationRecord
  belongs_to :block
  has_many :lesson_progresses, dependent: :destroy

  enum status: {
    draft: 0,
    published: 1,
    archived: 2
  }

  validates :title, presence: true

  default_scope { order(:position, :created_at) }
end
