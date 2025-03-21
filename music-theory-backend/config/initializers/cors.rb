Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "*" # Позже можно заменить на домен фронтенда
    resource "*", headers: :any, methods: [ :get, :post, :patch, :put, :delete, :options ]
  end
end
