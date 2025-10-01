const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Use modular routes
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`EcoTech API server running on port ${PORT}`);
});
