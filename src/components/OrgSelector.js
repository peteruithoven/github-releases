import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useQuery } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import throttle from 'lodash/throttle';
import orgSearch from '../graphql/orgSearch.js';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => {
  const { palette } = theme;
  const selectColor = palette.getContrastText(palette.primary.main);
  return {
    autocomplete: {
      minWidth: 150,
      marginRight: theme.spacing(2),
      display: 'inline-flex',
    },
    colorInherit: {
      color: 'inherit !important',
    },
    select: {
      '&:before, &:after': {
        borderColor: `${selectColor} !important`,
      },
    },
  };
};

const OrgSelector = ({ onChange, skip, classes }) => {
  const [queryString, setQueryString] = React.useState('');

  const { loading, data } = useQuery(orgSearch, {
    variables: { queryString },
    skip: queryString === '' || skip,
  });

  return (
    <Autocomplete
      className={classes.autocomplete}
      getOptionSelected={(option, value) => option.name === value.name}
      getOptionLabel={option => option.name || option.login}
      options={data ? data.search.nodes : []}
      loading={loading}
      onInputChange={throttle(
        (event, value) => {
          setQueryString(value);
        },
        1000,
        { leading: false }
      )}
      onChange={(event, value) => {
        onChange(value.login);
      }}
      renderInput={params => (
        <TextField
          {...params}
          label="Organization"
          fullWidth
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default withStyles(styles, { withTheme: true })(OrgSelector);
