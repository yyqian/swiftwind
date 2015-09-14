'use strict';
let config = require('../config');
let Post = require('../models/Post');

module.exports = {
  index: function *() {
    let query = {
      status: 'published'
    };
    if (this.query && this.query.category) {
      query.category = this.query.category;
    }
    let posts = yield Post.find(query, {_id: 0, title: 1, pid: 1}, {sort: {created_at: -1}}).exec();
    yield this.render('public/index', {
      posts: posts,
      category: query.category || '',
      site: config.site,
      layout: 'public/template'
    });
  },
  post: function *(id) {
    let post = yield Post.findOne({pid: id}, {_id: 0, __v: 0}).exec();
    yield this.render('public/post', {
      post: post,
      site: config.site,
      layout: 'public/template'
    });
  },
  imagineIndex: function *() {
    let posts = yield Post.find({}, {_id: 0, title: 1, pid: 1, category: 1, status: 1}, {sort: {created_at: -1}}).exec();
    yield this.render('private/index', {
      posts: posts,
      site: config.site,
      layout: 'private/template'
    });
  },
  imaginePost: function *(id) {
    let post = yield Post.findOne({pid: id}, {_id: 0, __v: 0}).exec();
    let posts = yield Post.find({}, {_id: 0, title: 1, pid: 1, category: 1, status: 1}, {sort: {created_at: -1}}).exec();
    yield this.render('private/index', {
      post: post,
      posts: posts,
      site: config.site,
      layout: 'private/template'
    });
  },
  imaginePostEditor: function *(id) {
    if ('new' === id) {
      yield this.render('private/post', {
        site: config.site,
        layout: 'private/template'
      });
    } else {
      let post = yield Post.findOne({pid: id}, {_id: 0, __v: 0}).exec();
      yield this.render('private/post', {
        post: post,
        site: config.site,
        layout: 'private/template'
      });
    }
  }
};
