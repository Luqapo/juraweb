import React from "react";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import * as actions from '../../store/actions/auth.jsx';
import { styles } from './LoginFormStyles';

class LoginForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            password2: '',
            email: '',
            addUser: false,
            login: '',
            error: ''
        }
    }

    handleChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        
        this.setState({
            [name]: value
        }, () => console.log(this.validateInput(name)));
    }

    validateInput = (name) => {
        switch(name) {
            case 'login':
                if(this.state.login.length >= 5){
                    return true;
                };
                return false;
            case 'password':
                if(this.state.password.length >= 5){
                    return true;
                };
                return false;
            case 'password2':
                if(this.state.password2 === this.state.password){
                    return true;
                };
                return false;
            case 'email':
                if(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(this.state.email)){
                    return true;
                };
                return false;
            default:
                return false;
        }
    }

    handleAdd = () => {
        this.setState({
            addUser: this.state.addUser ? false : true
        })
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (!this.state.addUser){
        this.props.onAuth(this.state.login, this.state.password);
        } else {
            this.props.addUser(this.state.login, this.state.password, this.state.password2, this.state.email);
            this.setState({
                addUser: false
            });
        }
    }


    render(){
        const { classes } = this.props;
        const openModal = Boolean(!this.props.userIn);
        const addAcount = [
            <Input key="input1" 
                   name="password2" 
                   onChange={this.handleChange} 
                   type="password" 
                   placeholder="Powtórz hasło"
                   required/>,
            <Input key="input2" 
                   name="email" 
                   onChange={this.handleChange} 
                   type="email" 
                   placeholder="Email"
                   required/>
        ];
        return (
                    <Modal
                        aria-labelledby="login-modal-title"
                        aria-describedby="login-modal-description"
                        open={openModal}
                        onClose={this.props.showHandle}
                    >
                        <div className={classes.paper}>
                            <form onSubmit={this.submitHandler}>
                                <FormControl required error={!this.validateInput('login')}>
                                    <Input name="login" 
                                            onChange={this.handleChange} 
                                            placeholder="Login"
                                            required/>
                                    {!this.validateInput('login') && <FormHelperText>Min 5 characterds</FormHelperText>}
                                </FormControl>
                                <FormControl required error={!this.validateInput('password')}>
                                    <Input name="password" 
                                           onChange={this.handleChange} 
                                           type="password" 
                                           placeholder="Password"
                                           required/>
                                    {!this.validateInput('password') && <FormHelperText>Min 5 characterds</FormHelperText>}
                                </FormControl>
                                {this.state.addUser ? addAcount : null}
                                <div className={classes.buttonCenter}>
                                    <Button type="submit">Wyślij</Button>
                                </div>
                            </form>
                            {this.state.addUser ? null : 
                                <div className={classes.buttonCenter}>
                                    <Button onClick={this.handleAdd}>Załóż konto</Button>
                                </div>}
                            <div className={classes.buttonCenter}>
                                <Button onClick={this.props.showHandle}>Anuluj</Button>
                            </div>
                        </div>
                    </Modal>
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
            onAuth: (login, password) => dispatch ( actions.auth ( login, password )),
            logOff: () => dispatch ( actions.logOff()),
            addUser: (login, password, password2, email) => dispatch ( actions.addUser(login, password, password2, email))
        }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)((LoginForm)));