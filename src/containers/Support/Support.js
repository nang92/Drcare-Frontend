import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { Form, Button } from 'react-bootstrap';
import openai from 'openai';

class Support extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      result: '',
    };
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const response = await openai.Completion.create(
      'org-OU51r8uuOpnv3Vou7fu5tuz0', // Replace with your Chatbot engine ID
      this.state.query,
      20,
      0.5,
      1,
      null,
      null,
      'text',
      'json'
    );
    this.setState({ result: response.choices[0].text });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Enter your question"
            value={this.state.query}
            onChange={(event) => this.setState({ query: event.target.value })}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Search
        </Button>
        {this.state.result && <p>Result: {this.state.result}</p>}
      </Form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Support);
