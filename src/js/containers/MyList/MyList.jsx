import React, { Component } from "react";
import { connect } from "react-redux";
import ResponsiveTable from 'material-ui-next-responsive-table'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { styles } from './MyListStyles';
import { url } from '../../config/config';
import * as actions from '../../store/actions/auth.jsx';

class MyList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            list: ''
        }
    }

    componentDidMount() {
        fetch(`${url}/api/ascents/${this.props.userIn}`)
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed to fetch ascents!');
                }
                return res.json();
            })
            .then( resp => {
                this.setState({
                    list: resp
                })
            })
            .catch(err => this.props.catchError(err));
    }

    render(){
        const { classes } = this.props;
        let rows = [];
        let columns = [
            {
                key: 'id',
                label: 'Numer'
            },
            {
                key: 'data',
                label: 'Data',
                primary: true
            },
            {
                key: 'wycena',
                label: 'Wycena',
                primary: true
            },
            {
                key: 'styl',
                label: 'Styl'
            },
            {
                key: 'nazwa',
                label: 'Nazwa',
                primary: true
            },
            {
                key: 'rejon',
                label: 'Rejon'
            },
            {
                key: 'skala',
                label: 'Skała'
            },
            {
                key: 'comment',
                label: 'Komentarz'
            },
            {
                key: 'stars',
                label: 'Twoja ocena'
            },
        ];
        const myList = [...this.state.list];
        myList.forEach( (el,index) => rows.push({
                                            id: index + 1,
                                            data: el.date,
                                            wycena: el.wycena,
                                            styl: el.styl,
                                            nazwa: el.droga,
                                            rejon: el.rejon,
                                            skala: el.skala,
                                            comment: el.comment,
                                            stars: el.towjaOcena
        }))


        return (
            <Paper className={classes.root}>
                <ResponsiveTable
                    columns={columns}
                    data={rows}
                />
            </Paper>
        )
    }
}

const mapStateToProps = state => {
    return {
        userIn: state.userLogged
    };
};

const mapDispatchToProps = dispatch => {
    return {
        catchError: (err) => dispatch( actions.catchError(err) )
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(MyList));