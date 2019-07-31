Rails.application.routes.draw do

  namespace :api do
    resources :posts
    post '/upload', to: "posts#upload"
    get '/cloud-images', to: "posts#images"
  end

end
