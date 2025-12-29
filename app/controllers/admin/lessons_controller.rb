class Admin::LessonsController < Admin::BaseController
  before_action :set_block
  before_action :set_lesson, only: %i[edit update destroy]

  def index
    @lessons = @block.lessons
  end

  def new
    @lesson = @block.lessons.new
  end

  def create
    @lesson = @block.lessons.new(lesson_params)
    if @lesson.save
      redirect_to admin_block_lessons_path(@block), notice: "Lesson created"
    else
      render :new
    end
  end

  def edit; end

  def update
    if @lesson.update(lesson_params)
      redirect_to admin_block_lessons_path(@block), notice: "Lesson updated"
    else
      render :edit
    end
  end

  def destroy
    @lesson.destroy
    redirect_to admin_block_lessons_path(@block)
  end

  private

  def set_block
    @block = Block.find(params[:block_id])
  end

  def set_lesson
    @lesson = @block.lessons.find(params[:id])
  end

  def lesson_params
    params.require(:lesson)
          .permit(:title, :description, :status, :position, :data)
  end
end
