const nodemailer = require('nodemailer')
const express = require('express')
const app = express()
const port = 3006;
app.use(express.json())

app.post('/mail/sendemail', (req, res) => {
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
        to: req.body.email,
        replyTo: '',
        subject: 'Thank You for Your Order',
        text: req.body.message,
        html: `<p>${req.body.message}</p>`,
    }
    
    transporter.sendMail(mailOptions, (err, info) =>{
		if (err) {
			res.send(err)
		}
		res.send(info)
	})
})

app.listen(port, () => console.log(`email service listening on port ${port}!`))