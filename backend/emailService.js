const KafkaConsumer = require('./KafkaConsumer');

const consumer = new KafkaConsumer(['email']);

consumer.on('message', (message) => {
  console.log('New receipt is added');
  setTimeout(()=>{
    console.log('Email has been sent', message);
  }, 5000);
});

consumer.connect();