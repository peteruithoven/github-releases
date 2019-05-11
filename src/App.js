import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import dayjs from "dayjs";
import qs from 'qs';
import Header from "./Header.js";
import * as storage from "./storage.js";
import Repositories from "./Repositories.js";
import MonthsSelector from './MonthsSelector.js';

const { REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URI } = process.env;
const queryString = qs.stringify({
    client_id: REACT_APP_CLIENT_ID,
    scope: 'user',
    redirect_uri: REACT_APP_REDIRECT_URI
});
const loginURL = `https://github.com/login/oauth/authorize?${queryString}`

const NUM_MONTHS = 12;
const now = dayjs();
const months = [];
for (let i=0;i<NUM_MONTHS;i++) {
  const month = now.subtract(i, 'month').startOf('month');
  months.push(month.toISOString());
}

async function getToken(code, setToken) {
  const rawResponse = await fetch('/get_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ code })
  });
  const response = await rawResponse.json();
  console.log('response: ', response);
  return response.access_token;
}

const App = () => {
  const [month, setMonth] = useState(months[0]);
  const [token, setToken] = useState(storage.read("access_token"));
  const loggedIn = !!token;

  function logout() {
    storage.remove("access_token");
    setToken(null);
  }

  useEffect(() => {
    (async function() {
      if (!token) {
        // retrieve github oauth code
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
          // use code to request token
          const access_token = await getToken(code, setToken);
          if (access_token) {
            storage.write("access_token", access_token);
            setToken(access_token);
            window.location.replace("/");
          }
        }
      }
    })();
  });

  return (
    <div className="App">
      <Header>
        {loggedIn? (
            <>
              <MonthsSelector month={month} months={months} onChange={setMonth} />
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
        ) : (
          <Button color="inherit" href={loginURL}>Login</Button>
        )}
      </Header>
      {loggedIn? (
        <Repositories month={month} />
      ) : (
        <Typography>Please login to Github to retrieve release information</Typography>
      )}
    </div>
  )
};

export default App;
