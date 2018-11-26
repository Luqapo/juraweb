import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { styles } from './SearchResultsStyles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

function SearchResult(props) {
        const { classes } = props;
        const serchResult = props.history.location.state;
        let result = null;
        if (serchResult.message){
            result = <Typography variant="h2">{serchResult.message}</Typography>;
        } else {
            result = <Typography variant="h4">{`${serchResult.rejon}  >  ${serchResult.skala}  >  ${serchResult.droga}`}</Typography>;
        }
        return (
            <Paper className={classes.root}>
                {result}    
            </Paper>
        )
}

export default withStyles(styles)(SearchResult);