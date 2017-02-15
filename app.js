var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('views', './views');
app.set('view engine', 'ejs')
app.use('/', express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render('index', {
    mode: process.env.NODE_ENV
  });
})

app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!')
})