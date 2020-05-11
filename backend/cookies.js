const express = require("express");
const redis = require("redis");
const { MongoClient, ObjectID } = require("mongodb");
const app = express();
const client = redis.createClient();
const port = 3004;

app.use(express.json());

const url = "mongodb://localhost:27017";

const dbName = "MyDatabase";

const dbClient = new MongoClient(url);

var Cookie = require("tiny-cookie");

var redisClient = redis.createClient(6379, "127.0.0.1");
var RedisStore = require("connect-redis")(session);
var session = require("express-session");

app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: "gBpwmwE0PmyDKPuLhhmY8CONJQW3TnCujQuoE8nVao",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

redisClient.on("error", function (err) {
  console.log(" Error " + err);
});

var VueCookie = {
  install: function (Vue) {
    Vue.prototype.$cookie = this;
    Vue.cookie = this;
  },
  set: function (name, value, daysOrOptions) {
    var opts = daysOrOptions;
    if (Number.isInteger(daysOrOptions)) {
      opts = { expires: daysOrOptions };
    }
    return Cookie.set(name, value, opts);
  },

  get: function (name) {
    return Cookie.get(name);
  },

  delete: function (name, options) {
    var opts = { expires: -1 };
    if (options !== undefined) {
      opts = Object.assign(options, opts);
    }
    this.set(name, "", opts);
  },
};

if (typeof exports == "object") {
  module.exports = VueCookie;
} else if (typeof define == "function" && define.amd) {
  define([], function () {
    return VueCookie;
  });
} else if (window.Vue) {
  window.VueCookie = VueCookie;
  Vue.use(VueCookie);
}
