import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllClinic } from '../../../services/userService';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import './MedicalFacility.scss';

class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinics: [],
    };
  }

  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({
        dataClinics: res.data ? res.data : [],
      });
    }
  }
  handleViewDetailClinic = (item) => {
    if (this.props.history) {
      this.props.history.push(`/detail-clinic/${item.id}`);
    }
  };

  render() {
    let { dataClinics } = this.state;
    return (
      <>
        <div className="section-share section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <div className="section-title">Cơ sở y tế nổi bật</div>
              <button className="section-btn">Xem thêm</button>
            </div>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataClinics &&
                dataClinics.length > 0 &&
                dataClinics.map((item, index) => {
                  return (
                    <div className="section-customize" key={index} onClick={() => this.handleViewDetailClinic(item)}>
                      <div className="bg-img">
                        <img src={item.image} alt="img" />
                      </div>
                      <span className="clinic-name">{item.name}</span>
                    </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
