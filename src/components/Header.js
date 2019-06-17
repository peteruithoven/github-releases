import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';

const Header = ({ children }) => (
  <AppBar position="static">
    <Toolbar>
      <Box flexGrow={1}>
        <Typography variant="h6">Release viewer</Typography>
      </Box>
      {children}
    </Toolbar>
  </AppBar>
);

export default Header;
