import express from 'express';
import nodemailer from 'nodemailer';
let recipients = []; // change it for db
import dotenv from 'dotenv';
dotenv.config();

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const router = express.Router();
const port = process.env.PORT || 4000;

// display html files
app.use(express.static(__dirname));
app.use('/images', express.static(path.join(__dirname + '/images')));
app.use('/fonts', express.static(path.join(__dirname + '/fonts')));
app.use('/css', express.static(path.join(__dirname + '/css')));
app.use('/main.js', express.static(path.join(__dirname + '/main.js')));
app.use('/data', express.static(path.join(__dirname + '/data')));

// access to req body (body parser)
import bodyParser from 'body-parser';
router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

// routes
router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/templates/index.html'));
});
router.post('/send_email', function (req, res) {
  try {
    const recipient = req.body.email;
    recipients.push(recipient); // change it for db
    console.log('recipient:', recipient);

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    let mailOptions = {
      from: 'andrewdevvv@gmail.com',
      to: recipient,
      subject: 'NewsLetter from California',
      text: 'Hi there :)',
    };

    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log('Error ' + err);
      } else {
        console.log('Email sent successfully');
      }
    });
  } catch (err) {
    console.log(err);
    return res.send('Error uploading file');
  }
});
// add new routes right here
router.get('/search/:keywords', function (req, res) {
  res.sendFile(path.join(__dirname + '/templates/search.html'));
});

router.get('/products', function (req, res) {
  res.sendFile(path.join(__dirname + '/templates/products.html'));
});
router.get('/products/:category', function (req, res) {
  res.render('category', {
    category: req.params.category,
  });
});

router.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname + '/templates/about.html'));
});

router.get('/cart', function (req, res) {
  res.sendFile(path.join(__dirname + '/templates/cart.html'));
});
router.get('/:id', function (req, res) {
  res.render('product', {
    id: req.params.id,
  });
});

app.set('views', path.join(__dirname, '/templates'));
app.set('view engine', 'pug');

app.use('/404', function (req, res) {
  res.status(400).sendFile(path.join(__dirname + '/templates/404.html'));
});

app.use('/', router);
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

export { app };
