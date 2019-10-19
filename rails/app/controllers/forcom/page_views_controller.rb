class Forcom::PageViewsController < ApplicationController

  def index_by_domain
    domain = Domain.find(params[:domain_id])
    page_views = PageView.by_domain_id(params[:domain_id])
    render json: {page_views: page_views, domain: domain}, state: 'SUCCESS', message: 'successfully get page_views'
  end

  def index_by_page_version
    page_views = PageView.by_page_version_id(params[:page_version_id])
    render json: {page_views: page_views}, state: 'SUCCESS', message: 'successfully get page_views'
  end

end
