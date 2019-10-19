class PageVersion < ApplicationRecord
  belongs_to :page
  belongs_to :capture_path

  def self.find_or_create_by_page(page)
    page_version = page.page_versions.last
    return page_version if page_version.present?
    page_version = PageVersion.create(page_id: page.id)
    return page_version
  end
end
