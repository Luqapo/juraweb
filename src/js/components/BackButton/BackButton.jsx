import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';

import { styles } from './BackButtonStyles';

function BackButton(props) {
    const { classes } = props;
    return (
        <div className={classes.backPosition}>
                        <IconButton 
                                    aria-label="Back"
                                    onClick={props.handleBack}>
                            <ArrowBackIos fontSize="large"/>
                        </IconButton>
                    </div>
    )
}

export default withStyles(styles)(BackButton);