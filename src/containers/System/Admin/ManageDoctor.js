import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';
import { FormattedMessage } from 'react-intl';
import './ManageDoctor.scss';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Select from 'react-select';
import { getDetailInfoDoctor } from '../../../services/userService';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils/constant';

// Markdown-Editor
const mdParser = new MarkdownIt(/* Markdown-it options */);
// React-select

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contentMarkdown: '',
      contentHTML: '',
      selectedOption: '',
      description: '',
      listDoctors: [],
      hasOldData: false,

      listProvince: [],

      selectedProvince: '',
      nameClinic: '',
      addressClinic: '',
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getAllRequiredDoctorInfo();
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      if (type === 'USERS') {
        inputData.map((item) => {
          let object = {};
          let labelDe = `${item.firstName} ${item.lastName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;
          object.label = language === LANGUAGES.DE ? labelDe : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }
      if (type === 'PROVINCE') {
        inputData.map((item) => {
          let object = {};
          let labelDe = `${item.valueDe}`;
          let labelEn = `${item.valueEn}`;
          object.label = language === LANGUAGES.DE ? labelDe : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
    }
    return result;
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let { resProvince } = this.props.allRequiredDoctorInfo;

      let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
      this.setState({
        listProvince: dataSelectProvince,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, 'USERS');
      let { resProvince } = this.props.allRequiredDoctorInfo;

      let dataSelectProvince = this.buildDataInputSelect(resProvince, 'PROVINCE');
      this.setState({
        listDoctors: dataSelect,

        listProvince: dataSelectProvince,
      });
    }
  }
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      doctorId: this.state.selectedOption.value,
      description: this.state.description,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPayment, listPrice, listProvince } = this.state;
    let res = await getDetailInfoDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markDown = res.data.Markdown;
      let addressClinic = '',
        nameClinic = '',
        provinceId = '',
        seletedProvince = '';

      if (res.data.Doctor_info) {
        addressClinic = res.data.Doctor_info.addressClinic;
        nameClinic = res.data.Doctor_info.nameClinic;

        provinceId = res.data.Doctor_info.provinceId;

        seletedProvince = listProvince.find((item) => item.value === provinceId);
      }

      this.setState({
        contentMarkdown: markDown.contentMarkdown,
        contentHTML: markDown.contentHTML,
        description: markDown.description,
        hasOldData: true,
        addressClinic,
        nameClinic,

        selectedProvince: seletedProvince,
      });
    } else {
      this.setState({
        contentMarkdown: '',
        contentHTML: '',
        description: '',
        hasOldData: false,
        addressClinic: '',
        nameClinic: '',
      });
    }
  };

  handleChangeSelectDoctorInfo = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({ ...stateCopy });
  };

  handleOnchangeText = (e, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = e.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    let { hasOldData } = this.state;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-info">
          <div className="content-left">
            <label>
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              value={this.state.selectedOption}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctors}
              placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />}
            />
          </div>
          <div className="content-right">
            <label></label>
            <FormattedMessage id="admin.manage-doctor.intro" />
            <textarea
              className="form-control mb-3"
              rows="4"
              onChange={(e) => this.hanldeOnChangeText(e, 'description')}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="more-info-extra row">
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.nameClinic" />
            </label>

            <input
              type="text"
              className="form-control"
              onChange={(e) => this.handleOnchangeText(e, 'nameClinic')}
              value={this.state.nameClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>
              <FormattedMessage id="admin.manage-doctor.addressClinic" />
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => this.handleOnchangeText(e, 'addressClinic')}
              value={this.state.addressClinic}
            />
          </div>

          <div className="col-4 form-group">
            <label></label>
            <FormattedMessage id="admin.manage-doctor.province" />
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfo}
              options={this.state.listProvince}
              placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
              name="selectedProvince"
            />
          </div>
        </div>

        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: '500px' }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          onClick={() => this.handleSaveContentMarkdown()}
          className={
            hasOldData === true
              ? 'save-content-doctor btn-primary mt-3 mb-3'
              : 'create-content-doctor btn-primary mt-3 mb-3'
          }
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.save" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.add" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getAllRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
