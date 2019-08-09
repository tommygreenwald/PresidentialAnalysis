import React, { Component } from 'react';
import TopicSearchBar from './TopicSearchBar.js';
import SubSearchBar from './SubSearchBar.js';
import Results from './Results.js';
import './MainPage.scss';

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
    let topic = document.getElementById("TopicSearch").value;
    let sub = document.getElementById("SubSearch").value; 
    request.open('GET', process.env.TONE_ANALYSIS_URL, true);
    request.setRequestHeader('subreddit', sub);
    request.setRequestHeader('topic', topic);
    request.send(null);
    request.onload = function() {
      if (request.status !== 200) { // analyze HTTP status of the response
        alert(`Error ${request.status}: ${request.statusText}`); // e.g. 404: Not Found
      } else { // show the result
        this.setState({data: request.response});
        this.dataChanged();
        return request.response;
      }
    }.bind(this);
    request.onerror = function() {
      this.setState({data: {
                    "tones": [
                      {
                        "score": 0.530312,
                        "tone_id": "analytical",
                        "tone_name": "Analytical"
                      },
                      {
                        "score": 0.51076,
                        "tone_id": "tentative",
                        "tone_name": "Tentative"
                      }
                    ],
                    "topComments": [
                      "Megathread | Trump abandons bid to include citizenship question on census",
                      "Even if you absolutely love Trump and think he's the greatest, you have to admit he didn't  build the wall.  He didn't stop immigration.  He hasn't done anything about North Korea except validate their dictator.  Ditto for Russia.  He didn't make your paycheck bigger.  He didn't accomplish anything he promised.  The most notable thing he's done is spend $6 Billion to lock kids in cages and let them fester in filth.    Are we great yet,  Edit: Thanks for gold,  And because someone will inevitably ask for proof, child separations began in April 2017: https://www.usatoday.com/story/news/politics/2019/02/07/democrats-trump-administration-family-separation-policy-border-immigration/2794324002/  And it's costing us $4.5 million a day to house these kids: https://www.reddit.com/r/politics/comments/c9k9vk/keeping_children_in_cages_costs_american/  There are 1,343 days between May 1 2017 and when Trump leaves office on Jan 20 2021.",
                      "Twitter Critics Won't Let Paul Ryan Play Hero After Report He Blasted Trump: 'I'm on the House Floor looking under the seats for the spine of Paul Ryan. Haven't found it yet,' tweeted California Democratic Rep. Ted Lieu.",
                      "Kamala Harris: Rape kit backlog can be cleared at cost of Trump golf trips",
                      "Roberts: you can have whatever question you want as long as you don't lie about it  Trump: I'm abandoning the question",
                      "Trump:   'We'll see what happens,' Mr. Trump said Friday. 'We could also add an addition on. So we could start the printing now and maybe do an addendum after we get a positive decision. **So we're working on a lot of things including an executive order.**  Barr:   AG Barr says that in the hysterical mode of the day,' **some in the media suggested that the Administration was planning to add a Citizenship question to the 2020 Census 'by executive fiat,'** defying court orders. **'This has never been under consideration,**' he said.  It's called gaslighting, and it's stunning to see coming from the AG of the United States.",
                      "Houston Police Chief Torches Donald Trump Over ICE Raids: Chase Crooks, Not Cooks",
                      "*This* is what resistance in the age of Trump looks like.",
                      "At what point does the moral compass of an organization become so broken that we can regard anyone who works in it to be morally bankrupt,  We are nearly there with ICE. Anyone who has chosen to work for ICE since Trump is an absolute scumbag that deserves scorn for the rest of their lives.  ICE on a resume should be an automatic disqualifier for any profession that requires sound ethical reasoning or works with any vulnerable population.",
                      "Trump is an *expert* businessman and deal maker who *never* backs down from anything... except:     Census question :heavy_check_mark:   Border wall :heavy_check_mark:   Making Mexico pay for it :heavy_check_mark:   Banning Muslim immigrants :heavy_check_mark:   Government shut down :heavy_check_mark:   Rolling tanks down the National Mall :heavy_check_mark:   Putting Hillary in prison :heavy_check_mark:   Selling weapons to the Saudis :heavy_check_mark:   Drain the swamp :heavy_check_mark:   Tax breaks for workers :heavy_check_mark:   Repeal the Affordable Care Act :heavy_check_mark:   Tariffs on Canada and Mexico :heavy_check_mark:   Save the coal industry :heavy_check_mark:   Save Carrier workers :heavy_check_mark:   Lower prescription drug costs :heavy_check_mark:   Hardest working President ever :heavy_check_mark:   At least four casinos and a dozen other businesses :heavy_check_mark:"
                    ]
      }});
      this.dataChanged();
    }.bind(this);
  }

  dataChanged() {
    var tempData = this.state.data;
    var dataJson = [];
    var commentJson = [];
    tempData.tones.forEach(function(element) {
      dataJson.push({'label': element.tone_name, 'value': element.score*100});
    })
    tempData.topComments.forEach(function(element) {
      commentJson.push(element);
    })
    this.setState({
      data: dataJson,
      comments: commentJson,
    })
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