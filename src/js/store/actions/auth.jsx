import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSucces = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCES,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logOff = () => {
    return {
        type: actionTypes.LOG_OFF
    };
};

export const addUser = (login, password, password2, email) => {
    if (login.length > 5 && password.length > 5 && password === password2 && email) {
        const newUser = {
            "login": login,
            "password": password,
            "email": email
        };
        return dispatch => {
            dispatch(authStart());
            fetch('https://mojajura.herokuapp.com/api/auth/register', {
                method : 'POST',
                body : JSON.stringify({
                    newUser
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(function (response) {
                    console.log(response);
                })
            .catch(function (error) {
                    console.log(error);
                })
        }
    };
};

export const auth = (login, password) => {
    return dispatch => {
        dispatch( authStart());
        fetch('https://mojajura.herokuapp.com/api/auth/login', {
            method : 'POST',
            body : JSON.stringify({
                login: login,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(function (response) {
                let logged = false;

                response.data.forEach( el => {
                    if ( el.login ===  login && el.password === password){
                        logged = true;
                    }
                })

                if (logged){
                    dispatch(authSucces(login));
                } else {
                    dispatch (authFail('błędne dane'));
                };
            })
        .catch(function (error){
                console.log(error);
                dispatch(authFail(error));
            })
    };
};