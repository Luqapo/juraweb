import React, {Component} from "react";
import RouteList from "./RouteList.jsx";

class CragsList extends Component{
    constructor(props) {
        super(props);

        this.state = {
            schowList: false,
            routesList: '',
            listToSend: '',
            skala: '',
            rejon: ''
        }
    }

    handleList = (e) => {
        let skalaName = e.target.dataset.skala;
        let newArr = [...this.props.sklayToShow];
        let newRejon = newArr[0].rejon
        let newList = newArr.map( el => <li key={el._id}>
                                            <a onClick={this.handleList} 
                                            href="#" data-skala={el.skala}>{el.skala}</a>
                                        </li>);

        fetch(`http://localhost:5000/api/skaly/${skalaName}`)
            .then( resp => resp.json())
            .then( resp => {
                    this.setState({
                        routeList: resp,
                        schowList: true,
                        listToSend: newList,
                        skala: skalaName,
                        rejon: newRejon
                    })
            })   

        
    }

    render(){

        let newArr = [...this.props.sklayToShow];

        let newList = newArr.map( el => <li key={el._id}>
                                            <a onClick={this.handleList} 
                                            href="#" data-skala={el.skala}>{el.skala}</a>
                                        </li>)


        if(this.state.schowList === false){
            return (
                <div style={{width: '100%',
                        background: this.props.background,
                        backgroundSize: 'cover'}}>
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
            return <RouteList 
                        routeList={this.state.routeList} 
                        listToSend={this.state.listToSend} 
                        skalaName={this.state.skala}
                        rejonName={this.state.rejon}/>
        }
    }
}

export default CragsList;