import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { LANGUAGES, CommonUtils } from '../../../utils';

import './RemedyModal.scss';

class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      imgBase64: '',
    };
  }

  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }

  handleOnchangeEmail = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handleOnChangeImg = async (e) => {
    let file = e.target.files[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };

  render() {
    let { isOpenModal, closeRemedyModal, dataModal, sendRemedy } = this.props;

    return (
      <>
        <Modal isOpen={isOpenModal} className="booking-modal-container" centered size="md">
          <div className="modal-header">
            <h5 className="modal-title">Gui ket qua kham benh</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={closeRemedyModal}>
              <span aria-hidden="true">x</span>
            </button>
          </div>
          <ModalBody>
            <div className="row">
              <div className="col-6 form-group">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  value={this.state.email}
                  onChange={(e) => this.handleOnchangeEmail(e)}
                />
              </div>
              <div className="col-6 form-group">
                <label>Chon file</label>
                <input type="file" className="form-control-file" onChange={(e) => this.handleOnChangeImg(e)} />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.handleSendRemedy()}>
              Send
            </Button>
            <Button color="secondary" onClick={closeRemedyModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
