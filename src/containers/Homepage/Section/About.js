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
                  <h3>Ihre Gesundheit. Ihre Daten.</h3>
                  <p>
                    Der Schutz Ihrer Privatsphäre steht für uns im Vordergrund und ist eine unserer wichtigsten
                    Aufgaben.
                  </p>
                  <button>mehr informationen</button>
                </div>
                <div className="content-security-right">
                  <img src={SecurityImg} alt="Security-img" />
                </div>
              </div>
              <div className="content-for-doctor">
                <div className="content-for-doctor-left">
                  <h3>Sind Sie Ärzt:in oder Therapeut:in?</h3>
                  <span>Einfaches Terminmanagement für die erfolgreiche Praxis.</span>
                  <ul>
                    <li>
                      <i class="far fa-clock"></i>
                      Entlasten Sie Ihr Praxisteam und bieten Sie Ihren Patient:innen einen zeitgemäßen, digitalen
                      Service
                    </li>
                    <li>
                      <i class="far fa-eye"></i>
                      Erhöhen Sie die Sichtbarkeit Ihrer Einrichtung im Internet und steigern Sie den Umsatz Ihrer
                      Praxis
                    </li>
                    <li>
                      <i class="fas fa-hands"></i>
                      Impfmanagement: Direkte Entlastung durch digitales Covid-Impfmanagement. Einrichtung in nur 2
                      Stunden
                    </li>
                    <li>
                      <i class="fas fa-home"></i>
                      Schaffen Sie effiziente Praxisabläufe und reduzieren Sie Terminausfälle dank digitalem
                      Praxiskalender
                    </li>
                  </ul>
                  <button>mehr erfahren</button>
                </div>
                <div className="content-for-doctor-right">
                  <img src={DrCareForDoctor} alt="DrCareForDoctor-img" />
                </div>
              </div>
              <div className="content-help">
                <div className="content-help-left">
                  <h3>Sie haben eine Frage oder brauchen Hilfe?</h3>
                  <p>Erhalten Sie Antworten auf häufig gestellte Fragen in unserem Hilfebereich</p>
                </div>
                <div className="content-help-right">
                  <button>HILFEBEREICH AUFRUFEN</button>
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
