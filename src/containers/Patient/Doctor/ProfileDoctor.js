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
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInfoDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
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
    if (dataTime && !_.isEmpty(dataTime)) {
      let time = language === LANGUAGES.DE ? dataTime.timeTypeData.valueDe : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.DE
          ? moment.unix(+dataTime.date / 1000).format('dddd, DD MMMM YYYY')
          : moment.unix(+dataTime.date / 1000).format('dddd, MMMM DD YYYY');
      return (
        <>
          <div>
            {time} - {date}
          </div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let { dataProfile } = this.state;
    let { language, dataTime } = this.props;
    let nameDe = '';
    let nameEn = '';
    if (dataProfile && dataProfile.positionData) {
      nameDe = `${dataProfile.positionData.valueDe}, ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueDe}, ${dataProfile.lastName} ${dataProfile.firstName}`;
    }
    return (
      <>
        <div className="profile-doctor-container">
          <div className="intro-doctor">
            <div
              className="intro-doctor-left"
              style={{ backgroundImage: `url(${this.state.dataProfile.image})` }}
            ></div>
            <div className="intro-doctor-right">
              <div className="intro-doctor-right-top">
                <h2>{language === LANGUAGES.DE ? nameDe : nameEn}</h2>
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
