class PageView < ApplicationRecord
  belongs_to :session
  belongs_to :page_version
  belongs_to :next_page_view, foreign_key: { to_table: :page_views }, required: false

  has_one :page, through: :page_version

  after_create :set_last_page_view_next_page_view
  def set_last_page_view_next_page_view
    p "呼ばれた"
    begin
      last_page_view = self.session.page_views.where("created_at < ?", self.created_at).last
      p "ないよ" if last_page_view.blank?
      p "あるよ" if last_page_view.present?
      p last_page_view  if last_page_view.present?
      p "あるよ" if last_page_view.present?
      p self.id
      last_page_view.update(next_page_view_id: self.id) if last_page_view.present?
    rescue => e
      p "えらえっr"
      p e
      p "えらえっr"
    end
  end

  scope :by_domain_id, -> (domain_id) {
    joins(
      page_version: [
        page: :domain
      ]
    ).merge(Domain.where(id: domain_id))
  }

  scope :by_page_version_id, -> (page_version_id) {
    joins(:page_version).merge(PageVersion.where(id: page_version_id))
  }

end
