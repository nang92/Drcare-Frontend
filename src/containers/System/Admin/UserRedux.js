import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils/';
import Lightbox from 'react-image-lightbox';
import TableManageUser from './TableManageUser';

import './UserRedux.scss';
import 'react-image-lightbox/style.css';

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImage: '',
      isOpen: false,

      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      gender: '',
      position: '',
      role: '',
      avatar: '',

      action: '',
      userEditId: '',
    };
  }

  async componentDidMount() {
    this.props.fetchGenderStart();
    this.props.fetchPositionStart();
    this.props.fetchRoleStart();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGender = this.props.genderRedux;
      this.setState({
        genderArr: this.props.genderRedux,
        gender: arrGender && arrGender.length > 0 ? arrGender[0].key : '',
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPosition = this.props.positionRedux;
      this.setState({
        positionArr: this.props.positionRedux,
        position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : '',
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;

      this.setState({
        roleArr: this.props.roleRedux,
        role: arrRole && arrRole.length > 0 ? arrRole[0].key : '',
      });
    }
    if (prevProps.listusers !== this.props.listusers) {
      let arrRole = this.props.roleRedux;
      let arrGender = this.props.genderRedux;
      let arrPosition = this.props.positionRedux;
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        gender: arrGender && arrGender.length > 0 ? arrGender[0].key : '',
        position: arrPosition && arrPosition.length > 0 ? arrPosition[0].key : '',
        role: arrRole && arrRole.length > 0 ? arrRole[0].key : '',
        avatar: '',
        action: CRUD_ACTIONS.CREATE,
      });
    }
  }
  hanleOnChangeImg = (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = CommonUtils.getBase64(file);
      this.setState({
        previewImage: URL.createObjectURL(file),
        avatar: base64,
      });
    }
  };
  isOpenPreview = () => {
    // disbale click when previewImage is empty
    if (!this.state.previewImage) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValid();
    if (isValid === false) return;

    let action = this.state.action;

    if (action === CRUD_ACTIONS.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phonenumber: this.state.phoneNumber,
        address: this.state.address,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    } else if (action === CRUD_ACTIONS.EDIT) {
      this.props.editUserService({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        phonenumber: this.state.phoneNumber,
        address: this.state.address,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        //avatar: this.state.avatar,
      });
    }
  };

  checkValid = () => {
    let isValid = true;
    let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert('Please fill all fields:' + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  onChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditUserFormParent = (user) => {
    this.setState({
      email: user.email,
      password: 'Can not change password here',
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phonenumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      avatar: user.avatar,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let language = this.props.language;

    let { email, password, firstName, lastName, phoneNumber, address, gender, position, role } = this.state;

    return (
      <>
        <div className="user-redux container">
          <div className="title">USER REDUX</div>
          <div className="user-redux-body">
            <div className="container">
              <div className="row">
                <div className="col-12 my-3">
                  <FormattedMessage id="manage-user.add" />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => this.onChangeInput(e, 'email')}
                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => this.onChangeInput(e, 'password')}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={firstName}
                    onChange={(e) => this.onChangeInput(e, 'firstName')}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={lastName}
                    onChange={(e) => this.onChangeInput(e, 'lastName')}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.phone" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(e) => this.onChangeInput(e, 'phoneNumber')}
                  />
                </div>
                <div className="col-9">
                  <label>
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(e) => this.onChangeInput(e, 'address')}
                  />
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      this.onChangeInput(e, 'gender');
                    }}
                    value={gender}
                  >
                    {genders.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {language === LANGUAGES.DE ? item.valueDe : item.valueEn}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      this.onChangeInput(e, 'position');
                    }}
                    value={position}
                  >
                    {positions.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {language === LANGUAGES.DE ? item.valueDe : item.valueEn}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select
                    className="form-control"
                    onChange={(e) => {
                      this.onChangeInput(e, 'role');
                    }}
                    value={role}
                  >
                    {roles.map((item, index) => {
                      return (
                        <option key={index} value={item.key}>
                          {language === LANGUAGES.DE ? item.valueDe : item.valueEn}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-3">
                  <label>
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <div className="preview-img-container">
                    <div>
                      <input id="previewImg" type="file" hidden onChange={(e) => this.hanleOnChangeImg(e)} />
                      <label htmlFor="previewImg" className=" upload">
                        <i className="fas fa-upload"></i> Upload
                      </label>
                    </div>
                    <div
                      className="preview-img"
                      style={{ backgroundImage: `url(${this.state.previewImage})` }}
                      onClick={() => this.setState({ isOpen: true })}
                    ></div>
                  </div>
                </div>
                <div className="col-12 my-3">
                  <button
                    className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'}
                    onClick={() => this.handleSaveUser()}
                  >
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <FormattedMessage id="manage-user.edit" />
                    ) : (
                      <FormattedMessage id="manage-user.save" />
                    )}
                  </button>
                </div>
                <div className="col-12 mb-5">
                  <TableManageUser
                    handleEditUserFormParent={this.handleEditUserFormParent}
                    action={this.state.action}
                  />
                </div>
              </div>
            </div>
          </div>

          {this.state.isOpen === true && (
            <Lightbox mainSrc={this.state.previewImage} onCloseRequest={() => this.setState({ isOpen: false })} />
          )}
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    listusers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
    fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
    fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchAllUser: () => dispatch(actions.fetchAllUserStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
