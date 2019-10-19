class Chromex::ChromexController < ApplicationController
  def start_session
    # domainとpathが飛んでくる
    all_domain = params[:domain]
    path = params[:path]
    # 必要な物を作成
    user = User.find(1) # 将来的にはtokenを使ってcurrent_userを取れるようにする
    domain = Domain.find_or_create_by_all_domain(all_domain)
    page = Page.find_or_create_by(path: path, domain: domain)
    # session_idとpage_version_idを返す
    session = Session.find_or_create_by_user_and_domain( user, domain )
    page_version = PageVersion.find_or_create_by_page(page)
    render json: { status: 'SUCCESS', message: 'success', data: { session_id: session.id, page_version_id: page_version.id } }
  end

  def create_page_views
    page = PageView.create(page_view_params)
    p "============"
    p page.errors
    p "============"
    render json: { result: "SUCCESS" }, state: 'SUCCESS', message: 'successfully get'
  end

  private
  def page_view_params
    params.permit(
      :session_id, :page_version_id, :visit_at, gazes: [:timeStamp, :x, :y]
    )
  end
end
