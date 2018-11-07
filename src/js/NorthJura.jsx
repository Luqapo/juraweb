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
        fetch(`https://mojajura.herokuapp.com/api/regiony/north`)
            .then( resp => resp.json())
            .then( resp => {
                let listElements = resp.map( el => <li 
                                                        key={el._id}><a 
                                                        href="#" 
                                                        onClick={this.handleSchow} 
                                                        data-rejon={el.rejon} 
                                                        data-id="3">{el.rejon}</a>
                                                    </li>);

                this.setState({
                    data: listElements
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

            let rejonName = e.target.dataset.rejon;

            fetch(`https://mojajura.herokuapp.com/api/rejony/${rejonName}`)
            .then( resp => resp.json())
            .then( resp => {
                    this.setState({
                        sklayToShow: resp
                    })
            })   
        }
    }

    render(){

        let style = this.props.flexNorth == 5 ? {display: 'block'} : {display: 'none'};

        if(this.props.schowNorth === false){
            return (
                <div style={{flex: this.props.flexNorth,
                            background: 'url("../img/Rzędkowice.jpg")',
                            backgroundSize: 'cover'}} 
                        data-id="3" className="north" 
                        onClick={this.handleClick}>
                    <h1 data-id="3"><a href="#" data-id="3">Jura Północna</a></h1>
                    <div style={style}>
                        <ul>
                            {this.state.data}
                        </ul>
                    </div>
                </div>
            )
        } else if(this.props.schowNorth === true) {
            return <CragsList background={this.state.background} 
                        sklayToShow={this.state.sklayToShow} 
                        data={this.state.data}/>
        }
    }
}

export default NorthJura;