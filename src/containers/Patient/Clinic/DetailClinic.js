import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getDetailClinicById } from '../../../services/userService';
import HomeHeader from '../../Homepage/HomeHeader';
import HomeFooter from '../../Homepage/HomeFooter';
import DoctorExtraInfo from '../Doctor/DoctorExtraInfo';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import _ from 'lodash';

import './DetailClinic.scss';

const DetailClinic = (props) => {
  const [arrDoctorId, setArrDoctorId] = useState([]);
  const [dataDetailClinic, setDataDetailClinic] = useState({});

  useEffect(() => {
    if (props.match && props.match.params && props.match.params.id) {
      let id = props.match.params.id;
      getDetailClinicById({
        id: id,
      }).then((res) => {
        if (res && res.errCode === 0) {
          let data = res.data;
          let arrDoctorId = [];
          if (data && !_.isEmpty(res.data)) {
            let arr = data.doctorClinic;
            if (arr && arr.length > 0) {
              arr.map((item) => {
                arrDoctorId.push(item.doctorId);
              });
            }
          }

          setDataDetailClinic(res.data);
          setArrDoctorId(arrDoctorId);
        }
      });
    }
  }, []);

  const handleBookingClick = () => {
    let element = document.querySelector('.each-doctor');
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="detail-clinic-container">
      <HomeHeader />
      <div className="description-clinic-body">
        <img className="clinic-img" src={dataDetailClinic.image} alt="img" />
        <div className="clinic-content">
          <div className="clinic-info">
            <h2> {dataDetailClinic.name}</h2>
            <div className="address-clinic">
              <i className="fas fa-map-marker-alt"></i>
              <span>{dataDetailClinic.address}</span>
            </div>
          </div>
          <div className="btn-clinic-booking">
            <button onClick={handleBookingClick}>
              <FormattedMessage id="patient.detail-clinic.btn-booking" />
            </button>
          </div>
        </div>
        <div className="description-clinic">
          {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
            <>
              <div
                dangerouslySetInnerHTML={{
                  __html: dataDetailClinic.descriptionHTML,
                }}
              />
            </>
          )}
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
      </div>
      <HomeFooter />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
