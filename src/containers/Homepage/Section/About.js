import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import TerminImg from '../../../assets/images/termin-img.svg';
import DoctorImg from '../../../assets/images/doctor-img.svg';
import DocumentImg from '../../../assets/images/dockument-img.svg';
import SecurityImg from '../../../assets/images/security.svg';
import DrCareForDoctor from '../../../assets/images/drcare-for-doctor.svg';

import './About.scss';

class About extends Component {
  render() {
    return (
      <>
        <div className="section-share section-about">
          <div className="section-container">
            <div className="section-about-content">
              <div className="content-title">
                <h2>
                  <FormattedMessage id="about.content-title" />
                </h2>
                <span>
                  <FormattedMessage id="about.content-sub-title" />
                </span>
              </div>
              <div className="content-items">
                <div className="content-item">
                  <img src={TerminImg} alt="termin-img" />
                  <p>
                    <FormattedMessage id="about.content-item1" />
                  </p>
                </div>
                <div className="content-item">
                  <img src={DoctorImg} alt="Doctor-img" />
                  <p>
                    <FormattedMessage id="about.content-item2" />
                  </p>
                </div>
                <div className="content-item">
                  <img src={DocumentImg} alt="Document-img" />
                  <p>
                    <FormattedMessage id="about.content-item3" />
                  </p>
                </div>
              </div>
              <div className="content-security">
                <div className="content-security-left">
                  <h3>
                    <FormattedMessage id="about.content-security-title" />
                  </h3>
                  <p>
                    <FormattedMessage id="about.content-security-sub-title" />
                  </p>
                  <button>
                    <FormattedMessage id="about.content-security-button" />
                  </button>
                </div>
                <div className="content-security-right">
                  <img src={SecurityImg} alt="Security-img" />
                </div>
              </div>
              <div className="content-for-doctor">
                <div className="content-for-doctor-left">
                  <h3>
                    <FormattedMessage id="about.content-for-doctor-title" />
                  </h3>
                  <span>
                    <FormattedMessage id="about.content-for-doctor-sub-title" />
                  </span>
                  <ul>
                    <li>
                      <i class="far fa-clock"></i>
                      <FormattedMessage id="about.content-doctor-list1" />
                    </li>
                    <li>
                      <i class="far fa-eye"></i>
                      <FormattedMessage id="about.content-doctor-list2" />
                    </li>
                    <li>
                      <i class="fas fa-hands"></i>
                      <FormattedMessage id="about.content-doctor-list3" />
                    </li>
                    <li>
                      <i class="fas fa-home"></i>
                      <FormattedMessage id="about.content-doctor-list4" />
                    </li>
                  </ul>
                  <button>
                    <FormattedMessage id="about.content-for-doctor-button" />
                  </button>
                </div>
                <div className="content-for-doctor-right">
                  <img src={DrCareForDoctor} alt="DrCareForDoctor-img" />
                </div>
              </div>
              <div className="content-help">
                <div className="content-help-left">
                  <h3>
                    <FormattedMessage id="about.content-help-title" />
                  </h3>
                  <p>
                    <FormattedMessage id="about.content-help-sub-title" />
                  </p>
                </div>
                <div className="content-help-right">
                  <button>
                    <FormattedMessage id="about.content-help-button" />
                  </button>
                </div>
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
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
