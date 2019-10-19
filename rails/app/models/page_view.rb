class PageView < ApplicationRecord
  belongs_to :session
  belongs_to :page_version
end
