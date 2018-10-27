import React from "react";
import CragsList from "./CragsList.jsx";


class CenterJura extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            skaly: '',
            sklayToShow: '',
            background: 'url("../img/ogro.jpg")'
        }
    }


    componentDidMount() {
        fetch(`http://localhost:5000/api/regiony/center`)
            .then( resp => resp.json())
            .then( resp => {
                // let list = resp[0].rejony;
                // let skalyArr = [];
                // list.forEach(el => skalyArr.push(el.skaly));
                let listElements = resp.map( (el,index) => <li key={el._id}><a href="#" onClick={this.handleSchow} data-index={index} data-id="2">{el.rejon}</a></li>);

                this.setState({
                    data: listElements
                    //skaly: skalyArr
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
        let style = this.props.flexCenter == 5 ? {display: 'block'} : {display: 'none'};

        if(this.props.schowCenter === false){
            return (
                <div style={{flex: this.props.flexCenter,background: 'url("../img/ogro.jpg")', backgroundSize: 'cover'}} data-id="2" className="center" onClick={this.handleClick}>
                    <h1 data-id="2"><a href="#" data-id="2">Jura Środkowa</a></h1>
                    <div style={style}>
                        <ul>
                            {this.state.data}
                        </ul>
                    </div>
                </div>
            )
        } else if(this.props.schowCenter === true) {
            return <CragsList background={this.state.background} sklayToShow={this.state.sklayToShow} data={this.state.data}/>
        }
    }
}

export default CenterJura;