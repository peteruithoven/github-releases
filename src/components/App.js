import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Query } from "react-apollo";
import { withStyles } from '@material-ui/core/styles';
import dayjs from "dayjs";
import qs from 'qs';
import Header from "./Header.js";
import * as storage from "../storage.js";
import Repositories from "./Repositories.js";
import MonthsSelector from './MonthsSelector.js';
import AppBarSelect from "./AppBarSelect.js";
import Message from "./Message.js";
import organizationsQuery from "../graphql/organizations.js";
import { readPaginated } from "../utils.js";

const { REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URI } = process.env;
const queryString = qs.stringify({
    client_id: REACT_APP_CLIENT_ID,
    scope: 'read:user, read:org',
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
  return response.access_token;
}

function getOrgs(data) {
  return readPaginated(data.viewer.organizations)
}

function getPath() {
  return window.location.pathname.split("/").slice(1);
}

function setPath(...path) {
  window.history.pushState({}, path, `/${path.join('/')}`);
}

const styles = theme => ({
  formItem: {
    marginRight: theme.spacing.unit,
    minWidth: 150
  }
});


const App = ({ classes }) => {
  const [month, setMonth] = useState(getPath()[1]? dayjs(getPath()[1]).toISOString(): months[0]);
  const [token, setToken] = useState(storage.read("access_token"));
  const [organization, setOrganization] = useState(getPath()[0]);
  useEffect(() => {
      if (organization) setPath(organization, dayjs(month).format('YYYY-MM'));
    },
    [organization, month],
  );

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
            window.location.replace("/"); // removing code from url
          }
        }
      }
    })();
  });

  return (
    <Query
      query={organizationsQuery}
      skip={!loggedIn}
    >
      {({ loading, error, data }) => {
        let organizations = [];
        if(!loading && !error && data) organizations = getOrgs(data);
        return (
          <>
            <Header>
              {loggedIn? (
                  <>
                    <form>
                      <AppBarSelect
                          id="organization"
                          label="Organization"
                          value={organization}
                          options={organizations.map(({ id, name}) => ({
                              value: name,
                              content: name
                          }))}
                          onChange={setOrganization}
                          className={classes.formItem}
                      />
                      <MonthsSelector
                        month={month}
                        months={months}
                        onChange={setMonth}
                        className={classes.formItem}
                      />
                    </form>
                    <Button color="inherit" onClick={logout}>Logout</Button>
                  </>
              ) : (
                <Button color="inherit" href={loginURL}>Login</Button>
              )}
            </Header>
            {loggedIn? (
              <Repositories organization={organization} month={month} />
            ) : (
              <Message>
                Please login to Github to retrieve release information.
              </Message>
            )}
          </>
        )
      }}
    </Query>
  )
};

export default withStyles(styles, { withTheme: true })(App);
