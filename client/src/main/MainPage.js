import React, { Component } from 'react';
import TopicSearchBar from './TopicSearchBar.js';
import SubSearchBar from './SubSearchBar.js';
import Results from './Results.js';
import './MainPage.scss';

const ERROR_MSG = {
  "tones": [
    {
      "score": 0.01,
      "tone_id": "analytical",
      "tone_name": "Error"
    },
  ],
  "topComments": [
    "Sorry, the server encountered an error!",
  ]
};

const EMPTY_MSG = {
  "tones": [
    {
      "score": 0.01,
      "tone_id": "analytical",
      "tone_name": "No Results"
    },
  ],
  "topComments": [
    "Sorry, we were unable to find any comments for your keyword!",
  ]
}; 

export default class MainPage extends Component {
  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.state = { 
      data: [],
      comments: [],
    }
    this.dataChanged = this.dataChanged.bind(this);
  }

  onClick() {
    let request = new XMLHttpRequest();
    let keyword = document.getElementById("TopicSearch").value;
    let sub = document.getElementById("SubSearch").value; 
    request.open('GET', process.env.TONE_ANALYSIS_URL, true);
    request.setRequestHeader('subreddit', sub);
    request.setRequestHeader('keyword', keyword);
    request.onload = function() {
      if (request.status !== 200) { // analyze HTTP status of the response
        alert(`Error ${request.status}: ${request.statusText}`); // e.g. 404: Not Found
      } else { // show the result
        let json = JSON.parse(request.response);
        this.dataChanged(json);
      }
    }.bind(this);
    request.onerror = function() {
      this.dataChanged(ERROR_MSG);
    }.bind(this);
    request.send();
  }

  dataChanged(newData) {
    if (newData.tones.length !== 0 && newData.topComments.length !== 0) {
      var dataJson = [];
      var commentJson = [];
      newData.tones.forEach(function(element) {
        dataJson.push({'label': element.tone_name, 'value': element.score * 100});
      });
      newData.topComments.forEach(function(element) {
        commentJson.push(element);
      });
      this.setState({
        data: dataJson,
        comments: commentJson,
      });
    } else {
      this.dataChanged(EMPTY_MSG);
    }
  }

  render() {
    return (
      <div className="MainContent">
        <div className="TitleBar">
          {`Presidential Analysis`}
        </div>
        <div className="TopicSearchBar">
          <TopicSearchBar
            selectedText="Search a Candidate or Topic"
          >
          </TopicSearchBar>
        </div>
        <div>
          <SubSearchBar
            selectedText="Search a Subreddit"
            onClick={this.onClick}
          >
          </SubSearchBar>
        </div>
        <div className="Results">  
          <Results
            data={this.state.data}
            comments={this.state.comments}
          >
          </Results>
        </div>
        <div className="Copyright">
          	&#169; Thomas Greenwald and Kanming Xu
        </div>
      </div>
    )
  }
}