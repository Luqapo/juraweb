import React from "react";
import { connect } from "react-redux";


class MyList extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            list: ''
        }
    }


    componentDidMount() {
        fetch(`http://localhost:5000/api/ascents/${this.props.userIn}`)
            .then( resp => resp.json())
            .then( resp => {
                
                this.setState({
                    list: resp
                })

            })
            .catch( err => {
                console.log('Błąd!', err);
            });
    }

    render(){

        let rows = [];
        const myList = [...this.state.list];
        myList.forEach( el => rows.push(<tr key={el._id}><td>{el.date}</td><td>{el.wycena}</td><td>{el.styl}</td>
            <td>{el.droga}</td><td>{`${el.rejon}/${el.skala}`}</td><td>{el.comment}</td><td>{el.towjaOcena}</td><td><button>Edytuj</button></td></tr>))


        return (
            <div>
                <table style={{width: '98%', margin: '2px', borderCollapse: "collapse"}}>
                    <thead>
                    <tr>
                        <th>Data przejcia</th>
                        <th>Wycena</th>
                        <th>Styl</th>
                        <th>Nazwa</th>
                        <th>Rejon/skała</th>
                        <th>Komentarz</th>
                        <th>Ocena</th>
                        <th>Edytuj</th>
                    </tr>
                    </thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userIn: state.userLogged
    };
};

export default connect(mapStateToProps)(MyList);