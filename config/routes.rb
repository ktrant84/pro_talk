Rails.application.routes.draw do
  root 'stories#index'

  devise_for :users
  devise_scope :user do
    get '/login' => 'sessions#new'
    get '/logout' => 'sessions#destroy'
    get '/signup' => 'registrations#new'
  end

  resources :stories

  scope '/admin' do
    resources :access_codes, only: [:index, :create, :destroy]
  end
end
