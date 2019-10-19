# Rubyは2.5.0以上で
FROM ruby:2.5.0

# まじない
ENV LANG C.UTF-8

# 基本項目をインストールします. vimはお好みで
RUN apt-get update -qq && \
    apt-get install -y sudo build-essential libpq-dev vim

# yarn環境の構築
RUN apt-get install -y curl apt-transport-https wget && \
    curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
    echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list && \
    apt-get update && apt-get install -y yarn

# nodejs環境の構築
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
    apt-get install nodejs

# Cannot find module node-sass対策
RUN yarn add node-sass

# gem周り
ADD Gemfile Gemfile
ADD Gemfile.lock Gemfile.lock
RUN gem install bundler
RUN bundle install

# ワークディレクトリの設定
ENV APP_HOME /app_name
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD . $APP_HOME

#RUN yarn install
