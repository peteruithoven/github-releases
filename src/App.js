import React, { useState } from 'react';
import { Query } from "react-apollo";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween'
import query from "./query.js";
import Header from "./Header.js";
import Repository from "./Repository.js";
import { readPaginated } from "./utils.js";

dayjs.extend(isBetween)

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

const App = () => {
  const [month, setMonth] = useState(months[0]);

  return (
    <Query
      query={query}
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
