class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :sub_title
      t.text :body
      t.belongs_to :author, index: true

      t.timestamps
    end
  end
end
