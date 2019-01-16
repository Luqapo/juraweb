import React, { Component } from "react";
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import { styles } from './CenterJuraStyles';

import { url } from '../../config/config';
import MyButton from '../../components/MyButton/MyButton.jsx';
import BackButton from '../../components/BackButton/BackButton.jsx';
import * as actions from '../../store/actions/auth.jsx';

class CenterJura extends Component{
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            background: 'url("../img/ogro.jpg")'
        }
    }

    componentDidMount() {
        fetch(`${url}/api/regiony/center`)
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed to fetch crags!');
                }
                return res.json();
            })
            .then( resp => {
                this.setState({
                    data: resp
                })
            })
            .catch( err => {
                this.props.catchError(err);
            });
    }

    handleSchow = (e) => {
        let rejonName = e.currentTarget.dataset.rejon;

            fetch(`${url}/api/rejony/${rejonName}`)
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed to fetch crags!');
                }
                return res.json();
            })
            .then( resp => {
                resp.background = this.state.background;
                this.props.history.push('/crags', resp);
            })
            .catch(err => this.props.catchError(err));  
    }

    handleBack = () => {
        this.props.history.goBack();
    }

    render(){
        const { classes } = this.props;
        const data = [...this.state.data];
        let listElements = data.map( el => (
                        <div key={el._id} className={classes.buttonCenter}>
                            <MyButton  
                                handleClick={this.handleSchow} 
                                rejon={el.rejon}
                                name={el.rejon}/>
                        </div>)
                    );
            return (
                <div style={{background: this.state.background, 
                                backgroundSize: 'cover'}} 
                                className={classes.myJura}>
                        {listElements}
                    <BackButton handleBack={this.handleBack}/>
                </div>
            )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        catchError: (err) => dispatch( actions.catchError(err) )
    }
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(CenterJura));