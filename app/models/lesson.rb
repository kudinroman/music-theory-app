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

  def data=(value)
    if value.is_a?(String)
      begin
        super(JSON.parse(value))
      rescue JSON::ParserError
        super(nil)
      end
    else
      super(value)
    end
  end

  def data_pretty
    return "" if data.blank?
    return JSON.pretty_generate(data) if data.is_a?(Hash)
    data.to_s
  end
end
