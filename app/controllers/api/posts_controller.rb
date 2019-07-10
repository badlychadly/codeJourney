class Api::PostsController < ApplicationController
    before_action :find_author

    def index
        render json: Post.all
    end

    def create
        post = @author.posts.create(post_params)
        render json: post
    end

    def update
        post = @author.posts.find_by(id: params[:id])
        post.update(post_params)
        render json: post
    end

    private 

    def post_params
        params.require(:post).permit(:title, :sub_title, :body)
    end

end