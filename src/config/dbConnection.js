const mongoose = require('mongoose');
require('dotenv').config();

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(process.env.DB_URL, connectionOptions);

module.exports = mongoose;
