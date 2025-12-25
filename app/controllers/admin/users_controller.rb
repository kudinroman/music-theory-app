class Admin::UsersController < Admin::BaseController
  before_action :find_user, only: [ :edit, :update, :destroy ]

  def index
    @users = User.order(:email)
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to admin_users_path, notice: "User created"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @user.update(user_params)
      redirect_to admin_users_path, notice: "User updated"
    else
      render :edit
    end
  end

  def destroy
    if @user == current_user
      redirect_to admin_users_path, alert: "You can't delete yourself"
    else
      @user.destroy
      redirect_to admin_users_path, notice: "User deleted"
    end
  end

  private

  def find_user
    @user = User.find(params[:id])
  end

  def user_params
    attrs = params
              .fetch(:user, {})
              .to_unsafe_h
              .slice(
                "email",
                "password",
                "password_confirmation",
                "role"
              )

    # не затираем пароль, если он пустой
    if attrs["password"].blank?
      attrs.delete("password")
      attrs.delete("password_confirmation")
    end

    attrs
  end
end
