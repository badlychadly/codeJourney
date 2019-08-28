class ApplicationController < ActionController::API

    def logged_in?
        !!current_user
      end
  
      def current_user
        if auth_present?
          begin
            author = Author.find_by(id: auth["author"])
            if author
              @current_user ||= author
            end
          rescue JWT::DecodeError
            author
          end
        end
      end
  
      def authenticate
        render json: {error: "unauthorized"}, status: 401 unless logged_in?
      end
  
      private
  
  
        def token
          pattern = /^Bearer /
          auth_header = request.env["HTTP_AUTHORIZATION"]
          auth_header.gsub(pattern, '') if auth_header && auth_header.match(pattern)
        end
  
        def auth
          Auth.decode(token)
        end
  
        def auth_present?
          !!request.env.fetch("HTTP_AUTHORIZATION", 
            "").gsub(/^Bearer /, '')
        end 
#   end

    # private
    def find_author
        @author ||= Author.first
    end
end
