import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import moment from 'moment';
import localization from 'moment/locale/de';
import { LANGUAGES } from '../../../utils/constant';
import { getScheduleDoctorbyDate } from '../../../services/userService';
import BookingModal from './Modal/BookingModal';
import './DoctorSchedule.scss';
import { FormattedMessage } from 'react-intl';

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }

  getArrDays = () => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (this.props.language === LANGUAGES.EN) {
        if (i === 0) {
          let MMdd = moment(new Date()).locale('en').format('MM/DD');
          let today = `Today - ${MMdd}`;
          object.label = today;
        } else {
          object.label = moment(new Date()).add(i, 'days').locale('en').format('dddd - MM/DD');
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).locale('de').format('DD/MM');
          let today = `Heute - ${ddMM}`;
          object.label = today;
        } else {
          object.label = moment(new Date()).add(i, 'days').locale('de').format('dddd - DD/MM');
        }
      }
      object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();

      allDays.push(object);
    }

    return allDays;
  };

  async componentDidMount() {
    let { language } = this.props;
    let allDays = this.getArrDays(language);
    if (allDays && allDays.length > 0) {
      this.setState({
        allDays: allDays,
      });
    }
  }

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
      let allDays = this.getArrDays(this.props.language);
      this.setState({
        allDays: allDays,
      });
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getArrDays(this.props.language);
      let res = await getScheduleDoctorbyDate(this.props.doctorIdFromParent, allDays[0].value);
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }

  handleOnChangeSelect = async (e) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = e.target.value;
      let response = await getScheduleDoctorbyDate(doctorId, date);
      if (response && response.errCode === 0) {
        this.setState({
          allAvailableTime: response.data ? response.data : [],
        });
      }
    }
  };

  handelClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
  };

  closeBookingModal = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };

  render() {
    let { allDays, allAvailableTime, dataScheduleTimeModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(e) => this.handleOnChangeSelect(e)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="time-content">
              <i className="fas fa-calendar-alt">
                <span>
                  <FormattedMessage id="patient.detail-doctor.schedule" />
                </span>
              </i>
            </div>
            <div className="time-item">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                allAvailableTime.map((item, index) => {
                  let timeDisplay = language === LANGUAGES.DE ? item.timeTypeData.valueDe : item.timeTypeData.valueEn;
                  return (
                    <button
                      key={index}
                      className={language === LANGUAGES.DE ? 'btn-time-de' : 'btn-time-en'}
                      onClick={() => this.handelClickScheduleTime(item)}
                    >
                      {timeDisplay}
                    </button>
                  );
                })
              ) : (
                <span className="no-schedule">
                  <FormattedMessage id="patient.detail-doctor.no-schedule" />
                </span>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={this.state.isOpenModalBooking}
          closeBookingModal={this.closeBookingModal}
          dataTime={dataScheduleTimeModal}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
