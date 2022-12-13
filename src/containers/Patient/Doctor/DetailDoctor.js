import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../Homepage/HomeHeader';
import HomeFooter from '../../Homepage/HomeFooter';
import { getDetailInfoDoctor } from '../../../services/userService';
import './DetailDoctor.scss';

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }

  async componentDidMount() {
    if (this.props.match && this.props.match.params && this.props.match.params.id) {
      let id = this.props.match.params.id;
      let response = await getDetailInfoDoctor(id);
      if (response && response.errCode === 0) {
        this.setState({
          detailDoctor: response.data,
        });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-body">
          <div className="doctor-detail-container">
            <div className="intro-doctor">
              <div
                className="intro-doctor-left"
                style={{ backgroundImage: `url(${this.state.detailDoctor.image})` }}
              ></div>
              <div className="intro-doctor-right">
                <div className="intro-doctor-right-top">
                  {this.state.detailDoctor.firstName} {this.state.detailDoctor.lastName}
                </div>
                <div className="intro-doctor-right-bottom">
                  {this.state.detailDoctor.Markdown && this.state.detailDoctor.Markdown.description && (
                    <span>{this.state.detailDoctor.Markdown.description}</span>
                  )}
                </div>
              </div>
            </div>
            <div className="schedule-doctor"></div>
            <div className="detail-info-doctor">
              {this.state.detailDoctor.Markdown && this.state.detailDoctor.Markdown.contentHTML && (
                <div dangerouslySetInnerHTML={{ __html: this.state.detailDoctor.Markdown.contentHTML }}></div>
              )}
            </div>
            <div className="comment-doctor"></div>
          </div>
        </div>
        <HomeFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
