import React, { Component } from 'react';

class SearchResult extends Component{
    render(){
        console.log(this.props.history.location.state);
        const serchResult = this.props.history.location.state;
        return (
            <div>
                <h1>{serchResult.message}</h1>
                <h3>{`${serchResult.rejon}  >  ${serchResult.skala}  >  ${serchResult.droga}`}</h3>
            </div>
        )
    }
}

export default SearchResult;