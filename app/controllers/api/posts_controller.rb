class Api::PostsController < ApplicationController

    def index
        render json: Post.all
    end

    def create
        binding.pry
    end

    private 

    def post_params
        params.require(:post).permit(:tite, :sub_title, :body)
    end

end