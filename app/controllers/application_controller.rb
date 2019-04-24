class ApplicationController < ActionController::API

    private
    def find_author
        @author ||= Author.first
    end
end
