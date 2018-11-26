import React from "react";
import { Link } from 'react-router-dom'

import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './MojaJuraStyles';
import { images } from './MojaJuraImages';


function MojaJura(props){
        const { classes } = props;
        return (
            <div className={classes.root}>
                {images.map( image => {
                    const JuraLink = props => <Link to={image.to} {...props}/>
                    return (
                    <ButtonBase
                        focusRipple
                        key={image.title}
                        className={classes.image}
                        focusVisibleClassName={classes.focusVisible}
                        component={JuraLink}
                        >
                        <span
                            className={classes.imageSrc}
                            style={{
                            backgroundImage: `url(${image.url})`,
                            }}
                        />
                        <span className={classes.imageBackdrop} />
                        <span className={classes.imageButton}>
                            <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            className={classes.imageTitle}
                            >
                            {image.title}
                            <span className={classes.imageMarked} />
                            </Typography>
                        </span>
                    </ButtonBase>
                )})}
            </div>
        )
}

export default withStyles(styles)(MojaJura);