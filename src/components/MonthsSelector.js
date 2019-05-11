import React from "react";
import dayjs from "dayjs";
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

const MonthsSelector = ({ month, months, onChange, classes }) => (
    <form>
        <FormControl>
            <InputLabel
                shrink
                htmlFor="month"
                className={classes.light}
            >
                Within
            </InputLabel>
            <Select
                value={month}
                onChange={event => onChange(event.target.value)}
                className={classes.select}
                inputProps={{
                    name:"month",
                    id:"month",
                    classes: {
                        icon: classes.icon,
                    }
                }}
            >
                {months.map(month => (
                    <MenuItem value={month} key={month}>
                        {dayjs(month).format('MMM YYYY')}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    </form>
)
export default withStyles(styles, { withTheme: true })(MonthsSelector);
