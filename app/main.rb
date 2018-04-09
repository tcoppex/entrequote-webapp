# -----------------------------------------------------------------------------
# The server is built using a modular approach by extending the Sinatra::Base
# class via the core class AppController.
# 
# This is the entrypoint wich specify the server configurations and load the 
# initializers for the Models / DB and the routers.
# -----------------------------------------------------------------------------
require 'sinatra/base'
require_relative 'models/init'
require_relative 'routes/init'

class AppController < Sinatra::Base
  configure do
    set :app_file, __FILE__
    set :root, File.dirname(__FILE__)
    set :public_folder, Proc.new { File.join(root, "../public") }
    set :views, Proc.new { File.join(root, "views/") }
  end

  configure :development do
    enable :logging, :dump_errors, :raise_errors
  end

  configure :production do
    disable :raise_errors, :show_exceptions
  end
end
