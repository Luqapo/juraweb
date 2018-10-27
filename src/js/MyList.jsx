import React from "react";


class MyList extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            list: ''
        }
    }


    componentDidMount() {
        fetch(`http://localhost:3010/moje?name=data`)
            .then( resp => resp.json())
            .then( resp => {
                let arr = [...resp];
                let newArr = [];
                arr.forEach(el => el.data.forEach( route => newArr.push(route)));

                this.setState({
                    list: newArr
                })

            })
            .catch( err => {
                console.log('Błąd!', err);
            });
    }

    render(){

        let rows = [];
        const myList = [...this.state.list];
        myList.forEach( (el,index) => rows.push(<tr key={index}><td>{el.date}</td><td>{el.wycena}</td><td>{el.styl}</td>
            <td>{el.name}</td><td>xxx</td><td>yyy</td><td>{el.ocena}</td><td><button>Edytuj</button></td></tr>))


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

export default MyList;