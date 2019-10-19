class Forcom::PageVersionsController < ApplicationController

  def index
    page = Page.find(params[:page_id])
    page_versions = page.page_versions
    render json: {page_versions: page_versions, page: page}, state: 'SUCCESS', message: 'successfully get page_versions'
  end

end
