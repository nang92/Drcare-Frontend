import { push } from 'connected-react-router';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { handleLoginApi } from '../../services/userService';
import * as actions from '../../store/actions';
import './Login.scss';

//  functional component

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState('');

  const handleOnchangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleOnchangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    setErrMessage('');

    try {
      const data = await handleLoginApi(username, password);
      if (data && data.errCode !== 0) {
        setErrMessage(data.message);
      }
      if (data && data.errCode === 0) {
        props.userLoginSuccess(data.user);
        console.log('Login success');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          setErrMessage(error.response.data.message);
        }
      }
    }
  };

  const handleShowHidePassword = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="login-background">
      <div className="login-container">
        <div className="login-content row">
          <div className="col-12 text-center login-text">Login</div>
          <div className="col-12 form-group login-input">
            <label>Username:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              autoFocus
              value={username}
              onChange={(event) => handleOnchangeUsername(event)}
            />
          </div>
          <div className="col-12 form-group login-input">
            <label>Password:</label>
            <div className="input-password">
              <input
                type={isShowPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => handleOnchangePassword(event)}
              />
              <span
                onClick={() => {
                  handleShowHidePassword();
                }}
              >
                <i className={isShowPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}></i>
              </span>
            </div>
          </div>
          <div className="col-12" style={{ color: 'red' }}>
            {errMessage}
          </div>
          <div className="col-12 text-center">
            <button className="btn btn-login " onClick={() => handleLogin()}>
              Login
            </button>
          </div>
          <div className="col-12">
            <a className="forgot-password" href="#">
              Forgot Password?
            </a>
          </div>
          <div className="col-12 text-center mt-3">
            <span className="login-with" href="#">
              Or Login with:
            </span>
            <div className="login-social">
              <a href="#">
                <i className="fab fa-facebook-f facebook" />
              </a>
              <a href="#">
                <i className="fab fa-google google" />
              </a>
            </div>
          </div>
          <div className="col-12"></div>{' '}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    //userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

/* class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isShowPassword: false,
      errMessage: '',
    };
  }

  handleOnchangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnchangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleLogin = async () => {
    this.setState({
      errMessage: '',
    });

    try {
      const data = await handleLoginApi(this.state.username, this.state.password);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
        console.log('Login success');
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-center login-text">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter your username"
                value={this.state.username}
                onChange={(event) => this.handleOnchangeUsername(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password:</label>
              <div className="input-password">
                <input
                  type={this.state.isShowPassword ? 'text' : 'password'}
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnchangePassword(event)}
                />
                <span
                  onClick={() => {
                    this.handleShowHidePassword();
                  }}
                >
                  <i className={this.state.isShowPassword ? 'fa fa-eye' : 'fa fa-eye-slash'}></i>
                </span>
              </div>
            </div>
            <div className="col-12" style={{ color: 'red' }}>
              {this.state.errMessage}
            </div>
            <div className="col-12 text-center">
              <button
                className="btn btn-login "
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Login
              </button>
            </div>
            <div className="col-12">
              <a className="forgot-password" href="#">
                Forgot Password?
              </a>
            </div>
            <div className="col-12 text-center mt-3">
              <span className="login-with" href="#">
                Or Login with:
              </span>
              <div className="login-social">
                <a href="#">
                  <i className="fab fa-facebook-f facebook" />
                </a>
                <a href="#">
                  <i className="fab fa-google google" />
                </a>
              </div>
            </div>
            <div className="col-12"></div>{' '}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    //userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfor) => dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login); */