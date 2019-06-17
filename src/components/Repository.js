import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Release from './Release.js';

const styles = theme => ({
  card: {
    margin: theme.spacing.unit * 2,
  },
});

const Repository = ({ data, classes }) => (
  <Card className={classes.card}>
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
);

export default withStyles(styles, { withTheme: true })(Repository);
