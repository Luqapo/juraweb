import React, { Component } from 'react';

class SearchResult extends Component{
    render(){
        const serchResult = this.props.history.location.state;
        let result = null;
        if (serchResult.message){
            result = <h1>{serchResult.message}</h1>;
        } else {
            result = <h3>{`${serchResult.rejon}  >  ${serchResult.skala}  >  ${serchResult.droga}`}</h3>;
        }
        return (
            <div className="SearchResults">
                {result}    
            </div>
        )
    }
}

export default SearchResult;