Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'root#index'

  namespace :chromex do
    post 'start_session' => 'chromex#start_session'
    post 'page_views/'  => 'chromex#create_page_views'
  end
  namespace :forcom do
    get 'domains' => 'domains#index'
    get 'domains/:domain_id/page_views' => 'page_views#index_by_domain'
    get 'pages/:page_id/page_versions' => 'page_versions#index'
    get 'page_versions/:page_version_id/page_views' => 'page_views#index_by_page_version'
  end
end
