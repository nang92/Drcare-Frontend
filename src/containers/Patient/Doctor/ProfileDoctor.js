import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/de';
import { LANGUAGES } from '../../../utils/constant';
import { getProfileDoctorById } from '../../../services/userService';
import BookingModal from './Modal/BookingModal';
import './ProfileDoctor.scss';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfie: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInfoDoctor(this.props.doctorId);
    this.setState({
      dataProfie: data,
    });
  }

  getInfoDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
    /* if (this.props.doctorId !== prevProps.doctorId) {
        this.getInfoDoctor(this.props.doctorId);
    } */
  }

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    let time = language === LANGUAGES.DE ? dataTime.timeTypeData.valueDe : dataTime.timeTypeData.valueEn;
    if (dataTime && !_.isEmpty(dataTime)) {
      let date =
        language === LANGUAGES.DE
          ? moment
              .unix(+dataTime.date / 1000)
              .locale(language)
              .format('dddd, DD MMMM YYYY')
          : moment
              .unix(+dataTime.date / 1000)
              .locale(language)
              .format('dddd, MMMM DD YYYY');
      return (
        <>
          <div>
            {time} - {date}
          </div>
        </>
      );
    }
  };

  render() {
    let { dataProfie } = this.state;
    let { language, dataTime } = this.props;
    return (
      <>
        <div className="profile-doctor-container">
          <div className="intro-doctor">
            <div className="intro-doctor-left" style={{ backgroundImage: `url(${this.state.dataProfie.image})` }}></div>
            <div className="intro-doctor-right">
              <div className="intro-doctor-right-top">
                <h2>
                  {this.state.dataProfie.firstName} {this.state.dataProfie.lastName}
                </h2>
              </div>
              <div className="intro-doctor-right-bottom">{this.renderTimeBooking(dataTime)}</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
