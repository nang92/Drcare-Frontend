import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from 'react-slick';

//import './Specialty.scss';

class Specialty extends Component {
  render() {
    return (
      <>
        <div className="section-share section-specialty">
          <div className="section-container">
            <div className="section-header">
              <div className="section-title">Bác sĩ nổi bật tuần qua</div>
              <button className="section-btn">Xem thêm</button>
            </div>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-img">
                  <img src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg" alt="img" />
                </div>
                <span>Cơ xương khớp</span>
              </div>
              <div className="section-customize">
                <div className="bg-img">
                  <img src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg" alt="img" />
                </div>
                <span>Cơ xương khớp</span>
              </div>
              <div className="section-customize">
                <div className="bg-img">
                  <img src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg" alt="img" />
                </div>
                <span>Cơ xương khớp</span>
              </div>
              <div className="section-customize">
                <div className="bg-img">
                  <img src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg" alt="img" />
                </div>
                <span>Cơ xương khớp</span>
              </div>
              <div className="section-customize">
                <div className="bg-img">
                  <img src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg" alt="img" />
                </div>
                <span>Cơ xương khớp</span>
              </div>
              <div className="section-customize">
                <div className="bg-img">
                  <img src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg" alt="img" />
                </div>
                <span>Cơ xương khớp</span>
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
