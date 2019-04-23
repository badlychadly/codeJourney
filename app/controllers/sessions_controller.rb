class SessionsController < ApplicationController

    def create
        # author = Author.find_by(email: auth_params[:email])
        # if author&.authenticate(auth_params[:password])
        #     jwt = Auth.issue({author: author.name})
        #     render json: {jwt: jwt}
        # else
        #     render json: {status: 401, message: "incorrect credentials"}
        # end
    end


    private 

    def auth_params
        params.require(:auth).permit(:email, :password)
    end

end