import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeLanguageApp } from '../../store/actions';
import { LANGUAGES } from '../../utils/constant';

import './HomeHeader.scss';

const HomeHeader = (props) => {
  const changeLanguages = (language) => {
    props.changeLanguageAppRedux(language);
  };

  const returnToHome = () => {
    if (props.history) {
      props.history.push('/home');
    }
  };

  let language = props.language;

  return (
    <>
      <div className="home-header-container">
        <div className="home-header-content">
          <div className="home-header-content-left">
            <div className="header-logo" onClick={() => returnToHome()}></div>
          </div>
          <div className="home-header-content-center">
            <div className="child-content">
              <div>
                <b>
                  <FormattedMessage id="homeheader.specialty" />
                </b>
              </div>
              <div className="sub-title">
                <FormattedMessage id="homeheader.searchs-pecialty" />
              </div>
            </div>
            <div className="child-content">
              <div>
                <b>
                  <FormattedMessage id="homeheader.health-facilities" />
                </b>
              </div>
              <div className="sub-title">
                <FormattedMessage id="homeheader.select-clinic" />
              </div>
            </div>
            <div className="child-content">
              <div>
                <b>
                  <FormattedMessage id="homeheader.doctor" />
                </b>
              </div>
              <div className="sub-title">
                <FormattedMessage id="homeheader.select-doctor" />
              </div>
            </div>
            <div className="child-content">
              <div>
                <b>
                  <FormattedMessage id="homeheader.pharmacy" />
                </b>
              </div>
              <div className="sub-title">
                <FormattedMessage id="homeheader.search-pharmacy" />
              </div>
            </div>
          </div>
          <div className="home-header-content-right">
            <div className="support">
              <i className="fas fa-question-circle"></i> <FormattedMessage id="homeheader.support" />
            </div>
            <div className={language === LANGUAGES.DE ? 'language-de active' : 'language-de'}>
              <span onClick={() => changeLanguages(LANGUAGES.DE)}>DE</span>
            </div>
            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
              <span onClick={() => changeLanguages(LANGUAGES.EN)}>EN</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
