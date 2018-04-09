#!/usr/local/bin/rackup

require File.join(File.dirname(__FILE__), 'app/main')
run AppController.new
