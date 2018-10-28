import React from "react";
import AddRoute from "./AddRoute.jsx";
import { connect } from 'react-redux';

class RouteList extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            myRoutes: [],
            addShow: false
        }
    }

    componentDidMount(){
        let newRoutes = [...this.props.routeList];
        this.setState({
            myRoutes: newRoutes
        })
    }

    handleDate = (e) => {
        let newIndex = e.currentTarget.parentElement.parentElement.dataset.index;
        let newRoutes = [...this.state.myRoutes];
        newRoutes[newIndex].date = e.target.value;

        this.setState({
            myRoutes: newRoutes
        })
    }

    handleStlye = (e) => {
        let newIndex = e.currentTarget.parentElement.parentElement.dataset.index;
        let newRoutes = [...this.state.myRoutes];
        newRoutes[newIndex].styl = e.target.value.toUpperCase();

        this.setState({
            myRoutes: newRoutes
        })
    }

    handleOcena = (e) => {
        let newIndex = e.currentTarget.parentElement.parentElement.dataset.index;
        let newRoutes = [...this.state.myRoutes];
        newRoutes[newIndex].ocena = e.target.value;

        this.setState({
            myRoutes: newRoutes
        })
    }

    handleChecked = (e) => {
        let newIndex = e.currentTarget.parentElement.parentElement.dataset.index;
        let newRoutes = [...this.state.myRoutes];
        newRoutes[newIndex].checked = e.target.checked;

        this.setState({
            myRoutes: newRoutes
        })
    }

    handleSend = () => {

        let dataToSend = [];
        this.state.myRoutes.forEach( el => {
            if (el.checked){
                dataToSend.push(el);
            }
        });


        fetch('http://localhost:3010/moje', {
            method: "POST",
            body:  JSON.stringify( {"data": dataToSend} ),
            headers: {
                'Content-Type': 'application/json'
            }

        });

    };

    handleAdd = (e) => {
        this.setState({
            addShow: this.state.addShow === false ? true : false
        })
    }

    render(){

        let rows = [];
        this.props.routeList.forEach( el => rows.push(<tr key={el._id} data-droga={el.droga}><td>{el.droga}</td><td>{el.wycena}</td>
            <td>{el.przejscia}</td><td>{el.ocena}</td><td><input onChange={this.handleDate} type="date"/></td>
            <td><select onChange={this.handleStlye}>
                <option value=""></option>
                <option value="OS">OS</option>
                <option value="FL">FL</option>
                <option value="RP">RP</option>
                <option value="PP">PP</option>
            </select>
            </td>
            <td><select onChange={this.handleOcena}>
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            </td>
            <td><input onChange={this.handleChecked} type="checkbox"/></td></tr>));

        return (
            <div style={{background: 'linear-gradient(to bottom, rgba(242,249,254,1) 0%,rgba(214,240,253,1) 100%)'}}>
                <div className="upperList">
                    <ul>
                        {this.props.listToSend}
                    </ul>
                </div>
                <table style={{width: '98%', margin: '2px', borderCollapse: "collapse"}} className="green">
                    <thead>
                    <tr>
                        <th>Nazwa</th>
                        <th>Wycena</th>
                        <th>Ocena</th>
                        <th>Przejcia</th>
                        <th>Data przejcia</th>
                        <th>Styl</th>
                        <th>Twoja ocena</th>
                        <th>Wybierz</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows}
                    {this.state.addShow ? <AddRoute/> : null}
                    </tbody>
                </table>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    { this.props.userIn ? <button onClick={this.handleAdd} style={{margin: '30px'}}>Dodaj drogę</button> : null}
                    <button onClick={this.handleSend} style={{margin: '30px'}}>Dodaj przejścia</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userIn: state.userLogged
    };
};

export default connect(mapStateToProps)(RouteList);