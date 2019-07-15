class Post < ApplicationRecord
    scope :drafts, -> {where(published: false)}
    belongs_to :author
end
