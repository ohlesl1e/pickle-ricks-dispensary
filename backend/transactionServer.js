const express = require('express');
const KafkaProducer = require('./KafkaProducer.js');
const producer = new KafkaProducer('email');
const { MongoClient, ObjectID } = require('mongodb');
const app = express();
const port = 3005;


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
 

const db=client.db(dbName);

app.post('/api/receipts/get', (req,res) => {
      db.collection('finalUserInfo')
        .findOne({
            userId:req.body.userId
        })
        .then(doc =>{
            res.send(doc.receipts);
        })
        .catch(e=>{
        console.log(e);
       res.status(404).send('error');
    });
})

app.post('/api/receipts/create',(req,res)=>{
    let receipt_id= req.body.receipt_id;
    let date= req.body.date;
    let totalPrice= req.body.price;
    let items_purchased=[];
    items_purchased.push(req.body.items);
    let receipt = [];
    receipt.push(receipt_id,date,totalPrice,items_purchased);
    db.collection('finalUserInfo')
    .findOne({
        userId:req.body.userId
    })
    .then(doc=>{
        if(doc.receipts){
            db.collection('finalUserInfo')
            .updateOne(
                {
                    userId:req.body.userId},
                {
                    $push: { "receipts":receipt}
                }
                )
             .then(
                 res.send('Receipt saved')
            )
            
             .catch(e=>{
               res.status(404).send('error404');
             }
             ) 
        }
        else{
             db.collection('finalUserInfo')
              .updateOne(
                {userId:req.body.userId},
                {
                    $set: { "receipts":receipt}
                }
                )
             .then(doc =>{
                 res.send('Receipt saved');
             })
             .catch(e=>{
               res.status(404).send('error');
             }
             ) 
    }
    });
   
});

  app.listen(port, () => console.log(` Listening on port ${port}!`));
});