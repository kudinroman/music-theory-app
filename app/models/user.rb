class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  ROLES = %w[user admin]

  def admin?
    role == "admin"
  end

  has_many :lesson_progresses, dependent: :destroy
  has_many :lessons, through: :lesson_progresses
end
