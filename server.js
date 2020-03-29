require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();

const corsOptions = {
  origin: '*',
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

const db = require('./app/models');

db.sequelize.sync();

require('./app/routes/v1/user.routes.js')(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
