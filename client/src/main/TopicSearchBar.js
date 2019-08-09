import React, { Component } from 'react';
import { TextInput } from 'carbon-components-react';
import './TopicSearchBar.scss';

export default class TopicSearchBar extends Component {
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
    const { placeholder  } = this.state;
    return (
      <div> 
        <TextInput
          className="TopicSearchField"
          id="TopicSearch"
          onChange={(e) => this.onTextFieldChange(e)}
          placeholder={placeholder}
        />
      </div>
    )
  }
}