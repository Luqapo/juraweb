import React from "react";
import { Route, Switch } from 'react-router-dom';

import MojaJura from "./MojaJura.jsx";
import MyList from "./MyList.jsx";
import Nav from "./Nav.jsx";
import SearchResult from './SearchResult/SearchResult.jsx'

    class App extends React.Component{

        render(){
            return (
                <div>
                    <Nav/>
                    <Switch>
                        <Route path="/mylist" component={MyList} />
                        <Route path="/search" component={SearchResult} />
                        <Route path="/" exact component={MojaJura} />
                    </Switch>
                </div>
            );
        }
    }

    export default App;
