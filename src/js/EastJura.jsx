import React from "react";
import CragsList from "./CragsList.jsx";

class EastJura extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            skaly: '',
            sklayToShow: '',
            background: 'url("../img/dupa_slonia.jpg")'

        }
    }


    componentDidMount() {
        fetch(`https://mojajura.herokuapp.com/api/regiony/east`)
            .then( resp => resp.json())
            .then( resp => {

                // let list = resp[0].rejony;
                // let skalyArr = [];
                // list.forEach(el => skalyArr.push(el.skaly));
                let listElements = resp.map( (el,index) => <li key={el._id}><a href="#" onClick={this.handleSchow} data-index={index} data-id="1">{el.rejon}</a></li>);


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

        let style = this.props.flexEast == 5 ? {display: 'block'} : {display: 'none'};

        if(this.props.schowEast === false){
            return (
                <div style={{flex: this.props.flexEast,background: 'url("../img/dupa_slonia.jpg")', backgroundSize: 'cover'}} data-id="1" className="east" onClick={this.handleClick}>
                    <h1 data-id="1"><a href="#" data-id="1">Jura Południowa</a></h1>
                    <div style={style}>
                        <ul>
                            {this.state.data}
                        </ul>
                    </div>
                </div>
            )
        } else if(this.props.schowEast === true) {
            return <CragsList background={this.state.background} sklayToShow={this.state.sklayToShow} data={this.state.data}/>
        }
    }
}

export default EastJura;