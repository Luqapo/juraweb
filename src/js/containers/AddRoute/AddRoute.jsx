import React from "react";

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import { styles } from './AddRouteStyles';
import { url } from '../../config/config';


class AddRoute extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            routeToAdd: '',
            droga: '',
            wycena: ''
        }
    }

    handleName = (e) => {
        this.setState({
            droga: e.target.value
        })
    }

    handleSelect = (e) => {
        this.setState({
            wycena: e.target.value
        })
    }

    handleSend = () => {

        let newName = this.state.droga;
        let newWycena = this.state.wycena;

        const obj = {
            skala: this.props.skala,
            droga: newName,
            wycena: newWycena,
            przejscia: 0,
            ocena: 0
        };
        console.log(obj);

        fetch(`${url}/api/droga/add`, {
                method : 'POST',
                body : JSON.stringify({
                    skala: this.props.skala,
                    droga: newName,
                    wycena: newWycena,
                    przejscia: 0,
                    ocena: 0
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then( resp => resp.json())
            .then(function (response) {
                    console.log(response);
                })
            .catch(function (error) {
                    console.log(error);
                })
    }

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <div>
                    <TextField 
                            onChange={this.handleName}
                            value={this.state.name}
                            className={classes.formControl}
                            name="droga"
                            label="Nazwa drogi" 
                            placeholder="Nazwa drogi"/>
                </div>
                <div>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="wycena">Wycena</InputLabel>
                        <Select onChange={this.handleSelect}
                            value={this.state.wycena}
                            inputProps={{
                                name: 'wycena',
                                id: 'wycena',
                            }}>
                            <MenuItem value="V">V</MenuItem>
                            <MenuItem value="V+">V+</MenuItem>
                            <MenuItem value="VI">VI</MenuItem>
                            <MenuItem value="VI+">VI+</MenuItem>
                            <MenuItem value="VI.1">VI.1</MenuItem>
                            <MenuItem value="VI.1+">VI.1+</MenuItem>
                            <MenuItem value="VI.2">VI.2</MenuItem>
                            <MenuItem value="VI.2+">VI.2+</MenuItem>
                            <MenuItem value="VI.3">VI.3</MenuItem>
                            <MenuItem value="VI.3+">VI.3+</MenuItem>
                            <MenuItem value="VI.4">VI.4</MenuItem>
                            <MenuItem value="VI.4+">VI.4+</MenuItem>
                            <MenuItem value="VI.5">VI.5</MenuItem>
                            <MenuItem value="VI.5+">VI.5+</MenuItem>
                            <MenuItem value="VI.6">VI.6</MenuItem>
                            <MenuItem value="VI.6+">VI.6+</MenuItem>
                            <MenuItem value="VI.7">VI.7</MenuItem>
                            <MenuItem value="VI.7+">VI.7+</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <Button onClick={this.handleSend}
                            variant="outlined"
                            color="primary">
                            Zapisz
                    </Button>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(AddRoute);