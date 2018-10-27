import React from "react";
import NorthJura from "./NorthJura.jsx";
import CenterJura from "./CenterJura.jsx";
import EastJura from "./EastJura.jsx";


class MojaJura extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            flexEast: '1',
            flexCenter: '1',
            flexNorth: '1',
            schowEast: false,
            schowCenter: false,
            schowNorth: false
        }
    }

    handleSchow = (e) => {
        e.stopPropagation();
        let data = e.target.dataset.id;
        if(data == 1){
            this.setState({
                schowEast: true
            })
        } else if (data == 2){
            this.setState({
                schowCenter: true
            })
        } else {
            this.setState({
                schowNorth: true
            })
        }
    }

    hanldeFlex = (data) => {
        if(data == 1){
            this.setState({
                flexEast: '5',
                flexCenter: '1',
                flexNorth: '1',
                schowEast: false,
                schowCenter: false,
                schowNorth: false
            })
        } else if (data == 2){
            this.setState({
                flexEast: '1',
                flexCenter: '5',
                flexNorth: '1',
                schowEast: false,
                schowCenter: false,
                schowNorth: false
            })
        } else {
            this.setState({
                flexEast: '1',
                flexCenter: '1',
                flexNorth: '5',
                schowEast: false,
                schowCenter: false,
                schowNorth: false
            })
        }
    }

    render(){
        return (
            <div className="mainContainer">
                <EastJura hanldeFlex={this.hanldeFlex} flexEast={this.state.flexEast} handleSchow={this.handleSchow} schowEast={this.state.schowEast}/>
                <CenterJura hanldeFlex={this.hanldeFlex} flexCenter={this.state.flexCenter} handleSchow={this.handleSchow} schowCenter={this.state.schowCenter}/>
                <NorthJura hanldeFlex={this.hanldeFlex} flexNorth={this.state.flexNorth} handleSchow={this.handleSchow} schowNorth={this.state.schowNorth}/>
            </div>
        )
    }
}

export default MojaJura;