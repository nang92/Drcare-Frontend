import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions';
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import { LANGUAGES, USER_ROLE } from '../../utils/constant';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import './Header.scss';

const Header = (props) => {
  const { processLogout, language, userInfo } = props;
  const [menuApp, setMenuApp] = useState([]);

  useEffect(() => {
    let menu = [];
    if (userInfo && !_.isEmpty(userInfo)) {
      let role = userInfo.roleId;
      if (role === USER_ROLE.ADMIN) {
        menu = adminMenu;
      }
      if (role === USER_ROLE.DOCTOR) {
        menu = doctorMenu;
      }
    }
    setMenuApp(menu);
  }, [userInfo]);

  const handleChangeLanguage = (language) => {
    props.changeLanguageAppRedux(language);
  };

  return (
    <div className="header-container">
      <div className="header-tabs-container">
        <Navigator menus={menuApp} />
      </div>
      <div className="languages">
        <span className="welcome">
          <FormattedMessage id="homeheader.welcome" />, {userInfo && userInfo.firstName ? userInfo.firstName : ''}!
        </span>

        <div
          className={language === LANGUAGES.EN ? 'active language-en' : 'language-en'}
          onClick={() => handleChangeLanguage(LANGUAGES.EN)}
        >
          EN
        </div>
        <div
          className={language === LANGUAGES.DE ? 'active language-de' : 'language-de'}
          onClick={() => handleChangeLanguage(LANGUAGES.DE)}
        >
          DE
        </div>
        <div className="btn btn-logout" onClick={processLogout} title="Logout">
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    changeLanguageAppRedux: (language) => dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
