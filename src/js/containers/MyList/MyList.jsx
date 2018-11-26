import React from "react";
import { connect } from "react-redux";
import ResponsiveTable from 'material-ui-next-responsive-table'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import { styles } from './MyListStyles';
import { url } from '../../config/config';

class MyList extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            list: ''
        }
    }

    componentDidMount() {
        fetch(`${url}/api/ascents/${this.props.userIn}`)
            .then( resp => resp.json())
            .then( resp => {
                this.setState({
                    list: resp
                })

            })
            .catch( err => {
                console.log('Błąd!', err);
            });
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

export default connect(mapStateToProps)(withStyles(styles)(MyList));