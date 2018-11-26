import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';

import { styles } from './MyButtonStyles';

function MyButton(props) {
    const { classes } = props;

    return (
        <ButtonBase
          focusRipple
          className={classes.image}
          onClick={props.handleClick}
          data-rejon={props.rejon}
          data-skala={props.skala}
          focusVisibleClassName={classes.focusVisible}
        >
          <span
            className={classes.imageSrc}
          />
          <span className={classes.imageBackdrop} />
          <span className={classes.imageButton}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              className={classes.imageTitle}
            >
              {props.name}
              <span className={classes.imageMarked} />
            </Typography>
          </span>
        </ButtonBase>
    )
}

export default withStyles(styles)(MyButton);