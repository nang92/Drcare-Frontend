import React, { useState, Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { emitter } from '../../utils/emitter';

// Convert to class component
class ModalManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      address: '',
    };
    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on('EVENT_CLEAR_INPUT', () => {
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        address: '',
      });
    });
  }

  componentDidMount() {}
  toggle = () => {
    this.props.toggleFormParent();
  };

  handelOnchangeInput = (e, id) => {
    this.setState({
      [id]: e.target.value,
    });
  };

  checkValidateInput = () => {
    let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
    let isValid = true;
    for (let i = 0; i < arrInput.length; i++) {
      if (this.state[arrInput[i]] === '') {
        isValid = false;
        alert(arrInput[i] + ' is empty');
        break;
      }
    }
    return isValid;
  };

  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.createNewUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => {
          this.toggle();
        }}
        className="modal-user-container"
        size="lg"
      >
        <ModalHeader
          toggle={() => {
            this.toggle();
          }}
        >
          Create a new User
        </ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                onChange={(e) => {
                  this.handelOnchangeInput(e, 'email');
                }}
                value={this.state.email}
              />
            </div>

            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(e) => {
                  this.handelOnchangeInput(e, 'password');
                }}
                value={this.state.password}
              />
            </div>
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                onChange={(e) => {
                  this.handelOnchangeInput(e, 'firstName');
                }}
                value={this.state.firstName}
              />
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                onChange={(e) => {
                  this.handelOnchangeInput(e, 'lastName');
                }}
                value={this.state.lastName}
              />
            </div>
            <div className="input-container max-width-input">
              <label>Address</label>
              <input
                type="text"
                onChange={(e) => {
                  this.handelOnchangeInput(e, 'address');
                }}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="px-3" color="primary" onClick={this.handleAddNewUser}>
            Add User
          </Button>{' '}
          <Button className="px-3" color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalManage);
