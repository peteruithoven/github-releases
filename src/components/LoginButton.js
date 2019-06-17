import React from 'react';
import { Button } from '@material-ui/core';
import qs from 'qs';

const { REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URI } = process.env;
const queryString = qs.stringify({
  client_id: REACT_APP_CLIENT_ID,
  scope: 'read:user, read:org',
  redirect_uri: REACT_APP_REDIRECT_URI,
});
const loginURL = `https://github.com/login/oauth/authorize?${queryString}`;

export default function LoginButton(props) {
  return (
    <Button href={loginURL} {...props}>
      Login
    </Button>
  );
}
