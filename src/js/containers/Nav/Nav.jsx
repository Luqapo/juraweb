import React from "react";
import {Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

import LoginForm from "../LoginForm/LoginForm.jsx";
import * as actions from "../../store/actions/auth.jsx";

import { styles } from './NavStyles'
import { url } from '../../config/config';

class Nav extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            schowLog: false,
            search: '',
            anchorEl: null,
            mobileMoreAnchorEl: null,
        }
    }

    handleLogOff = () => {

        this.setState({
            loggedIn: false,
            schowLog: false
        });
        this.props.logOff();
    }

    handleLogin = () => {
        this.setState({
            schowLog: this.state.schowLog ? false : true
        })
    }

    handleSerch = (e) => {
        this.setState({
            search: e.target.value
        });
        if(e.key === 'Enter'){
            this.handleSubmit(e);
        }
    }

    handleMobileMenuOpen = event => {
        this.setState({ mobileMoreAnchorEl: event.currentTarget });
    };

    handleMobileMenuClose = () => {
        this.setState({ mobileMoreAnchorEl: null });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        fetch(`${url}/api/search`, {
                method : 'POST',
                body : JSON.stringify({
                    search: e.target.value
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed to fetch search results!');
                }
                return res.json();
            })
            .then( response => {
                    this.props.history.push('/search', response);
                })
            .catch(err => this.props.catchError(err));
            this.handleMobileMenuClose();
    }

    render(){
        const { classes } = this.props;
        const { mobileMoreAnchorEl } = this.state;
        const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
        const MyJura = props => <Link to="/" {...props}/>
        const MyList = props => <Link to="/mylist" {...props}/>

        const renderMobileMenu = (
            <Menu
              anchorEl={mobileMoreAnchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMobileMenuOpen}
              onClose={this.handleMobileMenuClose}
            >
              <MenuItem>
                <div className={classes.upBarItem}>
                    <Button component={MyList} color="inherit" onClick={this.handleMobileMenuClose}>
                        Moje przejścia
                    </Button>
                </div>
              </MenuItem>
              <MenuItem>
                <div className={classes.upBarItem}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                                    <InputBase
                                        placeholder="Search…"
                                        classes={{
                                            root: classes.inputRoot,
                                            input: classes.inputInput,
                                        }}
                                        onKeyPress={this.handleSerch}
                                        />
                    </div>
                </div>
              </MenuItem>
              <MenuItem onClick={this.handleProfileMenuOpen}
                        onClick={this.handleMobileMenuClose}>>
                    <div className={classes.upBarItem}>    
                    { this.props.userIn ?  <Button color="inherit" size="large"
                                                    onClick={this.handleLogOff}>
                                                    Log out
                                             </Button>
                                          : 
                                             <Button color="inherit" 
                                                     size="large"
                                                     onClick={this.handleLogin}>
                                                Login
                                            </Button>}
                    </div>
              </MenuItem>
            </Menu>
          );
        return (
            <div className={classes.root}>
                <AppBar position="fixed">
                    <Toolbar>
                         <div className={classes.sectionMobile}>
                            <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                                <MenuIcon />
                            </IconButton>
                        </div>
                        <div className={classes.upBar}>
                            <div className={classes.upBarItem}>
                                <Button component={MyJura} color="inherit">
                                    Moja Jura
                                </Button>
                            </div>
                            { this.state.schowLog ? <LoginForm 
                                                        handleLogOff={this.handleLogOff} 
                                                        show={this.state.schowLog} 
                                                        showHandle={this.handleLogin}/>
                                                         : null}
                            <div className={classes.sectionDesktop}>
                                <div className={classes.upBarItem}>
                                    <div className={classes.search}>
                                        <div className={classes.searchIcon}>
                                        <SearchIcon />
                                        </div>
                                        <InputBase
                                            placeholder="Search…"
                                            classes={{
                                                root: classes.inputRoot,
                                                input: classes.inputInput,
                                            }}
                                            onKeyDown={this.handleSerch}
                                        />
                                    </div>
                                </div>
                                <div className={classes.upBarItem}>
                                    {this.props.userIn ? <Button component={MyList} color="inherit">
                                        Moje przejścia
                                    </Button> : null }
                                </div>
                                <div className={classes.upBarItem}>    
                                    { this.props.userIn ?     <Button color="inherit" size="large"
                                                                    onClick={this.handleLogOff}>
                                                                    Log out
                                                                </Button>
                                                                : 
                                                                <Button color="inherit" size="large"
                                                                        onClick={this.handleLogin}>
                                                                Login</Button>}
                                </div>
                            </div>
                        </div>
                        {renderMobileMenu}
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userIn: state.userLogged
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logOff: () => dispatch( actions.logOff()),
        catchError: (err) => dispatch( actions.catchError(err) )
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(withRouter(Nav)));