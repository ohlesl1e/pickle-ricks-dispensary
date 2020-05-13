const nodemailer = require('nodemailer')

const KafkaConsumer = require('./KafkaConsumer');

const consumer = new KafkaConsumer(['email']);

consumer.on('message', (message) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'picklerickcsc667@gmail.com',
            pass: '',
        }
    })

    let mailOptions = {
        from: {
            name: 'Pickle Rick',
            address: 'picklerickcsc667@gmail.com',
        },
        to: 'dpolozov@gmail.com',
        replyTo: '',
        subject: 'Thank You for Your Order',
        text: 'message',
        html: `<p>'soemthing'</p>`,
    }
    
    transporter.sendMail(mailOptions, (err, info) =>{
		if (err) {
			console.log(err);
		}
	})

});

consumer.connect();