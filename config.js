module.exports = {
  site: {
    name: "YYQIAN",
    url: "127.0.0.1",
    author: "Yinyin Qian",
    description: "Yinyin Qian Blog",
    keywords: "Yinyin Qian, yyqian",
    copyright: "© 2015 yyqian.com",
    username: "demo",
    password: "123123",
    secret: "demo",
    links: [{
      name: "博客",
      url: "/post"
    },{
      name: "摄影",
      url: "#",
      newtab: true
    }]
  },
  app: {
    name: 'imagine',
    port: 3000
  },
  post: {
    author: "Yinyin Qian",
    categories: [{
      id: "technology",
      name: "技术",
    }, {
      id: "life",
      name: "生活",
    }]
  },
  db: {
    production:  "mongodb://localhost/imagine",
    development: "mongodb://localhost/imagine_dev",
    test:        "mongodb://localhost/imagine_test"
  },
};