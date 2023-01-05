/* import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { changeLanguageApp } from '../../store/actions';
import { LANGUAGES } from '../../utils/constant';
import { withRouter } from 'react-router-dom';

import './HomeHeader.scss';

class HomeHeader extends Component {
  changeLanguages = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push('/home');
    }
  };

  render() {
    let language = this.props.language;

    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="home-header-content-left">
              <div className="header-logo" onClick={() => this.returnToHome()}></div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
 */

// Convert to functional component

import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { changeLanguageApp } from '../../store/actions';
import { LANGUAGES } from '../../utils/constant';
import { withRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

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
    /*  <>
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
    </> */
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">More deets</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Dank memes
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
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
