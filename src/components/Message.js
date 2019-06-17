import React from 'react';
import { Box, Card, CardContent, Typography } from '@material-ui/core';

const Message = ({ children }) => (
  <Box display="flex" justifyContent="center" p={[2, 3]}>
    <Card>
      <CardContent>
        <Typography>{children}</Typography>
      </CardContent>
    </Card>
  </Box>
);

export default Message;
