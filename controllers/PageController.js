'use strict';
let config = require('../config');
let Post = require('../models/Post');

module.exports = {
  index: function*() {
    let query = {};
    if (this.query && this.query.category) {
      query.category = this.query.category;
    }
    let posts = yield Post.find(query, {_id: 0, title: 1, pid: 1}, {sort: {created_at: -1}}).exec();
    yield this.render('public/index', {
      posts: posts,
      category: query.category || '',
      config: config,
      layout: 'public/template'
    });
  },
  post: function*(id) {
    let post = yield Post.findOne({pid: id}, {_id: 0, __v:0}).exec();
    yield this.render('public/post', {
      post: post,
      config: config,
      layout: 'public/template'
    });
  }
};