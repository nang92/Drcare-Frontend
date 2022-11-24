import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from 'react-slick';

//import './Doctors.scss';

class Doctors extends Component {
  render() {
    return (
      <>
        <div className="section-share section-doctors">
          <div className="section-container">
            <div className="section-header">
              <div className="section-title">Bác sĩ nổi bật tuần qua</div>
              <button className="section-btn">Xem thêm</button>
            </div>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-img ">
                  <img
                    className="img-doctor"
                    src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
                    alt="img"
                  />
                </div>
                <h3>Họ và Tên Bác Sĩ</h3>
                <span>Chuyên khoa</span>
              </div>
              <div className="section-customize">
                <div className="bg-img">
                  <img
                    className="img-doctor"
                    src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
                    alt="img"
                  />
                </div>
                <h3>Họ và Tên Bác Sĩ</h3>
                <span>Chuyên khoa</span>
              </div>
              <div className="section-customize">
                <div className="bg-img">
                  <img
                    className="img-doctor"
                    src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
                    alt="img"
                  />
                </div>
                <h3>Họ và Tên Bác Sĩ</h3>
                <span>Chuyên khoa</span>
              </div>
              <div className="section-customize ">
                <div className="bg-img">
                  <img
                    className="img-doctor"
                    src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
                    alt="img"
                  />
                </div>
                <h3>Họ và Tên Bác Sĩ</h3>
                <span>Chuyên khoa</span>
              </div>
              <div className="section-customize">
                <div className="bg-img">
                  <img
                    className="img-doctor"
                    src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
                    alt="img"
                  />
                </div>
                <h3>Họ và Tên Bác Sĩ</h3>
                <span>Chuyên khoa</span>
              </div>
              <div className="section-customize">
                <div className="bg-img">
                  <img
                    className="img-doctor"
                    src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg"
                    alt="img"
                  />
                </div>
                <h3>Họ và Tên Bác Sĩ</h3>
                <span>Chuyên khoa</span>
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

export default connect(mapStateToProps, mapDispatchToProps)(Doctors);
