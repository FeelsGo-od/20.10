import express from 'express';

import multer from 'multer';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

// display html files
app.use(express.static(__dirname));

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
    console.log('recipient:', recipient);
  } catch (err) {
    console.log(err);
    return res.send('Error uploading file');
  }
});

router.get('/cart', function (req, res) {
  res.sendFile(path.join(__dirname + '/templates/cart.html'));
});
router.get('/:id', function (req, res) {
  res.render('product', {
    id: req.params.id,
  });
});

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.use('/', router);
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
