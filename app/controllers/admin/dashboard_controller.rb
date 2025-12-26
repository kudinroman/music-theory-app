class Admin::DashboardController < Admin::BaseController
  def index
    @blocks_count  = ::Block.count
    @lessons_count = ::Lesson.count
    @users_count   = ::User.count
  end
end
