import React, { Component } from 'react';
import { connect } from "react-redux";

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

import { styles } from './AddAscentStyles';
import { url } from '../../../config/config'

class AddAscent extends Component {
    state = {
        date: '',
        style: '',
        ocena: '',
        comment: '',
        added: false
    }

    handleChage = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value
        })
    }

    handleSend = () => {
        const dataToSend = {...this.props.route};
        dataToSend.date = this.state.date;
        dataToSend.styl = this.state.style;
        dataToSend.ocena = this.state.ocena;
        dataToSend.comment = this.state.comment;

        fetch(`${url}/api/ascents/add`, {
                method : 'POST',
                body : JSON.stringify({
                    user: this.props.userIn,
                    rejon: this.props.rejon,
                    data: dataToSend
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'x-acces-token': this.props.token
                },
            })
            .then( resp => resp.json())
            .then(response => {
                    console.log(response);
                })
            .catch(error => {
                    console.log(error);
                })

    };

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div className={classes.columnDown}>
                    <TextField 
                        onChange={this.handleChage}
                        value={this.state.comment}
                        className={classes.formControl}
                        name="comment"
                        label="Komentarz" 
                        placeholder="Komentarz"/>
                </div>
                <div className={classes.columnDown}>
                    <TextField 
                        id="date" 
                        label="Data przejścia"
                        name="date"
                        value={this.state.date} 
                        onChange={this.handleChage} type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}/>
                </div>
                <div className={classes.columnDown}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="style">Styl</InputLabel>
                        <Select 
                            onChange={this.handleChage}
                            value={this.state.style}
                            inputProps={{
                                name: 'style',
                                id: 'style',
                            }}>
                            <MenuItem value="">Wybierz</MenuItem>
                            <MenuItem value="OS">OS</MenuItem>
                            <MenuItem value="FL">FL</MenuItem>
                            <MenuItem value="RP">RP</MenuItem>
                            <MenuItem value="PP">PP</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className={classes.columnDown}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="ocena">Ocena</InputLabel>
                        <Select 
                            onChange={this.handleChage}
                            value={this.state.ocena}
                            inputProps={{
                                name: 'ocena',
                                id: 'ocena',
                            }}>
                            <MenuItem value="">Oceń</MenuItem>
                            <MenuItem value="1">1</MenuItem>
                            <MenuItem value="2">2</MenuItem>
                            <MenuItem value="3">3</MenuItem>
                            <MenuItem value="4">4</MenuItem>
                            <MenuItem value="5">5</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className={classes.columnDown}>
                <Button variant="outlined" 
                    color="primary" 
                    disabled={this.props.buttonActive}
                    onClick={this.handleSend}>
                    Dodaj
                </Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    };
};

export default connect(mapStateToProps)(withStyles(styles)(AddAscent));