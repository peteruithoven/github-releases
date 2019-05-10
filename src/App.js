import React, { useState, useEffect } from 'react';
import { Query } from "react-apollo";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween'
import query from "./query.js";
import Header from "./Header.js";
import Repository from "./Repository.js";
import { readPaginated } from "./utils.js";
import * as storage from "./storage.js";

dayjs.extend(isBetween)

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

console.log('CLIENT_ID: ', CLIENT_ID);
console.log('REDIRECT_URI: ', REDIRECT_URI);

const NUM_MONTHS = 12;
const now = dayjs();
const months = [];
for (let i=0;i<NUM_MONTHS;i++) {
  const month = now.subtract(i, 'month').startOf('month');
  months.push(month.toISOString());
}

function getRepos (data, month) {
  console.log('data: ', data);
  if (!data) {
    return [];
  }
  const startRange = dayjs(month);
  const endRange = startRange.endOf('month');
  return readPaginated(data.organization.repositories)
    .map(repository => {

      const releases = readPaginated(repository.releases);

      const earlierReleases = releases.filter(
        release => dayjs(release.createdAt).isBefore(startRange)
      );
      const withinReleases = releases.filter(
        release => dayjs(release.createdAt).isBetween(startRange, endRange)
      );
      const startRelease = earlierReleases[earlierReleases.length-1];
      const endRelease = withinReleases[withinReleases.length-1];

      let compareURL = '';
      if (startRelease && endRelease) {
        compareURL = `${repository.url}/compare/${startRelease.tagName}...${endRelease.tagName}`
      }

      return ({
        ...repository,
        releases: withinReleases,
        compareURL
      })
    })
    .filter(repository => repository.releases.length > 0);
}

async function getToken(code) {
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
  const { access_token} = response;
  if (access_token) {
    storage.write("access_token", access_token);
    window.location.replace("/");
  }
}

const App = () => {
  const [month, setMonth] = useState(months[0]);
  useEffect(() => {
    // retrieve github oauth code
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    // use code to request token
    if(code) getToken(code);
  });

  return (
    <Query
      query={query}
      // skip={true}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error :(</p>;
        const repositories = getRepos(data, month);
        return (
          <div className="App">
            <Header month={month} months={months} onChange={setMonth} />
            {repositories.map(repository => (
              <Repository data={repository} key={repository.id} />
            ))}
          </div>
        );
      }}
    </Query>
  )
};

export default App;
