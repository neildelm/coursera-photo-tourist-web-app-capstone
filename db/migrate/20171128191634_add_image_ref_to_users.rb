class AddImageRefToUsers < ActiveRecord::Migration
  def change
    add_reference :users, :image, foreign_key: true
  end
end
