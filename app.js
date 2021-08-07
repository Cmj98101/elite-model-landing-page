"use strict";
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require("nodemailer");

dotenv.config();


const app = express();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));
// Body Parser Middleware
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.render('home', {
        layout: false
    });
});
app.post('/send', (req, res) => {
    const output = `
    <p>You have a new contact request</p
    <h3>Contact Details</h3>
    <ul>
    <li>Name: ${req.body.name}</li>
    <li>Email: ${req.body.email}</li>
    <li>Contact Number: ${req.body.contactNumber}</li>
    </ul>
    <h3>Question:</h3>
    <p>${req.body.questions}</p>
    `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.sendgrid.net",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'apikey', // generated ethereal user
            pass: `${process.env.API_KEY}`, // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object sean@velocityplotter.com, janier@velocityplotters.com
    transporter.sendMail({
        from: '"Submission Form" <chris@velocityplotters.com>', // sender address
        to: "chris@velocityplotters.com", // list of receivers
        subject: "Landing Page Submission Form", // Subject line
        text: "Hello world?", // plain text body
        html: output, // html body
    }, (error, info) => {
        console.log("Message sent: %s", info.messageId);

        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.render('home', {
            msg: "Email has been sent!",
            layout: false,
        });
    });



});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Server Started...'));