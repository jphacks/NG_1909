class PageVersion < ApplicationRecord
  belongs_to :page
  has_many :page_views

  def self.find_or_create_by_page(page)
    page_version = page.page_versions.last
    return page_version if page_version.present?
    page_version = PageVersion.create(page_id: page.id)
    return page_version
  end
end
