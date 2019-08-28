class Api::SessionsController < ApplicationController

    def create
        # binding.pry
        author = Author.find_by(email: auth_params[:email])
        if !!author && author.authenticate(auth_params[:password])
          jwt = Auth.issue({author: author.id})
          # author.update(signed_in: true)
          render json: {jwt: jwt}
        else
          render json: {status: 401, message: "incorrect credentials"}
          # render json: {body: "invalid credentials"}, status: 401
        end
      end
  
    # def verify
    #   if logged_in?
    #     render json: {author: true}, status: 200
    #   else 
    #     authenticate
    #   end
    # end


    private 

    def auth_params
        params.require(:auth).permit(:email, :password)
    end

end