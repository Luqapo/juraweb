import React from "react";
import { Route, Switch } from 'react-router-dom';
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

    class App extends React.Component{

        render(){
            return (
                <MuiThemeProvider muiTheme={getMuiTheme()}>
                    <div>
                        <Nav/>
                        <Switch>
                            <Route path="/mylist" component={MyList} />
                            <Route path="/search" component={SearchResult} />
                            <Route path="/east" component={EastJura} />
                            <Route path="/center" component={CenterJura} />
                            <Route path="/north" component={NorthJura} />
                            <Route path="/crags" component={CragsList} />
                            <Route path="/routes" component={RouteList} />
                            <Route path="/" exact component={MojaJura} />
                        </Switch>
                    </div>
                </MuiThemeProvider>
            );
        }
    }

    export default App;
