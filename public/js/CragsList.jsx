import React, {Component} from "react";
import RouteList from "./RouteList.jsx";

class CragsList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            schowList: false,
            routesList: '',
            listToSend: ''
        }
    }

    handleList = (e) => {
        let routeIndex = e.target.dataset.index;
        let newArray = [...this.props.sklayToShow];
        let routeToSend = newArray[routeIndex].drogi;

        let newArr = [...this.props.sklayToShow];

        let newList = newArr.map( (el,index) => <li key={index}><a onClick={this.handleList} href="#" data-index={index}>{el.name}</a></li>)

        this.setState({
            schowList: true,
            routeList: routeToSend,
            listToSend: newList
        })
    }

    render(){

        let newArr = [...this.props.sklayToShow];

        let newList = newArr.map( (el,index) => <li key={index}><a onClick={this.handleList} href="#" data-index={index}>{el.name}</a></li>)


        if(this.state.schowList === false){
            return (
                <div style={{width: '100%', background: this.props.background, backgroundSize: 'cover'}}>
        <div className="upperList">
                <ul>
                {this.props.data}
        </ul>
            </div>
            <div className="downList">
                <ul>
                {newList}
                </ul>
                </div>
                </div>
        )
        } else {
            return <RouteList routeList={this.state.routeList} listToSend={this.state.listToSend} />
        }
    }
}

export default CragsList;