import { divide } from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import Doctors from './Section/Doctors';
import Banner from './Section/Banner';

import About from './Section/About';
import HomeFooter from './HomeFooter';

import './HomePage.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

class HomePage extends Component {
  render() {
    return (
      <div className="body-container">
        <HomeHeader />
        <Banner />
        <MedicalFacility />
        <Doctors />
        <Specialty />
        <About />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
