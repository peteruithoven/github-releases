import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        padding: theme.spacing.unit*2
    }
});

const Message = ({ children, classes }) => (
    <div className={classes.container}>
        <Card>
            <CardContent>
                <Typography>
                    {children}
                </Typography>
            </CardContent>
        </Card>
    </div>
)

export default withStyles(styles, { withTheme: true })(Message);



