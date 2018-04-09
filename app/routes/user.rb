require 'sinatra/base'

# -----------------------------------------------------------------------------

class AppController < Sinatra::Base
  # Root
  get '/' do
    # Using an e-ruby template.
    erb :'master.html'
    # Alternative if using direct static page.
    #File.read(File.join(settings.public_folder, 'index.html'))
  end

  # Error : Unknown page
  error 404 do
    erb "You were lost at <%= Time.now %>."
  end
end

# -----------------------------------------------------------------------------