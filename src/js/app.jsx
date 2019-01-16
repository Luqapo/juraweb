import React from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MojaJura from "./components/MojaJura/MojaJura.jsx";
import MyList from "./containers/MyList/MyList.jsx";
import Nav from "./containers/Nav/Nav.jsx";
import SearchResult from './components/SearchResult/SearchResult.jsx';
import EastJura from './containers/EastJura/EastJura.jsx';
import CenterJura from './containers/CenterJura/CenterJura.jsx';
import NorthJura from './containers/NorthJura/NorthJura.jsx';
import CragsList from './containers/CragsList/CragsList.jsx';
import RouteList from "./containers/RouteList/RouteList.jsx";

import * as actions from './store/actions/auth.jsx';

class App extends React.Component {
    componentDidMount() {
        const token = localStorage.getItem('token');
        const expiryDate = localStorage.getItem('expiryDate');
        if (!token || !expiryDate) {
            return;
        }
        if (new Date(expiryDate) <= new Date()) {
            this.props.logOff();
            return;
        }
        const remainingMilliseconds = new Date(expiryDate).getTime() - new Date().getTime();
        const userLogin = localStorage.getItem('login');
        this.props.authStart(userLogin, token);
        this.setAutoLogout(remainingMilliseconds);
    }

    setAutoLogout = milliseconds => {
        setTimeout(() => {
          this.props.logOff();
        }, milliseconds);
    };

    render() {
        return (
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <div>
                    <Nav />
                    <Switch>
                        <Route path="/mylist" component={MyList} />
                        <Route path="/search" component={SearchResult} />
                        <Route path="/east" component={EastJura} />
                        <Route path="/center" component={CenterJura} />
                        <Route path="/north" component={NorthJura} />
                        <Route path="/crags" component={CragsList} />
                        <Route path="/routes" component={RouteList} />
                        <Route path="/" component={MojaJura} />
                    </Switch>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = state => {
    return {
        userIn: state.userLogged
    };
  };

const mapDispatchToProps = dispatch => {
    return {
        authStart: (userLogin, userToken) => dispatch ( actions.authSucces (userLogin, userToken)),
        logOff: () => dispatch ( actions.logOff())
    }
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
