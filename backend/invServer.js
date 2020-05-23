const express = require('express');
const { MongoClient, ObjectID } = require('mongodb');
const app = express();
const port = 3005;

var bodyParser = require('body-parser');
app.use(bodyParser());

// Connection URL
const url = 'mongodb+srv://dmitry:sfsu667@cluster0-mxobn.mongodb.net/test?retryWrites=true&w=majority';

// Database Name
const dbName = 'sfsu667';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(err => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log("connected to db");

const db=client.db(dbName);

app.get('/api/inventory/get', (req,res) => {
  db.collection('Inventory')
  .find({}).toArray( (err, result) =>{
    if( err ) console.log(err);
    res.send(result);
  });

});

  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});