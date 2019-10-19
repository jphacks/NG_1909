class Domain < ApplicationRecord

  has_many :pages

  before_save :set_root_domain
  def set_root_domain
    splited = self.all_domain.split(".")
    self.root_domain = splited[-2] + "." + splited[-1]
  end

  def self.find_or_create_by_all_domain(all_domain)
    # あったら
    domain = Domain.find_by(all_domain: all_domain)
    return domain if domain.present?
    #  なかったら
    domain = Domain.create(all_domain: all_domain)
    return domain
  end
end
