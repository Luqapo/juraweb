import * as actionTypes from './actions/actionTypes';

const initialSate = {
    userLogged: '',
    token: null,
    error: null
}



const reducer = (state = initialSate,action) => {
    switch ( action.type ) {
        case actionTypes.AUTH_SUCCES:
            return {
                ...state,
                userLogged: action.login,
                token: action.token
            };

        case actionTypes.LOG_OFF:
            return {
                ...state,
                userLogged: '',
                token: null
            };
        
        case actionTypes.ERROR:
            return {
                ...state,
                error: action.error
            };
    }
    return state;
};

export default reducer;