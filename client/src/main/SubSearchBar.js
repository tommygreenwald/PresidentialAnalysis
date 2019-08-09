import React, { Component } from 'react';
import { TextInput } from 'carbon-components-react';
import './SubSearchBar.scss';

export default class SubSearchBar extends Component {
  constructor (props) {
    super(props);
    this.props = props;
    this.state = {
      placeholder: this.props.selectedText,
      selectedText: this.props.selectedText,
    }
  }

  onTextFieldChange(e) {
    this.setState({ selectedText: e.target.value }, () => {
    });
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
            placeholder={placeholder}
          />
        </div>
        <button className="ButtonClass" onClick={this.props.onClick}>
          Search
        </button>
      </div>
    )
  }
}