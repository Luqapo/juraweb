import React, { Component } from "react";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import { styles } from './RouteListStyles';
import AddAscent from './AddAscent/AddAscent.jsx';
import AddRoute from "../AddRoute/AddRoute.jsx";
import RouteListExpansion from './RouteListExpanansion/RouteListExpansion.jsx';
import BackButton from '../../components/BackButton/BackButton.jsx'

class RouteList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            addShow: false,
        }
    }

    handleAdd = (e) => {
        this.setState({
            addShow: this.state.addShow === false ? true : false
        })
    }

    handleBack = () => {
        this.props.history.goBack();
    }

    render(){
        const { classes } = this.props;
        const disabled = Boolean(!this.props.userIn);
        let rows = [];
        this.props.history.location.state.forEach( el => rows.push(
            <TableRow key={el._id} 
                data-droga={el.droga}>
                <TableCell>{el.droga}</TableCell>
                <TableCell>{el.wycena}</TableCell>
                <TableCell>{el.przejscia}</TableCell>
                <TableCell>{el.ocena}</TableCell>
                <TableCell>
                    <AddAscent
                        key={el._id}
                        route={el}
                        rejon={this.props.history.location.state.rejon}
                        userIn={this.props.userIn}
                        buttonActive={disabled} />
                </TableCell>
            </TableRow>));

        return (
            <Paper className={classes.root}>
                <Table className={classes.sectionDesktop} padding="dense">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nazwa</TableCell>
                            <TableCell>Wycena</TableCell>
                            <TableCell>Przejcia</TableCell>
                            <TableCell>Ocena</TableCell>
                            <TableCell>Dodaj przejście</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows}
                    </TableBody>
                </Table>
                <div className={classes.sectionMobile}>
                    {this.props.history.location.state.map( route => ( 
                         <RouteListExpansion
                            key={route._id}
                            data-droga={route.droga}
                            route={route}
                            rejon={this.props.history.location.state.rejon}
                            userIn={this.props.userIn}
                            buttonActive={disabled}/>
                        ))}
                </div>
                {this.state.addShow ? <AddRoute skala={this.props.history.location.state.skala}/> : null}
                <BackButton handleBack={this.handleBack}/>
                <div style={{display: 'flex', justifyContent: 'flex-end', margin: '15px'}}>
                    <Button onClick={this.handleAdd}
                        variant="outlined"
                        color="primary"
                        disabled={disabled}>
                        Dodaj drogę
                    </Button>
                </div>
            </Paper>
        )
    }
}

const mapStateToProps = state => {
    return {
        userIn: state.userLogged
    };
};

export default connect(mapStateToProps)(withStyles(styles)((RouteList)));