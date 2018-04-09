require 'sinatra/base'
require 'data_mapper'

class AppController < Sinatra::Base
  configure :development do
    DataMapper::Logger.new($stdout, :debug)
    DataMapper.setup(:default, "sqlite3://#{Dir.pwd}/db/development.db")
  end
end

# Load each models used.
require_relative 'Quote'

# Check every models integrity and migrate the database.
DataMapper.finalize
DataMapper.auto_upgrade!
