import React from "react";
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

    handleList = () => {
        if(typeof this.props.handleList === 'function'){
            if(this.props.userIn){
                this.props.handleList();
            }
        }
    }

    handleJura = () => {
        if(typeof this.props.handleJura === 'function'){
            this.props.handleJura();
        }
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
        console.log(this.state.search);
        fetch('http://localhost:5000/api/search', {
                method : 'POST',
                body : JSON.stringify({
                    search: this.state.search
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
            this.setState({
                search: ''
            })
    }

    render(){
        return (
            <div>
                <ul className="nav">
                    <li><a onClick={this.handleJura} href="#">KochamJure.pl</a></li>
                    <li><a onClick={this.handleList} href="#">Moje przejścia</a></li>
                    <li>
                        <form onSubmit={this.handleSubmit}>
                            <input onChange={this.handleSerch} placeholder="Szukaj"/>
                            <input 
                                style={{ background: 'url("../img/search.svg")', border: '0', height: '20px', width: '20px'}} 
                                type="submit"
                                alt="szukaj"/>
                        </form>
                        </li>
                    { this.state.schowLog ? <LoginForm handleLogOff={this.handleLogOff} show={this.state.schowLog} showHandle={this.handleLogin}/> : <li><a onClick={this.handleLogin} href="#">Login</a></li>}
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

export default connect(mapStateToProps,mapDispatchToProps) (Nav);