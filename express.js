import express from 'express';

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const router = express.Router();
const port = 3000;

app.use(express.static(__dirname));

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/templates/index.html'));
});
router.get('/cart', function (req, res) {
  res.sendFile(path.join(__dirname + '/templates/cart.html'));
});
router.get('/:id', function (req, res) {
  res.render('product', { id: req.params.id });
});
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');

app.use('/', router);
app.listen(process.env.port || 3000, function () {
  console.log(`Example app listening on port ${port}!`);
});
