RailsAdmin.config do |config|
  config.authenticate_with do
    unless user_signed_in? && current_user.admin?
      redirect_to main_app.new_user_session_path
      false
    end
  end

  config.current_user_method(&:current_user)
end
