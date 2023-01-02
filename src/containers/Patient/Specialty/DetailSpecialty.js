import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../Homepage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import DetailDoctor from '../Doctor/DetailDoctor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { getAllDetailSpecialtyById, getAllCodeService } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import _ from 'lodash';

import './DetailSpecialty.scss';

class DetailSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailSpecialty: {},
      listProvince: [],
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      let res = await getAllDetailSpecialtyById({
        id: id,
        location: 'ALL',
      });

      let resProvince = await getAllCodeService('PROVINCE');

      if (res && res.errCode === 0 && resProvince && resProvince.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        let dataProvince = resProvince.data;
        if (dataProvince && dataProvince.length > 0) {
          dataProvince.unshift({
            createdAt: null,
            keyMap: 'ALL',
            type: 'PROVINCE',
            valueDe: 'Alle',
            valueEn: 'All',
          });
        }

        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
          listProvince: dataProvince ? dataProvince : [],
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  handleOnChangeSelect = async (e) => {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      let location = e.target.value;

      let res = await getAllDetailSpecialtyById({
        id: id,
        location: location,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorSpecialty;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          dataDetailSpecialty: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  };

  render() {
    let { arrDoctorId, dataDetailSpecialty, listProvince } = this.state;
    let { language } = this.props;
    console.log('check state', this.state);
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="description-specialty-body">
          <h2> {dataDetailSpecialty.name}</h2>
          <div className="search-sp-doctor">
            <select onChange={(e) => this.handleOnChangeSelect(e)}>
              {listProvince &&
                listProvince.length > 0 &&
                listProvince.map((item, index) => {
                  return (
                    <option key={index} value={item.keyMap}>
                      {language === LANGUAGES.DE ? item.valueDe : item.valueEn}
                    </option>
                  );
                })}
            </select>
          </div>
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="each-doctor-left">
                    <div className="profile-doctor">
                      <ProfileDoctor doctorId={item} isShowLinkDetail={true} isShowDescriptionDoctor={true} />
                    </div>
                    <div className="doctor-extra-info">
                      <DoctorExtraInfo doctorIdFromParent={item} />
                    </div>
                  </div>
                  <div className="each-doctor-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule doctorIdFromParent={item} />
                    </div>
                  </div>
                </div>
              );
            })}
          <div className="description-specialty">
            {dataDetailSpecialty && !_.isEmpty(dataDetailSpecialty) && (
              <>
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailSpecialty.descriptionHTML,
                  }}
                />
              </>
            )}
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
