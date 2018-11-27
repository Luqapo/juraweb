import React from "react";

import { withStyles } from '@material-ui/core/styles';

import { styles } from './NorthJuraStyles';

import { url } from '../../config/config';
import MyButton from '../../components/MyButton/MyButton.jsx';

class NorthJura extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            data: '',
            background: 'url("../img/Rzędkowice.jpg")'
        }
    }

    componentDidMount() {
        fetch(`${url}/api/regiony/north`)
            .then( resp => resp.json())
            .then( resp => {
                this.setState({
                    data: resp
                })
            })
            .catch( err => {
                console.log('Błąd!', err);
            });
    }

    handleSchow = (e)=> {
        let rejonName = e.currentTarget.dataset.rejon;

            fetch(`${url}/api/rejony/${rejonName}`)
            .then( resp => resp.json())
            .then( resp => {
                resp.background = this.state.background;
                this.props.history.push('/crags', resp);
            })   
    }

    render(){

        const { classes } = this.props;
        const data = [...this.state.data];
        let listElements = data.map( el => (
                        <div key={el._id} className={classes.buttonCenter}>
                            <MyButton  
                                handleClick={this.handleSchow} 
                                rejon={el.rejon}
                                name={el.rejon}/>
                        </div>)
                    );
            return (
                <div style={{background: this.state.background,
                             backgroundSize: 'cover'}} 
                             className={classes.myJura}>
                             {listElements}
                </div>
            )
    }
}

export default withStyles(styles)(NorthJura);