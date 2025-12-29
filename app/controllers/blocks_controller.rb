class BlocksController < ApplicationController
  before_action :authenticate_user!

  def index
    @blocks = Block.includes(lessons: :lesson_progresses)
  end
end
