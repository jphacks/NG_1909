class Page < ApplicationRecord
  belongs_to :domain
  has_many :page_versions
end
