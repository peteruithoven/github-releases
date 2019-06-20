import React from 'react';
import { Box, Card, List, Link, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Release from './Release.js';

const StyledList = styled(List)({
  paddingTop: 0,
});

const Repository = ({ data }) => (
  <Box m={[2, 3]} clone>
    <Card>
      <Box pt={1} px={2}>
        <Typography gutterBottom variant="h4" component="h2">
          <Link href={data.url}>{data.name}</Link>
        </Typography>
        <Typography>
          <Link href={data.compareURL}>View all changes</Link>
        </Typography>
        <StyledList>
          {data.releases.reverse().map(release => (
            <Release data={release} key={release.id} />
          ))}
        </StyledList>
      </Box>
    </Card>
  </Box>
);

export default Repository;
