const express = require('express'); // this is running express js 
const fs = require('fs'); // no need this 
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer'); //nodemailer file import 

const app = express();
const port = 5000;
const ipID='127.0.0.1';
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'home.html'));
});
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'contact.html'));
});

app.get('/cocola', (req, res) => {
    res.sendFile(path.join(__dirname, 'cocola.html'));
});
app.get('/cocoking', (req, res) => {
    res.sendFile(path.join(__dirname, 'cocoking.html'));
});
app.get('/royalcoco', (req, res) => {
    res.sendFile(path.join(__dirname, 'royalcoco.html'));
});
app.get('/tamz', (req, res) => {
    res.sendFile(path.join(__dirname, 'tamz.html'));
});
app.use(express.static(path.join(__dirname, 'public')));




app.post("/send-email", (req, res) => {
const transporter = nodemailer.createTransport({
    service: 'Outlook365', // Microsoft SMTP server
    port: 587, // Port for TLS/STARTTLS
    secure: false, // Use TLS
    auth: {
        user: 'info@flavorfoods.eu', // Your Microsoft email address
        pass: 'fbbldkpvrhybnmfg' // Your email password
    }
    
   
});

    const mailOptions = {
        from: 'info@flavorfoods.eu',
        to: 'info@flavorfoods.eu',//recive email and we can add many recive emails // this email testing purpos create my shelf 
        subject: req.body.usersubject,
        text: `Name: ${req.body.username}\nEmail: ${req.body.useremail}\nPhone Number: ${req.body.userphone}\nMessage: ${req.body.usermessage}`
    };

   transporter.sendMail(mailOptions)
    .then(info => {
        console.log('Email sent:', info.response);
        res.redirect('/contact.html'); // after send email redirect this page 
    })
    .catch(error => {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    });
});

app.use((req, res) => {
    res.status(404).send('404 Page Not Found');
});

app.listen(port,ipID, () => {
    console.log(`Server is now listening on port http://${ipID}:${port}`);
});