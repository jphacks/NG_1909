class Session < ApplicationRecord
  belongs_to :user
  belongs_to :domain

  scope :latest_session, -> (user_id, domain_id) {
    where(user_id: user_id).
    where(domain_id: domain_id).
    where("? <= updated_at", 1.hours.ago)
  }


  def self.find_or_create_by_user_and_domain(user, domain)
    session = Session.latest_session(user.id, domain.id).first
    return session if session.present?
    session = Session.create(user_id: user.id, domain_id: domain.id)
    return session
  end
end
