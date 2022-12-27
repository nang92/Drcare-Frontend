import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getExtraInfoDoctorById } from '../../../services/userService';
import './DoctorExtraInfo.scss';

class DoctorExtraInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfo: false,
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInfoDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
  }

  showHideDetailInfo = (status) => {
    this.setState({
      isShowDetailInfo: status,
    });
  };

  render() {
    let { extraInfo } = this.state;

    return (
      <>
        <div className="doctor-extra-info-container">
          <div className="content-up">
            <div className="text-address">
              <FormattedMessage id="patient.extra-info-doctor.text-address" />
            </div>
            <div className="name-clinic">{extraInfo && extraInfo.nameClinic ? extraInfo.nameClinic : ''}</div>
            <div className="detail-address">{extraInfo && extraInfo.addressClinic ? extraInfo.addressClinic : ''}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfo);
