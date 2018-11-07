import React from "react";
import { NavLink, withRouter } from 'react-router-dom';

import LoginForm from "./Authorization/LoginForm.jsx";
import { connect } from 'react-redux';
import * as actions from "./store/actions/auth.jsx";

class Nav extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            schowLog: false,
            search: ''
        }
    }

    handleLogOff = () => {

        this.setState({
            loggedIn: false,
            schowLog: false
        });
        this.props.logOff();
    }

    handleLogin = () => {
        this.setState({
            schowLog: this.state.schowLog ? false : true
        })
    }

    handleSerch = (e) => {
        this.setState({
            search: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch('https://mojajura.herokuapp.com/api/search', {
                method : 'POST',
                body : JSON.stringify({
                    search: this.state.search
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then( resp => resp.json())
            .then( response => {
                    this.props.history.push('/search', response);
                })
            .catch( error => {
                    console.log(error);
                })
            this.setState({
                search: ''
            })
               
    }

    render(){
        return (
            <div>
                <ul className="nav">
                    <li><NavLink to="/">KochamJure.pl</NavLink></li>
                    <li><NavLink to="/mylist">Moje przejścia</NavLink></li>
                    <li>
                        <form onSubmit={this.handleSubmit}>
                            <input onChange={this.handleSerch} placeholder="Szukaj"/>
                            <input 
                                style={{ background: 'url("../img/search.svg")', 
                                         border: '0', 
                                         height: '20px', 
                                         width: '20px'}} 
                                type="submit"
                                alt="szukaj"/>
                        </form>
                    </li>
                    { this.state.schowLog ? <LoginForm handleLogOff={this.handleLogOff} 
                                                        show={this.state.schowLog} 
                                                        showHandle={this.handleLogin}/> : 
                                            <li>
                                                <button style={{width: '100px'}} 
                                                        onClick={this.handleLogin}>
                                                Login</button>
                                            </li>}
                </ul>
            </div>
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
        logOff: () => dispatch ( actions.logOff())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Nav));