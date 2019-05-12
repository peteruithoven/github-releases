import React from "react";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => {
    const { palette } = theme;
    const selectColor = palette.getContrastText(palette.text.primary);
    const selectColorValue = `${selectColor} !important`;
    return {
        select: {
            color: selectColorValue,
            '&:before': {
                borderColor: selectColorValue,
            },
            '&:after': {
                borderColor: selectColorValue,
            }
        },
        icon: {
            fill: selectColorValue,
        },
        light: {
            color: selectColorValue
        }
    }
};

const AppBarSelect = ({ id, label, value, options, onChange, classes, className }) => (
    <FormControl className={className}>
        <InputLabel
            shrink
            htmlFor={id}
            className={classes.light}
        >
            {label}
        </InputLabel>
        <Select
            value={value}
            onChange={event => onChange(event.target.value)}
            className={classes.select}
            inputProps={{
                name: id,
                id: id,
                classes: {
                    icon: classes.icon,
                }
            }}
        >
            {options.map(({ value, content }) => (
                <MenuItem value={value} key={value}>
                    { content }
                </MenuItem>
            ))}
        </Select>
    </FormControl>
)
export default withStyles(styles, { withTheme: true })(AppBarSelect);
