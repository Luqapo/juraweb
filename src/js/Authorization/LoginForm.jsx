import React from "react";
import { connect } from 'react-redux';

import * as actions from '../store/actions/auth.jsx';

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
            this.props.addUser(this.state.login, this.state.password, this.state.password2, this.state.email);
            this.setState({
                addUser: false
            });
        }
    }


    render(){
        const showHideClassName = this.props.show ? "modal display-block" : "modal dispaly-none";
        const addAcount = [
            <input key="input1" className="InputElement" name="password2" onChange={this.handleChange} type="password" placeholder="Powtórz hasło"/>,
            <input key="input2" className="InputElement" name="email" onChange={this.handleChange} type="email" placeholder="Email"/>
        ];
        if (this.props.userIn){
            return (
                <div>
                    <h1>{this.props.userIn}</h1>
                    <h6><button onClick={this.handleLogOff}>Wyloguj</button></h6>
                </div>
            )
        } else {
            return (
                <div className={showHideClassName}>
                    <section className="modal-main">
                        <form style={{border: this.state.error}} className="Input" onSubmit={this.submitHandler}>
                                <input className="InputElement" name="login" onChange={this.handleChange} placeholder="Login"/>
                                <input className="InputElement" name="password" onChange={this.handleChange} type="password" placeholder="Password"/>
                            {this.state.addUser ? 
                                addAcount
                             : null}
                            <input className="InputElement" type="submit" value="Wyślij"/>
                        </form>
                        {this.state.addUser ? null : <h6><button style={{width: '90%', textAlign: "center", display: "block"}} onClick={this.handleAdd}>Załóż konto</button></h6>}
                        <h6><button style={{width: '90%', textAlign: "center", display: "block"}} onClick={this.props.showHandle}>Anuluj</button></h6>
                    </section>
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
            onAuth: (login, password) => dispatch ( actions.auth ( login, password )),
            logOff: () => dispatch ( actions.logOff()),
            addUser: (login, password, password2, email) => dispatch ( actions.addUser(login, password, password2, email))
        }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);