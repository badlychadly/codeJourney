class Post < ApplicationRecord
    scope :drafts, -> {where(published: false)}
    scope :order_by_recent, -> {order(created_at: :desc)}
    belongs_to :author
end
