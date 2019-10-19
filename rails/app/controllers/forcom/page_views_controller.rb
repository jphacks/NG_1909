class Forcom::PageViewsController < ApplicationController

  def index_by_domain
    page_views = PageView.by_domain_id(params[:domain_id])
    render json: page_views, state: 'SUCCESS', message: 'successfully get page_views'
  end

  def index_by_page_version
    
  end

end
