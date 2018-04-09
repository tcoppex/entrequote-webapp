require 'data_mapper'

# -----------------------------------------------------------------------------

class Quote
  include DataMapper::Resource
  property :id,         Serial
  property :text,       String, :required => true, :length => 4096
  property :src,        URI,    :required => true
  property :author,     String, :length => 64
  property :created_at, Integer #EpochTime

  # If relation exist between models, we could also use 
  # 'has' & 'belong_to' directives.
end

# -----------------------------------------------------------------------------