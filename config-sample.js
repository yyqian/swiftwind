'use strict';
module.exports = {
  site: {
    name: 'IMAGINE',
    url: '127.0.0.1',
    copyright: '© 2015 imagine',
    username: 'imagine',
    password: 'imagine',
    secret: 'imagine',
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
    name: 'imagine',
    port: 3000
  },
  db: {
    production: 'mongodb://localhost/imagine',
    development: 'mongodb://localhost/imagine_dev',
    test: 'mongodb://localhost/imagine_test'
  }
};
