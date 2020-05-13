const express = require("express");
const redis = require("redis");
const { MongoClient, ObjectID } = require("mongodb");
const app = express();
const client = redis.createClient();
const port = 3004;

document.cookie = "key=value";

function alertCookie() {
  alert(document.cookie);
}
