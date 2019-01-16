import React, { Component } from "react";
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import * as actions from '../../store/actions/auth.jsx';
import { styles } from './ErrorModalStyles';

class ErrorModal extends Component{
    constructor(props) {
        super(props);

        this.state = {
            password: '',
            password2: '',
            email: '',
            addUser: false,
            login: '',
            error: ''
        }
    }

    handleError = () => {
        this.props.dismissError();
    }

    render(){
        const { classes } = this.props;
        const openModal = Boolean(this.props.error);
        
        return (
                    <Modal
                        aria-labelledby="error-modal-title"
                        aria-describedby="error-modal-description"
                        open={openModal}
                        onClose={this.handleError}
                    >
                        <div className={classes.paper}>
                            <div className={classes.buttonCenter}>
                                <p className={classes.error}>{this.props.error ? this.props.error.message : null}</p>
                            </div>
                            <div className={classes.buttonCenter}>
                                <Button onClick={this.handleError}>Anuluj</Button>
                            </div>
                        </div>
                    </Modal>
            )
    }

}

const mapStateToProps = state => {
    return {
        error: state.error
    };
};

const mapDispatchToProps = dispatch => {
        return {
            dismissError: () => dispatch ( actions.dismissError())
        }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)((ErrorModal)));