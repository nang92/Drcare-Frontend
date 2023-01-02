import _ from 'lodash';
import moment from 'moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils/constant';
import './ProfileDoctor.scss';

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
    let { language, dataTime, isShowLinkDetail, doctorId, isShowDescriptionDoctor } = this.props;
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
            <div className="intro-doctor-left">
              <div className="intro-doctor-left-avatar">
                <img src={this.state.dataProfile.image} />
                {isShowLinkDetail === true && (
                  <div className="more-info">
                    <Link to={`/detail-doctor/${doctorId}`}>
                      <FormattedMessage id="patient.detail-doctor.moreInfo" />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            <div className="intro-doctor-right">
              <div className="intro-doctor-right-top">
                <h2>{language === LANGUAGES.DE ? nameDe : nameEn}</h2>
              </div>
              <div className="intro-doctor-right-bottom">
                {isShowDescriptionDoctor === true ? (
                  <>
                    {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && (
                      <span>{dataProfile.Markdown.description}</span>
                    )}
                  </>
                ) : (
                  <> {this.renderTimeBooking(dataTime)}</>
                )}
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
