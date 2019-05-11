import React from 'react';
import { Query } from "react-apollo";
import dayjs from "dayjs";
import isBetween from 'dayjs/plugin/isBetween'
import query from "../query.js";
import Repository from "./Repository.js";
import Message from "./Message.js";
import { readPaginated } from "../utils.js";

dayjs.extend(isBetween)

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

const Repositories = ({ month }) => {
  return (
    <Query query={query}>
    {({ loading, error, data }) => {
        if (loading) return <Message>Loading...</Message>;
        if (error) return <Message>{error.message}</Message>;
        const repositories = getRepos(data, month);
        return (
        <>
            {repositories.map(repository => (
            <Repository data={repository} key={repository.id} />
            ))}
        </>
        )
    }}
    </Query>
  )
};

export default Repositories;
