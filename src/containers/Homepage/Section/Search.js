import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getKeywordClinic } from '../../../services/userService';
import _ from 'lodash';

//import './Search.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      clinics: [],
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let res = await getKeywordClinic({
      keyword: this.state.keyword,
    });

    if (res && res.errCode === 0) {
      this.setState({
        clinics: res.data,
      });
    }
  };

  handleChange = (event) => {
    this.setState({
      keyword: event.target.value,
    });
  };

  render() {
    let { clinics } = this.state;
    let { language } = this.props;
    console.log('check state', this.state);
    return (
      <div className="search-clinic-container">
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Search for clinics" value={this.state.keyword} onChange={this.handleChange} />
          <button type="submit">Search</button>
        </form>
        {clinics && clinics.length > 0 && (
          <ul>
            {clinics.map((clinic) => (
              <li key={clinic.id}>{clinic.name}</li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.language,
});

export default connect(mapStateToProps)(Search);
