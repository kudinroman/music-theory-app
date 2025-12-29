class LessonsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_lesson

  def show
    @progress = LessonProgress.find_or_create_by!(
      user: current_user,
      lesson: @lesson
    )
  end

  def update_status
    progress = LessonProgress.find_or_create_by!(
      user: current_user,
      lesson_id: params[:id]
    )

    progress.update!(status: params[:status])
    redirect_back fallback_location: blocks_path
  end

  private

  def set_lesson
    @lesson = Lesson.find(params[:id])
  end
end
