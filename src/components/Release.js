import React from 'react';
import {
  ListItem,
  ListItemText,
  Typography,
  Box,
  Link,
} from '@material-ui/core';
import Markdown from './Markdown.js';

const dateTimeFormat = new Intl.DateTimeFormat('default', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const Release = ({ data }) => (
  <ListItem>
    <ListItemText>
      <>
        <Typography gutterBottom variant="h5" component="h3">
          <Link href={data.url}>{data.name}</Link>
        </Typography>
        <Typography gutterBottom>
          {dateTimeFormat.format(new Date(data.createdAt))}
        </Typography>
        <Box pl={1} borderLeft={4} borderColor="#e0e0e0">
          <Markdown source={data.description} />
        </Box>
      </>
    </ListItemText>
  </ListItem>
);

export default Release;
