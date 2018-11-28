import React, {Component} from "react";

import { withStyles } from '@material-ui/core/styles';

import { styles } from './CragsListStyles';
import { url } from '../../config/config';
import MyButton from '../../components/MyButton/MyButton.jsx';
import BackButton from '../../components/BackButton/BackButton.jsx';

class CragsList extends Component{
    
    handleList = (e) => {
        let skalaName = e.currentTarget.dataset.skala;
        let newArr = [...this.props.history.location.state];
        let rejon = newArr[0].rejon

        fetch(`${url}/api/skaly/${skalaName}`)
            .then( resp => resp.json())
            .then( resp => {
                    resp.rejon = rejon;
                    resp.skala = skalaName;
                    this.props.history.push('/routes', resp);
            })   

        
    }

    handleBack = () => {
        this.props.history.goBack();
    }

    render(){
        const { classes } = this.props;
        let newArr = [...this.props.history.location.state];

        let newList = newArr.map( el => (
                            <div key={el._id} className={classes.buttonCenter}>
                                <MyButton
                                    handleClick={this.handleList} 
                                    skala={el.skala}
                                    name={el.skala}/>
                            </div>)
                            )
            return (
                    <div style={{background: this.props.history.location.state.background,
                                 backgroundSize: 'cover'}}
                         className={classes.myJura}>
                            {newList}
                        <BackButton handleBack={this.handleBack}/>
                    </div>
        )
    }
}

export default withStyles(styles)(CragsList);