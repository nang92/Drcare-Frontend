import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPatientForDoctor, postSendRemedy } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import DatePicker from '../../../components/Input/DatePicker';
import { LANGUAGES } from '../../../utils';
import RemedyModal from './RemedyModal';
import { toast } from 'react-toastify';
import LoadingOverlay from 'react-loading-overlay';
import './ManagePatient.scss';

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf('day').valueOf(),
      dataPatient: [],
      isOpenRemedyModal: false,
      dataModal: {},
      isShowLoading: false,
    };
  }
  async componentDidMount() {
    this.getDataPatient();
  }

  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();

    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatedDate,
    });

    this.setState({
      dataPatient: res.data,
    });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnchangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };

  handleBtnConfirm = (item) => {
    let data = {
      patientId: item.patientData,
      doctorId: item.doctorId,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };

  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: {},
    });
  };

  sendRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      patientId: dataModal.patientId,
      doctorId: dataModal.doctorId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataModal.patientName,
    });
    if (res.errCode === 0) {
      toast.success('Send Email Success');
      this.setState({
        isOpenRemedyModal: false,
        isShowLoading: false,
      });
      await this.getDataPatient();
    } else {
      toast.error('Send Email Failed');
      this.setState({
        isShowLoading: false,
      });
    }
  };

  render() {
    let { dataPatient, isOpenRemedyModal, dataModal } = this.state;
    let { language } = this.props;
    return (
      <>
        <LoadingOverlay active={this.state.isShowLoading} spinner text="Loading...">
          <div className="manage-patient-container">
            <div className="manage-patient-title">
              <FormattedMessage id="manage-patient.title" />
            </div>
            <div className="manage-patient-body row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-patient.select-date" />
                </label>
                <DatePicker
                  onChange={this.handleOnchangeDatePicker}
                  className="form-control"
                  value={this.state.currentDate}
                />
              </div>
              <div className="col-12  table-manage-patient">
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <th>
                        <FormattedMessage id="manage-patient.number" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-patient.time" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-patient.patient-name" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-patient.address" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-patient.gender" />
                      </th>
                      <th>
                        <FormattedMessage id="manage-patient.action" />
                      </th>
                    </tr>
                    {dataPatient && dataPatient.length > 0 ? (
                      dataPatient.map((item, index) => {
                        let time =
                          language === LANGUAGES.DE
                            ? item.timeTypeDataPatient.valueDe
                            : item.timeTypeDataPatient.valueEn;
                        let gender =
                          language === LANGUAGES.DE
                            ? item.patientData.genderData.valueDe
                            : item.patientData.genderData.valueEn;
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{time}</td>
                            <td>{item.patientData.firstName}</td>
                            <td>{item.patientData.address}</td>
                            <td>{gender}</td>
                            <td>
                              <button className="mp-btn-confirm" onClick={() => this.handleBtnConfirm(item)}>
                                <FormattedMessage id="manage-patient.confirm" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    ) : (
                      <tr>
                        <td colSpan={5} style={{ textAlign: 'center' }}>
                          No Data
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <RemedyModal
            isOpenModal={isOpenRemedyModal}
            dataModal={dataModal}
            closeRemedyModal={this.closeRemedyModal}
            sendRemedy={this.sendRemedy}
          />
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
