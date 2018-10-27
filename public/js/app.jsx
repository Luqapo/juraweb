import React from "react";
import ReactDOM from "react-dom";
import MojaJura from "./MojaJura.jsx";
import MyList from "./MyList.jsx";
import Nav from "./Nav.jsx";







    class App extends React.Component{
        constructor(props) {
            super(props);

            this.state = {
                myList: false,
                userLogged: ''
            }
        }

        handleList = () => {
            this.setState({
                myList: true
            })
        }

        handleJura = () => {
            this.setState({
                myList: false
            })
        }

        render(){

            if(this.state.myList === false) {
            return (
                <div>
                    <Nav handleList={this.handleList} handleJura={this.handleJura}/>
                    <MojaJura/>
                </div>
            )
            } else {
                return (
                    <div>
                        <Nav handleList={this.handleList} handleJura={this.handleJura}/>
                        <MyList/>
                    </div>
                )
            }
        }
    }

    export default App;
