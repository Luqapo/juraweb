import React from "react";

import { withStyles } from '@material-ui/core/styles';

import { styles } from './EastJuraStyles';

import { url } from '../../config/config';
import MyButton from '../../components/MyButton/MyButton.jsx';

class EastJura extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            data: '',
        }
    }

    componentDidMount() {
        fetch(`${url}/api/regiony/east`)
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
                <div style={{background: 'url("../img/dupa_slonia.jpg")', 
                             backgroundSize: 'cover'}}
                             className={classes.myJura}>
                            {listElements}
                </div>
            )
    }
}

export default withStyles(styles)(EastJura);