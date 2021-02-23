import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Redirect, Switch, useHistory } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import { handleLogin, handleLogout } from "../actions/authedUser";
import HeaderNavbar from './HeaderNavbar.js';
import LoginModal from './LoginModal.js';
import Homepage from "./Homepage";
import PurchasePage from "./PurchasePage";
import ReceiptPage from "./ReceiptPage";
import ItemPage from "./ItemPage";



class App extends Component {

    constructor(props){
        super(props);

        this.state = {
            showLogin: null
        }

        this.loginUser = this.loginUser.bind(this);
        this.logoutUser = this.logoutUser.bind(this);
        this.openLoginModal = this.openLoginModal.bind(this);
        this.closeLoginModal = this.closeLoginModal.bind(this);
    }

    loginUser(username, password){
        this.props.dispatch(handleLogin(username, password));
        this.closeLoginModal();
    }

    logoutUser(){
        this.props.dispatch(handleLogout());
    }

    openLoginModal(){
        this.setState({showLogin: true});
    }

    closeLoginModal(){
        this.setState({showLogin: false});
    }


    render() {
        const{ authedUser } = this.props;

        let modal = <LoginModal showModal={this.state.showLogin} closeModal={this.closeLoginModal}/>


        return (
            <Router>
                <Fragment>
                    <LoadingBar/>
                    <HeaderNavbar openLoginModal={this.openLoginModal} logoutUser={this.logoutUser}/>
                    <Switch>
                        <Route path='/' exact render={() => (
                            <Redirect to='/home'/>
                        )}/>
                        <Route path='/home' exact render={() => (
                            <Homepage openLoginModal={this.openLoginModal}/>
                        )}/>
                        <Route path='/purchase' exact render={() => (
                            authedUser!=null ? (
                                <PurchasePage/>
                            ):(
                                <Redirect to='/home'/>
                            )
                        )}/>
                        <Route path='/receipts' exact render={() => (
                            authedUser!=null ? (
                                <ReceiptPage/>
                            ):(
                                <Redirect to='/home'/>
                            )
                        )}/>
                    </Switch>
                    {modal}
                </Fragment>
            </Router>
        );
    }
}

function mapStateToProps({ authedUser }, props){
    return {
        authedUser,
        ...props
    }
}

export default connect(mapStateToProps)(App);
