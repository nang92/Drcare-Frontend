import { divide } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils/constant';
import { changeLanguageApp } from '../../store/actions';
import './HomeHeader.scss';
import logo from '../../assets/images/logo.svg';

class HomeHeader extends Component {
  changeLanguages = (language) => {
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    let language = this.props.language;

    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="home-header-content-left">
              <i className="fas fa-bars"></i>
              <img src={logo} alt="logo" />
              <div className="header-logo"></div>
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
                <span onClick={() => this.changeLanguages(LANGUAGES.DE)}>DE</span>
              </div>
              <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                <span onClick={() => this.changeLanguages(LANGUAGES.EN)}>EN</span>
              </div>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div className="content-up">
            <div className="banner-title">
              <FormattedMessage id="homeheader.banner-title" />
            </div>
            <div className="banner-sub-title">
              <FormattedMessage id="homeheader.banner-sub-title" />
            </div>
            <div className="search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Search for a clinic ..." />
            </div>
          </div>
          <div className="content-down">
            <div className="options">
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">Find a doctor</div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">Find a doctor</div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">Find a doctor</div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">Find a doctor</div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">Find a doctor</div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">Find a doctor</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
