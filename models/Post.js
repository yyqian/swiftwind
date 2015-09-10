'use strict';
let mongoose  = require('mongoose');

let PostSchema = mongoose.Schema({
  pid:        {type: String, default: Date.now(), unique: true, index: true},
  created_at: {type: Date, default: Date.now()},
  updated_at: {type: Date, default: Date.now()},
  title:      {type: String},
  markdown:   {type: String},
  html:       {type: String},
  category:   {type: String},
  status:     {type: String},
  tags:       [String]
});

module.exports = mongoose.model('Post', PostSchema);