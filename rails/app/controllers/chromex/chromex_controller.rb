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
    render json: { session_id: session.id, page_version_id: page_version.id }, state: 'SUCCESS', message: 'successfully get'
  end
end
