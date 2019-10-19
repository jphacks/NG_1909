class PageVersion < ApplicationRecord
  belongs_to :page
  belongs_to :capture_path
end
