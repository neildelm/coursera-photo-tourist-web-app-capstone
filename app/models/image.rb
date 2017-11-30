class Image < ActiveRecord::Base
  include Protectable
  attr_accessor :image_content

  has_many :thing_images, inverse_of: :image, dependent: :destroy
  has_many :things, through: :thing_images
  has_one :user

  scope :no_user,  ->{ joins("left join Users on Users.image_id = Images.id").where("Users.id is null") }

  def basename
    caption || "image-#{id}"
  end
end
