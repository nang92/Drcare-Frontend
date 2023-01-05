import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import './Banner.scss';

class Banner extends Component {
  render() {
    let language = this.props.language;

    return (
      <>
        <div className="home-header-banner">
          <div className="content-up">
            <div className="main-text">
              <FormattedMessage id="homeheader.banner-title" />
              <div className="flip">
                <div>
                  <div>einer Zahnärztin</div>
                </div>
                <div>
                  <div>einer Orthopädin</div>
                </div>
                <div>
                  <div>einer Frauenärztin</div>
                </div>
                <div>
                  <div>einem Radiologen</div>
                </div>
                <div>
                  <div>einem Hautarzt</div>
                </div>
                <div>
                  <div>einem HNO-Arzt</div>
                </div>
                <div>
                  <div>einer Frauenärztin</div>
                </div>
                <div>
                  <div>einem Kinderarzt</div>
                </div>
                <div>
                  <div>einem Heilpraktiker</div>
                </div>
                <div>
                  <div>einer Internistin</div>
                </div>
                <div>
                  <div>einer Hausärztin</div>
                </div>
              </div>
            </div>
            <div className="search">
              <i className="fas fa-search"></i>
              <input type="text" placeholder="Search for a clinic ..." />
            </div>
          </div>
          <div className="content-down">
            <div className="options">
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="homeheader.home-doctor" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="homeheader.dentist" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="homeheader.orthopedists" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="homeheader.gynecologists" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child">
                  <i className="fas fa-hospital"></i>
                </div>
                <div className="text-child">
                  <FormattedMessage id="homeheader.radiologists" />
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
