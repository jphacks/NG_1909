Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'root#index'

  namespace :chromex do
    post 'start_session' => 'chromex#start_session'
    post 'page_views/'  => 'chromex#create_page_views'
  end
end
