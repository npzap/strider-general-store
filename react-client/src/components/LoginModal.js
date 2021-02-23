import React, { Component } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { connect } from 'react-redux'
import { handleLogin } from "../actions/authedUser";


class LoginModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            username: 'admin',
            password: 'password'
        }

        this.login = this.login.bind(this);
    }


    login() {
        this.props.dispatch(handleLogin(this.state.username, this.state.password));
        this.props.closeModal();
    }

    render() {
        const { showModal, closeModal } = this.props;

        return (
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton></Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <Form.Control value={this.state.username} readOnly/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control value={this.state.password} readOnly/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>Close</Button>
                    <Button variant="primary" onClick={this.login}>Login</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

function mapStateToProps({ dispatch }, props){
    return {
        ...props,
        dispatch
    }
}

export default connect(mapStateToProps)(LoginModal);