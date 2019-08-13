import React, { Component } from 'react';
import { TextInput } from 'carbon-components-react';
import './SubSearchBar.scss';

const PLACEHOLDER = 'Search a Subreddit';
const INVALID_TEXT = 'Subreddit is a required field!';

export default class SubSearchBar extends Component {
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
    const { placeholder } = this.state;
    return (
      <div className="PaddedSearchDiv"> 
        <div className="TextBoxSub">
          <TextInput
            className="SubSearchField"
            id="SubSearch"
            onChange={(e) => this.onTextFieldChange(e)}
            placeholder={PLACEHOLDER}
            invalid={this.isValid()}
            invalidText={INVALID_TEXT}
          />
        </div>
        <button className="ButtonClass" onClick={this.props.onClick}>
          Search
        </button>
      </div>
    )
  }
}