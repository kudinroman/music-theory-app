class Block < ApplicationRecord
  has_many :lessons, dependent: :destroy

  enum status: {
    draft: 0,
    published: 1,
    archived: 2
  }

  validates :title, presence: true

  default_scope { order(:position, :created_at) }
end
