import React, { Component } from 'react';
import { connect } from 'react-redux';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewSpecialty } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { CommonUtils } from '../../../utils';

import './ManageSpecialty.scss';

// Markdown-Editor
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      imageBase64: '',
      descriptionHTML: '',
      descriptionMarkdown: '',
    };
  }

  async componentDidMount() {}

  async componentDidUpdate(prevProps, prevState) {}

  handleOnchangeInput = (e, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = e.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImg = async (e) => {
    let data = e.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imageBase64: base64,
      });
    }
  };

  handleSaveSpecialty = async () => {
    let res = await createNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success('Add new specialty successfully!');
      this.setState({
        name: '',
        imageBase64: '',
        descriptionHTML: '',
        descriptionMarkdown: '',
      });
    } else {
      toast.error('Something went wrong. Please try again!');
      console.log('Specialty.js - handleSaveSpecialty - res', res);
    }
  };

  render() {
    return (
      <>
        <div className="manage-specialty-container">
          <div className="ms-title">
            <FormattedMessage id="menu.specialty.title" />
          </div>

          <div className="add-new-specialty row">
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="menu.specialty.name" />
              </label>
              <input
                type="text"
                className="form-control"
                value={this.state.name}
                onChange={(e) => this.handleOnchangeInput(e, 'name')}
              />
            </div>
            <div className="col-6 form-group">
              <label>
                <FormattedMessage id="menu.specialty.pictrue" />
              </label>
              <input type="file" className="form-control-file" onChange={(e) => this.handleOnChangeImg(e)} />
            </div>
            <div className="col-12">
              <MdEditor
                style={{ height: '300px' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
            </div>
          </div>
          <div className="col-12">
            <button className="btn-save-specialty btn-primary mt-3" onClick={() => this.handleSaveSpecialty()}>
              <FormattedMessage id="menu.specialty.save" />
            </button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
