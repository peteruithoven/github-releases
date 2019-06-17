import React from 'react';
import { MenuItem, Select, InputLabel, FormControl } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => {
  const { palette } = theme;
  const selectColor = palette.getContrastText(palette.primary.main);
  return {
    formControl: {
      minWidth: 150,
      marginRight: theme.spacing(2),
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

const AppBarSelect = ({ id, label, value, options, onChange, classes }) => (
  <FormControl className={classes.formControl}>
    <InputLabel shrink htmlFor={id} className={classes.colorInherit}>
      {label}
    </InputLabel>
    <Select
      value={value}
      onChange={event => onChange(event.target.value)}
      className={[classes.select, classes.colorInherit].join(' ')}
      inputProps={{
        name: id,
        id: id,
        classes: {
          icon: classes.colorInherit,
        },
      }}
    >
      {options.map(({ value, content }) => (
        <MenuItem value={value} key={value}>
          {content}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
export default withStyles(styles, { withTheme: true })(AppBarSelect);
