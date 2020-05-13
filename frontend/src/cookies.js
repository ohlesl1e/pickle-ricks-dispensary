const express = require("express");
const redis = require("redis");

const App = () => {
  return <button onclick="alertCookie()">Show cookies</button>;
};

export default App;
