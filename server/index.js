// const fetch = require('node-fetch');
const express = require('express');
const path = require('path');

const app = express();

const rootFolder = path.join(__dirname, '..', 'build');
app.use(express.static(rootFolder));

// Have all other routes return regular front end
const indexPath = path.join(rootFolder, 'index.html');
app.get('/*', (req, res) => {
  res.sendFile(indexPath);
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Server listening on ', listener.address().port);
});
