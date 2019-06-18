const fetch = require('node-fetch');
const express = require('express');
const compression = require('compression');
const path = require('path');
const qs = require('qs');
require('dotenv').config();

const {
  REACT_APP_CLIENT_ID: CLIENT_ID,
  REACT_APP_REDIRECT_URI: REDIRECT_URI,
  CLIENT_SECRET,
} = process.env;
console.log('CLIENT_ID: ', CLIENT_ID);
console.log('REDIRECT_URI: ', REDIRECT_URI);
console.log('CLIENT_SECRET: ', CLIENT_SECRET);

const app = express();
app.use(express.json());

app.post('/get_token', async (req, res) => {
  const { code } = req.body;
  const queryString = qs.stringify({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    client_secret: CLIENT_SECRET,
    code,
  });

  const rawResponse = await fetch(
    `https://github.com/login/oauth/access_token?${queryString}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    }
  );
  const response = await rawResponse.json();
  if (response.error) {
    console.warning('Could not get token: ', response);
  }
  res.json(response);
});

const rootFolder = path.join(__dirname, '..', 'build');
app.use(compression());
app.use(express.static(rootFolder));

// Have all other routes return regular front end
const indexPath = path.join(rootFolder, 'index.html');
app.get('/*', (req, res) => {
  res.sendFile(indexPath);
});

const listener = app.listen(process.env.PORT || 4000, () => {
  console.log('Server listening on ', listener.address().port);
});
