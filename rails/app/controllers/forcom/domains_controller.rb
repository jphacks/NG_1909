class Forcom::DomainsController < ApplicationController
  def index
    # 将来的には会社ごとに返す
    domains = Domain.all
    render json: domains, state: 'SUCCESS', message: 'successfully get domains'
  end
end
