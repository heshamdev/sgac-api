const mongoose = require('mongoose');
const config = require('../config');

module.exports = function() {
  const db = config.db;
  mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log(`Connected to ${db}...`));
}