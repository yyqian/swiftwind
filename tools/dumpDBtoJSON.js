'use strict';
let fs = require('fs');
let Post = require('../models/Post');
let config = require('../config');
let mongoose = require('mongoose');

mongoose.connect(config.db.production);
let db = mongoose.connection;
db.once('open', function () {
  Post.find({}, function (err, posts) {
    if (err) {
      throw err;
    }
    fs.writeFile('imagine-dump.json', JSON.stringify(posts), 'utf8', function (err1) {
      if (err) {
        throw err1;
      }
      console.log('It\'s saved!');
      mongoose.disconnect();
    });
  });
});
