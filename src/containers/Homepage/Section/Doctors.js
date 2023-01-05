import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import * as actions from '../../../store/actions/index.js';
import { LANGUAGES } from '../../../utils/';
import { withRouter, Redirect, useHistory } from 'react-router';
import './Doctors.scss';

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
    let settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };

    return (
      <>
        <div className="section-doctors">
          <div className="section-header">
            <span className="section-title">
              <FormattedMessage id="homepage.outstanding-doctor" />
            </span>
            <button className="section-btn">
              <FormattedMessage id="homepage.more-info" />
            </button>
          </div>
          <div className="section-body ">
            <Slider {...settings}>
              {arrDoctors.map((item, index) => {
                let imageBase64 = '';
                if (item.image) {
                  imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                }
                let nameDe = `${item.firstName} ${item.lastName}`;
                let nameEn = `${item.firstName} ${item.lastName}`;
                let positionDe = item.positionData.valueDe;
                let positionEn = item.positionData.valueEn;
                return (
                  <div className="section-doctor">
                    <div
                      className="section-customize-doctor"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div className="bg-img ">
                        <img className="img-doctor my-3" src={imageBase64} alt="doctor" />
                      </div>
                      <h4 className="doctor-name">{language === LANGUAGES.DE ? nameDe : nameEn}</h4>
                      <p>{language === LANGUAGES.DE ? positionDe : positionEn}</p>
                    </div>
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
