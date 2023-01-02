import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from 'react-slick';
import { getAllSpecialties } from '../../../services/userService';
import { withRouter } from 'react-router';

//import './Specialty.scss';

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }

  async componentDidMount() {
    let res = await getAllSpecialties();

    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data ? res.data : [],
      });
    }
  }

  handleViewDetailSpecialty = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-specialty/${item.id}`);
    }
  };

  render() {
    let { dataSpecialty } = this.state;
    return (
      <>
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <div className="section-title">
                <FormattedMessage id="homepage.specialty-popular" />
              </div>
              <button className="section-btn">
                <FormattedMessage id="homepage.more-info" />
              </button>
            </div>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <>
                      <div
                        className="section-customize"
                        key={index}
                        onClick={() => this.handleViewDetailSpecialty(item)}
                      >
                        <div className="bg-img">
                          <img src={item.image} alt="img" />
                        </div>
                      </div>
                      <span>{item.name}</span>
                    </>
                  );
                })}
            </Slider>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
