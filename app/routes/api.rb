require 'sinatra/base'
require 'sinatra/namespace'
require_relative '../models/Quote'


class AppController < Sinatra::Base
  register Sinatra::Namespace

  namespace '/api/quotes' do
    before do
      # assure the namespace to expect and send JSON data.
      content_type 'application/json'
    end

    helpers do
      def serialize(quote)
        quote.to_json
      end

      def serialize_error(msg)
        { message: msg }.to_json
      end

      # Process the JSON parameters sent, or halt as 400-BAD-REQUEST.
      def json_params
        begin
          JSON.parse(request.body.read)
        rescue
          halt 400, serialize_error('Invalid JSON.')
        end
      end

      # Set the class ref of quote to one matching the json params, if any.
      def quote
        @quote ||= Quote.get(params[:id])
      end

      # Halt & return a not found error if not quote match the json sent.
      def halt_if_not_found!
        halt 404, serialize_error('quote not found') unless quote
      end
    end    

    #
    get '/count' do
      Quote.count().to_json
    end

    # return a sorted set of quotes.
    get '' do
      first_quote = (params[:start] || 0).to_i
      quotes_per_pages = (params[:limit] || 16).to_i

      quotes = Quote.all(
        :offset => first_quote,
        :limit => quotes_per_pages,
        :order => [ :created_at.desc ]
      )
      quotes.to_json
    end

    # save a new quote.
    post '' do
      quote = Quote.new(json_params)
      halt 422, serialize(quote) unless quote.save
      redirect '/', 201
    end

    # update a given quote.
    patch '/:id' do |id|
      halt_if_not_found!
      halt 422, serialize(quote) unless quote.update(json_params)
      serialize(quote)
    end

    # destroy a given quote.
    delete '/:id' do |id|
      halt_if_not_found!
      quote.destroy if quote
      status 204
    end
  end
end