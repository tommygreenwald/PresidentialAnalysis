import React, { Component } from 'react';
import { TextInput } from 'carbon-components-react';
import './TopicSearchBar.scss';

const PLACEHOLDER = 'Search a Candidate or Topic';
const INVALID_TEXT = 'Topic is a required field!';

export default class TopicSearchBar extends Component {
  constructor (props) {
    super(props);
    this.props = props;
    this.state = {
      selectedText: '',
    }
  }

  onTextFieldChange(e) {
    this.setState({ selectedText: e.target.value }, () => {
    });
  }

  isValid() {
    return this.state.selectedText === '';
  }

  render () {
    const { placeholder  } = this.state;
    return (
      <div> 
        <TextInput
          className="TopicSearchField"
          id="TopicSearch"
          onChange={(e) => this.onTextFieldChange(e)}
          placeholder={PLACEHOLDER}
          invalid={this.isValid()}
          invalidText={INVALID_TEXT}
        />
      </div>
    )
  }
}