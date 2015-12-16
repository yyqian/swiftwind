'use strict';
module.exports = {
  site: {
    name: 'Swiftwind',
    url: '127.0.0.1',
    copyright: '© 2015 swiftwind',
    username: 'swiftwind',
    password: 'swiftwind',
    secret: 'swiftwind',
    links: [{
      name: '博客',
      url: '/post'
    }, {
      name: '摄影',
      url: '#',
      newtab: true
    }],
    author: 'Yinyin Qian',
    categories: [{
      id: 'tech',
      name: '技术'
    }, {
      id: 'life',
      name: '生活'
    }]
  },
  app: {
    name: 'swiftwind',
    port: 3000
  },
  db: {
    production: 'mongodb://localhost/swiftwind',
    development: 'mongodb://localhost/swiftwind_dev',
    test: 'mongodb://localhost/swiftwind_test'
  }
};
