Rails.application.routes.draw do

  namespace :api do
    resources :posts
    post '/upload', to: "posts#upload"
    get '/cloud-images', to: "posts#images"
    delete '/cloud-images', to: "posts#manage_cloud"
  end

end
