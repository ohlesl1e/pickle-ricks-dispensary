const express = require("express");
const redis = require("redis");
const app = express();
const redisClient = redis.createClient();
const port = 3004;

(function alertCookie() {
  Number.isInteger =
    Number.isInteger ||
    function (value) {
      return (
        typeof value === "number" &&
        isFinite(value) &&
        Math.floor(value) === value
      );
    };

  document.cookie = "key=value";
  alert(document.cookie);
  var redisClient = redis.createClient(6379, "127.0.0.1:6379");
  var RedisStore = require("connect-redis")(session);

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true },
    })
  );

  redisClient.on("error", function (err) {
    console.log(" Error " + err);
  });

  var Cookie = require("tiny-cookie");

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
});
