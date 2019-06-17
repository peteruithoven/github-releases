import React from 'react';
import {
  Box,
  Card,
  CardContent,
  List,
  Link,
  Typography,
} from '@material-ui/core';
import Release from './Release.js';

const Repository = ({ data }) => (
  <Box m={[2, 3]} clone>
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h4" component="h2">
          <Link href={data.url}>{data.name}</Link>
        </Typography>
        <Typography>
          <Link href={data.compareURL}>View all changes</Link>
        </Typography>
        <List>
          {data.releases.reverse().map(release => (
            <Release data={release} key={release.id} />
          ))}
        </List>
      </CardContent>
    </Card>
  </Box>
);

export default Repository;
