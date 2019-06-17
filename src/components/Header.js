import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  grow: {
    flexGrow: 1,
  },
};

const Header = ({ loggedIn, month, months, onChange, classes, children }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit" className={classes.grow}>
        Release viewer
      </Typography>
      {children}
    </Toolbar>
  </AppBar>
);

export default withStyles(styles)(Header);
