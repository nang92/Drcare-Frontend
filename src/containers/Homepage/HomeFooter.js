import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './HomeFooter.scss';

class HomeFooter extends Component {
  render() {
    return (
      <>
        <div className="home-footer-top">
          <div className="about-drcare">
            <h3>Über DrCare</h3>
            <ul>
              <li>COVID-Test</li>
              <li>Careers</li>
              <li>Presse</li>
              <li>Hilfe</li>
              <li>DrCare App</li>
            </ul>
          </div>
          <div className="find-doctor">
            <h3>Finden Sie Ihren Facharzt</h3>
            <ul>
              <li>Zahnmedizin</li>
              <li>Augenheilkunde</li>
              <li>Psychologie</li>
              <li>Chirurgie</li>
              <li>Orthopädie</li>
            </ul>
          </div>
          <div className="recently-search">
            <h3>Häufige Suchanfragen</h3>
            <ul>
              <li>Zahnarzt Berlin</li>
              <li>Hausart Berlin Mitte</li>
              <li>Augenarzt Berlin</li>
              <li>Psychologe Berlin</li>
              <li>Chirurg Berlin</li>
            </ul>
          </div>
          <div className="recently-search">
            <h3>Für Ärzt:innen und Therapeut:innen</h3>
            <ul>
              <li>DrCare Pro</li>
              <li>DrCare Community</li>
              <li>DrCare Blog</li>
              <li>Anmelden</li>
              <li>Registrieren</li>
            </ul>
          </div>
        </div>
        <div className="home-footer-bottom">
          <p>
            &copy; 2022 Dr Care.This Website is for study purpose only! For more information, please visit:
            <Link target="_blank" href="https://thang.me">
              www.thang.me
            </Link>
          </p>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
