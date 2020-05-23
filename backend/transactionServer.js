const express = require('express');
const KafkaProducer = require('./KafkaProducer.js');
const producer = new KafkaProducer('email');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3006;
const redis = require('redis');
const clientr = redis.createClient();


var bodyParser = require('body-parser');
app.use(bodyParser());


const url = 'mongodb+srv://dmitry:sfsu667@cluster0-mxobn.mongodb.net/test?retryWrites=true&w=majority';

const dbName = 'sfsu667';

const client = new MongoClient(url);

client.connect(err => {
  if (err) {
    console.log(err);
    process.exit(1);
  }


  const db = client.db(dbName);

  app.post('/api/receipts/get', (req, res) => {
    db.collection('finalUserInfo')
      .findOne({
        email: req.body.email
      })
      .then(doc => {
        res.send(doc.receipts);
      })
      .catch(e => {
        console.log(e);
        res.status(404).send('error');
      });
  })

  app.post('/api/receipts/create', (req, res) => {
    let receipt_id = req.body.receipt_id;
    let date = req.body.date;
    let totalPrice = req.body.price;
    let items_purchased = req.body.items;

    const sellerMap = {}
    for (const item of req.body.items) {
      if (!sellerMap[item.seller]) {
        sellerMap[item.seller] = [item]
      } else {
        sellerMap[item.seller].push(item)
      }
    }

    for (const seller of sellerMap) {
      let amount = 0
      seller.forEach(element => {
        amount += element.subtotal
      });
      db.collection('finalUserInfo').findOne({
        userId: element.seller
      }).then(doc => {
        if (doc.receipts) {
          db.collection('finalUserInfo').updateOne({
            userId: element.seller
          }, {
            $push: { 'receipts': [receipt_id, date, amount] }
          })
        } else {
          db.collection('finalUserInfo')
            .updateOne(
              { userId: element.seller },
              {
                $set: { "receipts": [[receipt_id, date, amount]] }
              }
            )
            .then(() => {
              console.log('receipt added to seller');
            })
            .catch(e => {
              res.status(404).send('error');
            })
        }
      })
    }

    //items_purchased.push(req.body.items);
    let receipt = [];
    //console.log(req.body);
    receipt.push(receipt_id, date, totalPrice, items_purchased);
    console.log(items_purchased);
    db.collection('finalUserInfo')
      .findOne({
        email: req.body.email
      })
      .then(doc => {
        if (doc.receipts) {
          db.collection('finalUserInfo')
            .updateOne(
              {
                email: req.body.email
              },
              {
                $push: { "receipts": receipt }
              }
            )
            .then(() => {
              clientr.publish('myPubSubChannel', `${items_purchased[0]} have been purchased`)
              console.log('Email of the receipt will be sent');
              //console.log(receipt);
              producer.send(req.body);
              res.send('Receipt saved');


            }
            )
            .catch(e => {
              res.status(404).send('error404');
            })
        }
        else {
          db.collection('finalUserInfo')
            .updateOne(
              { email: req.body.email },
              {
                $set: { "receipts": receipt }
              }
            )
            .then(() => {
              console.log('Email of the receipt will be sent');
              producer.send(req.body);
              res.send('Receipt saved');
            })
            .catch(e => {
              res.status(404).send('error');
            })
        }
      });
    items_purchased.forEach((item) => {
      console.log('in the loop');
      console.log(item);
      db.collection('Inventory')
        .findOne({ title: item.title })
        .then(doc => {
          if (doc) { console.log(doc); }

          db.collection('Inventory')
            .updateOne(
              { title: item.title },
              { $set: { stock: `${doc.stock - item.quantity}` } }
            )

        })
        .catch((e) => {
          console.log(e);
        })
    })

  });

  producer.connect(() => {
    app.listen(port);
  });
});