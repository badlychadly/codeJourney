Rails.application.routes.draw do

  namespace :api do
    resources :posts
    post '/upload', to: "posts#upload"
  end

end
