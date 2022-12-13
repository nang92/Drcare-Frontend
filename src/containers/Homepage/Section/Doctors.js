import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions/index.js';
import { LANGUAGES } from '../../../utils/';
import { withRouter, Redirect, useHistory } from 'react-router';
//import './Doctors.scss';

class Doctors extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }

  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };

  render() {
    let arrDoctors = this.state.arrDoctors;
    let { language } = this.props;

    return (
      <>
        <div className="section-share section-doctors">
          <div className="section-container">
            <div className="section-header">
              <span className="section-title">
                <FormattedMessage id="homepage.outstanding-doctor" />
              </span>
              <button className="section-btn">
                <FormattedMessage id="homepage.more-info" />
              </button>
            </div>
          </div>
          <div className="section-body ">
            <Slider {...this.props.settings}>
              {arrDoctors.map((item, index) => {
                let imageBase64 = '';
                if (item.image) {
                  imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                }
                let nameDe = `${item.positionData.valueDe}, ${item.firstName} ${item.lastName}`;
                let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                return (
                  <div className="section-customize" key={index} onClick={() => this.handleViewDetailDoctor(item)}>
                    <div className="bg-img ">
                      <img className="img-doctor my-3" src={imageBase64} alt="doctor" />
                    </div>
                    <h4>{language === LANGUAGES.DE ? nameDe : nameEn}</h4>
                    <span>Chuyên khoa</span>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Doctors));
