class Api::PostsController < ApplicationController
    before_action :find_author

    def index
        render json: Post.order_by_recent
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

    def destroy
        # binding.pry
        post = @author.posts.find_by(id: params[:id])
        post.destroy
        # binding.pry
        render json: post
    end

    def upload
       image =  Cloudinary::Uploader.upload(params['file'])
       render json: image

    end

    def images
        images = Cloudinary::Api.resources
        render json: images
    end

    def manage_cloud
        # binding.pry
        deleted = Cloudinary::Api.delete_resources(public_ids: params['public_ids'])
        render json: deleted
    end

    private 

    def post_params
        params.require(:post).permit(:title, :sub_title, :body)
    end

end