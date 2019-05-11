import React from 'react';
import dayjs from "dayjs";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Markdown from "./Markdown.js";

const styles = theme => ({
    quote: {
        paddingLeft: theme.spacing.unit,
        borderLeft: '5px #e0e0e0 solid'
    }
});

const Release = ({ data, classes }) => (
    <ListItem>
        <ListItemText>
            <>
                <Typography gutterBottom variant="h5" component="h3">
                    <Link href={data.url}>
                        {data.name}
                    </Link>
                </Typography>
                <Typography gutterBottom>
                    {dayjs(data.createdAt).format('YYYY-MM-DD')}
                </Typography>
                <Markdown className={classes.quote} source={data.description} />
            </>
        </ListItemText>
    </ListItem>
)

export default withStyles(styles)(Release);

