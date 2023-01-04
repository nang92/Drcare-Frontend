import _ from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Select from 'react-select';
import { toast } from 'react-toastify';
import { Modal } from 'reactstrap';
import DatePicker from '../../../../components/Input/DatePicker';
import { postPatientBookAppointment } from '../../../../services/userService';
import * as actions from '../../../../store/actions';
import { LANGUAGES } from '../../../../utils/constant';
import ProfileDoctor from '../ProfileDoctor';
import moment from 'moment';

import './BookingModal.scss';

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      phoneNumber: '',
      email: '',
      address: '',
      reason: '',
      birthday: '',
      selectedGender: '',
      doctorId: '',
      genders: '',
      timeType: '',
    };
  }

  async componentDidMount() {
    this.props.getGenders();
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.DE ? item.valueDe : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }

    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  handleOnChangeInput = (e, id) => {
    let valueInput = e.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };

  handelOnchangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handelChangeSelect = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };

  buildTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time = language === LANGUAGES.DE ? dataTime.timeTypeData.valueDe : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.DE
          ? moment.unix(+dataTime.date / 1000).format('dddd, DD MMMM YYYY')
          : moment.unix(+dataTime.date / 1000).format('dddd, MMMM DD YYYY');
      return `  ${time} - ${date}`;
    }
    return '';
  };

  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.DE
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`;
      return name;
    }
    return '';
  };

  handleComfirmBooking = async () => {
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildTimeBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);

    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataTime.date,
      birthday: date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });

    if (res && res.errCode === 0) {
      toast.success('Appointment booked successfully');
      this.props.closeBookingModal();
    } else {
      toast.error('Appointment booked failed');
    }
  };

  render() {
    let { isOpenModal, closeBookingModal, dataTime } = this.props;
    let doctorId = '';
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }

    return (
      <>
        <Modal isOpen={isOpenModal} className="booking-modal-container" centered size="lg">
          <div className="booking-modal-content">
            <div className="booking-modal-header">
              <span className="left">
                <FormattedMessage id="patient.booking-modal.title" />
              </span>
              <span className="right" onClick={closeBookingModal}>
                <i className="fa fa-times"></i>
              </span>
            </div>
            <div className="booking-modal-body">
              <div className="doctor info">
                <ProfileDoctor doctorId={doctorId} dataTime={dataTime} />
              </div>

              <div className="row">
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.fullName" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.fullName}
                    onChange={(e) => this.handleOnChangeInput(e, 'fullName')}
                  />
                </div>
                <div className="col-6 form-group">
                  <label>
                    <FormattedMessage id="patient.booking-modal.phoneNumber" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.phoneNumber}
                    onChange={(e) => this.handleOnChangeInput(e, 'phoneNumber')}
                  />
                </div>
                <div className="col-6 form-group">
                  <labe>
                    <FormattedMessage id="patient.booking-modal.email" />
                  </labe>
                  <input
                    type="email"
                    className="form-control"
                    value={this.state.email}
                    onChange={(e) => this.handleOnChangeInput(e, 'email')}
                  />
                </div>
                <div className="col-6 form-group">
                  <lable>
                    <FormattedMessage id="patient.booking-modal.address" />
                  </lable>
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.address}
                    onChange={(e) => this.handleOnChangeInput(e, 'address')}
                  />
                </div>
                <div className="col-6 form-group">
                  <lable>
                    <FormattedMessage id="patient.booking-modal.birthday" />
                  </lable>
                  <DatePicker
                    onChange={this.handelOnchangeDatePicker}
                    className="form-control"
                    value={this.state.birthday}
                  />
                </div>
                <div className="col-6 form-group">
                  <lable>
                    <FormattedMessage id="patient.booking-modal.gender" />
                  </lable>
                  <Select
                    value={this.state.selectedGender}
                    onChange={this.handelChangeSelect}
                    options={this.state.genders}
                  />
                </div>
                <div className="col-12 form-group">
                  <lable>
                    <FormattedMessage id="patient.booking-modal.reason" />
                  </lable>
                  <textarea
                    className="form-control"
                    value={this.state.reason}
                    onChange={(e) => this.handleOnChangeInput(e, 'reason')}
                  />
                </div>
              </div>
            </div>
            <div className="booking-modal-footer">
              <button className="btn-primary btn-booking-confirm" onClick={() => this.handleComfirmBooking()}>
                <FormattedMessage id="patient.booking-modal.confirm" />
              </button>
              <button className="btn-warning btn-booking-cancel" onClick={closeBookingModal}>
                <FormattedMessage id="patient.booking-modal.cancel" />
              </button>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
