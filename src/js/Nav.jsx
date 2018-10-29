import React from "react";
import LoginForm from "./Authorization/LoginForm.jsx";
import { connect } from 'react-redux';
import * as actions from "./store/actions/auth.jsx";

class Nav extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            schowLog: false
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
            this.props.handleList();
        }
    }

    handleJura = () => {
        if(typeof this.props.handleJura === 'function'){
            this.props.handleJura();
        }
    }

    handleLogin = () => {
        this.setState({
            schowLog: true
        })
    }

    handleSerch = () => {
        console.log("szukam");
        fetch(`http://localhost:3010/regiony?name_like=Pazurek`)
            .then( resp => resp.json())
            .then( resp => {
                console.log(resp)

            })
            .catch( err => {
                console.log('Błąd!', err);
            });
    }

    render(){
        return (
            <div>
                <ul className="nav">
                    <li><a onClick={this.handleJura} href="#">KochamJure.pl</a></li>
                    <li><a onClick={this.handleList} href="#">Moje przejścia</a></li>
                    <li><input onClick={this.handleSerch} placeholder="Szukaj"/></li>
                    { this.state.schowLog ? <LoginForm handleLogOff={this.handleLogOff} show={this.state.schowLog}/> : <li><a onClick={this.handleLogin} href="#">Login</a></li>}
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