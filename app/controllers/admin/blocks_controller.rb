class Admin::BlocksController < Admin::BaseController
  before_action :set_block, only: %i[edit update destroy]

  def index
    @blocks = Block.all
  end

  def new
    @block = Block.new
  end

  def create
    @block = Block.new(block_params)
    if @block.save
      redirect_to admin_blocks_path, notice: "Block created"
    else
      render :new
    end
  end

  def edit; end

  def update
    if @block.update(block_params)
      redirect_to admin_blocks_path, notice: "Block updated"
    else
      render :edit
    end
  end

  def destroy
    @block.destroy
    redirect_to admin_blocks_path, notice: "Block deleted"
  end

  private

  def set_block
    @block = Block.find(params[:id])
  end

  def block_params
    params.require(:block).permit(:title, :description, :status, :position)
  end
end
