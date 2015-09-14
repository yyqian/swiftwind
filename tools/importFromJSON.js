'use strict';
let fs = require('fs');
let Post = require('../models/Post');
let config = require('../config');
let mongoose = require('mongoose');

let createPost = function (json) {
  let post = {
    pid: json.pid,
    title: json.title,
    markdown: json.markdown,
    html: json.html,
    created_at: json.createdAt,
    updated_at: json.updatedAt,
    category: ('technology' === json.category) ? 'tech' : 'life'
  };
  Post.create(post, function (err, doc) {
    if (err) {
      console.log(err);
    } else {
      console.log('Created: ' + doc.title);
    }
  });
};

fs.readFile('./light.json', 'utf8', function (err, data) {
  if (err) { throw err; }
  let posts = JSON.parse(data);
  mongoose.connect(config.db.production);
  let db = mongoose.connection;
  db.once('open', function () {
    for (let i = 0; i < posts.length; i++) {
      createPost(posts[i]);
    }
  });
});
