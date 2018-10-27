import React from "react";
import CragsList from "./CragsList.jsx";


class NorthJura extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            skaly: '',
            sklayToShow: '',
            background: 'url("../img/Rzędkowice.jpg")'
        }
    }


    componentDidMount() {
        fetch(`http://localhost:3010/regiony?name=north`)
            .then( resp => resp.json())
            .then( resp => {
                let list = resp[0].rejony;
                let skalyArr = [];
                list.forEach(el => skalyArr.push(el.skaly));
                let listElements = list.map( (el,index) => <li key={index}><a href="#" onClick={this.handleSchow} data-index={index} data-id="3">{el.name}</a></li>);

                this.setState({
                    data: listElements,
                    skaly: skalyArr
                })
            })
            .catch( err => {
                console.log('Błąd!', err);
            });
    }

    handleClick = (e) => {
        if(typeof this.props.hanldeFlex === 'function'){
            this.props.hanldeFlex(e.target.dataset.id);
        }
    }

    handleSchow = (e)=> {
        if(typeof this.props.handleSchow === 'function'){
            this.props.handleSchow(e);

            let skalyIndex = e.target.dataset.index;
            let newArr = [...this.state.skaly[skalyIndex]];

            this.setState({
                sklayToShow: newArr
            })
        }
    }

    render(){

        let style = this.props.flexNorth == 5 ? {display: 'block'} : {display: 'none'};

        if(this.props.schowNorth === false){
            return (
                <div style={{flex: this.props.flexNorth,background: 'url("../img/Rzędkowice.jpg")'}} data-id="3" className="north" onClick={this.handleClick}>
                    <h1 data-id="3"><a href="#" data-id="3">Jura Północna</a></h1>
                    <div style={style}>
                        <ul>
                            {this.state.data}
                        </ul>
                    </div>
                </div>
            )
        } else if(this.props.schowNorth === true) {
            return <CragsList background={this.state.background} sklayToShow={this.state.sklayToShow} data={this.state.data}/>
        }
    }
}

export default NorthJura;