import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import dayjs from 'dayjs';
import Header from './Header.js';
import LoginButton from './LoginButton.js';
import Repositories from './Repositories.js';
import MonthsSelector from './MonthsSelector.js';
import OrgSelector from './OrgSelector.js';
import Message from './Message.js';
import useGithubToken from '../hooks/useGithubToken.js';

const NUM_MONTHS = 12;
const now = dayjs();
const months = [];
for (let i = 0; i < NUM_MONTHS; i++) {
  const month = now.subtract(i, 'month').startOf('month');
  months.push(month.toISOString());
}

function getPath() {
  return window.location.pathname.split('/').slice(1);
}

function setPath(...path) {
  window.history.pushState({}, path, `/${path.join('/')}`);
}

const App = () => {
  const [month, setMonth] = useState(
    getPath()[1] ? dayjs(getPath()[1]).toISOString() : months[0]
  );
  const [token, logout] = useGithubToken();
  const [organization, setOrganization] = useState(getPath()[0]);
  useEffect(() => {
    if (organization) setPath(organization, dayjs(month).format('YYYY-MM'));
  }, [organization, month]);

  const loggedIn = !!token;

  return (
    <>
      <Header>
        {loggedIn ? (
          <>
            <form>
              <OrgSelector skip={!loggedIn} onChange={setOrganization} />
              {/* <AppBarSelect
                      id="organization"
                      label="Organization"
                      value={organization}
                      options={organizations.map(({ id, name }) => ({
                        value: name,
                        content: name,
                      }))}
                      onChange={setOrganization}
                    /> */}
              <MonthsSelector
                month={month}
                months={months}
                onChange={setMonth}
              />
            </form>
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        ) : (
          <LoginButton color="inherit" />
        )}
      </Header>
      {loggedIn ? (
        organization ? (
          <Repositories organization={organization} month={month} />
        ) : (
          <Message>
            Please select a organization to retrieve release information.
          </Message>
        )
      ) : (
        <Message>
          Please login to Github to retrieve release information.
        </Message>
      )}
    </>
  );
};

export default App;
