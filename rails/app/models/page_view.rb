class PageView < ApplicationRecord
  belongs_to :session
  belongs_to :page_version

  scope :by_domain_id, -> (domain_id) {
    joins(
      page_version: [
        page: :domain
      ]
    ).merge(Domain.where(id: domain_id))
  }
end
