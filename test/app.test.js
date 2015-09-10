'use strict';
process.env.NODE_ENV = 'test';
let app = require('../app.js');
let request = require('supertest').agent(app.listen());

describe('PostController', function () {
  describe('create', function () {
    it('should be able to create a post', function (done) {
      request
      .post('/post')
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.have.properties(['id', 'title', 'content', 'created_at']);
        done();
      });
    });
  });
  describe('read', function () {
    it('should be able to create a post', function (done) {
      request
      .get('/post/0')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        res.body.should.have.properties(['id', 'title', 'content', 'created_at']);
        done();
      });
    });
  });
  describe('list', function () {
    it('should be able to list posts', function (done) {
      request
      .get('/post')
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        res.body[0].should.have.properties(['id', 'title', 'content', 'created_at']);
        done();
      });
    });
  });
  describe('update', function () {
    it('should be able to update a post', function (done) {
      request
      .put('/post/0')
      .expect(201)
      .end(function (err, res) {
        if (err) return done(err);
        res.text.should.equal('update');
        done();
      });
    });
  });
  describe('delete', function () {
    it('should be able to delete a post', function (done){
      request
      .delete('/post/0')
      .expect(204, done);
    });
  });
});