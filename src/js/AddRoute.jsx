import React from "react";


class AddRoute extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            routeToAdd: '',
            name: '',
            wycena: ''
        }
    }

    handleName = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    handleSelect = (e) => {
        this.setState({
            wycena: e.target.value
        })
    }

    handleSend = () => {

        let newName = this.state.name;
        let newWycena = this.state.wycena;

        const obj = {
            skala: this.props.skala,
            droga: newName,
            wycena: newWycena,
            przejscia: 0,
            ocena: 0
        };
        console.log(obj);
    }

    render(){
        return (
            <tr style={{marginTop: '20px'}}><td><input onChange={this.handleName}/></td><td>
                <select onChange={this.handleSelect}>
                    <option value="V">V</option>
                    <option value="V+">V+</option>
                    <option value="VI">VI</option>
                    <option value="VI+">VI+</option>
                    <option value="VI.1">VI.1</option>
                    <option value="VI.1+">VI.1+</option>
                    <option value="VI.2">VI.2</option>
                    <option value="VI.2+">VI.2+</option>
                    <option value="VI.3">VI.3</option>
                    <option value="VI.3+">VI.3+</option>
                    <option value="VI.4">VI.4</option>
                    <option value="VI.4+">VI.4+</option>
                    <option value="VI.5">VI.5</option>
                    <option value="VI.5+">VI.5+</option>
                    <option value="VI.6">VI.6</option>
                    <option value="VI.6+">VI.6+</option>
                    <option value="VI.7">VI.7</option>
                    <option value="VI.7+">VI.7+</option>
                </select>
            </td><td><button onClick={this.handleSend}>Zapisz</button></td></tr>
        )
    }
}

export default AddRoute;