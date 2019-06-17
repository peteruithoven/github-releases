import { useState, useEffect, useCallback } from 'react';
import * as storage from '../storage.js';

export function getLocalToken() {
  return storage.read('access_token');
}

async function getToken(code, setToken) {
  const rawResponse = await fetch('/get_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ code }),
  });
  const response = await rawResponse.json();
  return response.access_token;
}

export default function useGithubAuth() {
  const [token, setToken] = useState();
  useEffect(() => {
    (async function() {
      const initialToken = getLocalToken();
      if (initialToken) {
        setToken(initialToken);
      } else {
        // retrieve github oauth code
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
          // use code to request token
          const newToken = await getToken(code, setToken);
          if (newToken) {
            storage.write('access_token', newToken);
            setToken(newToken);
            window.location.replace('/'); // removing code from url
          }
        }
      }
    })();
  }, []);
  const logout = useCallback(() => {
    storage.remove('access_token');
    setToken(null);
  }, []);

  return [token, logout];
}
