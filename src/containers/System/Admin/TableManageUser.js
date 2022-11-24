import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import './TableManageUser.scss';

// Convert to class component
class TableManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TableManageUser: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllUser();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.listusers !== this.props.listusers) {
      this.setState({
        TableManageUser: this.props.listusers,
      });
    }
  }

  handleDeleteUser = (user) => {
    this.props.deleteUser(user.id);
  };

  handleEditUser = (user) => {
    this.props.handleEditUserFormParent(user);
  };

  render() {
    let arrUser = this.state.TableManageUser;
    return (
      <table id="TableManageUser">
        <tbody>
          <tr>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
          {arrUser.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.email}</td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.address}</td>
                <td>
                  <button className="btn-edit" onClick={() => this.handleEditUser(item)}>
                    <i className="fas fa-pencil-alt"></i>
                  </button>
                  <button className="btn-delete" onClick={() => this.handleDeleteUser(item)}>
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listusers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUser: () => dispatch(actions.fetchAllUserStart()),
    deleteUser: (id) => dispatch(actions.deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
