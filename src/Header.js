import React from "react";
import dayjs from "dayjs";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => {
    const { palette } = theme;
    const selectColor = palette.getContrastText(palette.text.primary);
    const selectColorValue = `${selectColor} !important`;
    return {
        grow: {
            flexGrow: 1,
        },
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

const Header = ({ month, months, onChange, classes }) => (
    <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
                Release viewer
            </Typography>
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
        </Toolbar>
    </AppBar>
)

export default withStyles(styles, { withTheme: true })(Header);
