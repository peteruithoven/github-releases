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
import Link from '@material-ui/core/Link';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

console.log('CLIENT_ID: ', CLIENT_ID);
console.log('REDIRECT_URI: ', REDIRECT_URI);

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
            <Typography color="inherit">
                <Link
                    color="inherit"
                    href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
                >
                    Login
                </Link>
            </Typography>
        </Toolbar>
    </AppBar>
)

export default withStyles(styles, { withTheme: true })(Header);
