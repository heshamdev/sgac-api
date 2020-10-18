const express = require('express');
const config = require('./config')
const app = express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
const status = 'sss';
app.get('/', function(req, res, next) {
   console.log(status)
  res.json({ status: status });
});

const server = app.listen(config.port, () => console.log(`Listening on port ${config.port}...`));

module.exports = server;