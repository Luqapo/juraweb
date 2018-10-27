import React from "react";
import { connect } from 'react-redux';

import * as actions from './store/actions/auth.jsx';

class LoginForm extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            password2: '',
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
        });

    }


    handleAdd = () => {
        this.setState({
            addUser: this.state.addUser ? false : true
        })
    }

    handleLogOff = () => {
        if(typeof this.props.handleLogOff === 'function'){
            this.props.handleLogOff();
        }
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (!this.state.addUser){
        this.props.onAuth(this.state.login, this.state.password);
        } else {
            this.props.addUser(this.state.login, this.state.password, this.state.password2);
            this.setState({
                addUser: false
            });
        }
    }


    render(){

        if (this.props.userIn){
            return (
                <div>
                    <h1>{this.props.userIn}</h1>
                    <h6><a href="#" onClick={this.handleLogOff}>Wyloguj</a></h6>
                </div>
            )
        } else {
            return (
                <div>
                    <form style={{width: '200px',border: this.state.error}} onSubmit={this.submitHandler}>
                        <label>
                            Login:
                            <input name="login" onChange={this.handleChange}/>
                        </label>
                        <label>
                            Hasło:
                            <input name="password" onChange={this.handleChange} type="password"/>
                        </label>
                        {this.state.addUser ? <label>
                            Hasło2:
                            <input name="password2" onChange={this.handleChange} type="password"/>
                        </label> : null}
                        <input type="submit" value="Wyślij"/>
                    </form>
                    {this.state.addUser ? null : <h6><a style={{width: '100%', textAlign: "center", display: "block"}} href="#" onClick={this.handleAdd}>Załóż konto</a></h6>}
                </div>
            )
        }
    }

}

const mapStateToProps = state => {
    return {
        userIn: state.userLogged
    };
};

const mapDispatchToProps = dispatch => {
        return {
            onAuth: (email, password) => dispatch ( actions.auth ( email, password )),
            logOff: () => dispatch ( actions.logOff()),
            addUser: (login, password, password2) => dispatch ( actions.addUser(login, password, password2))
        }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);