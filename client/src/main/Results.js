import React, { Component } from 'react';
import Dropdown from 'react-dropdown'
import BubbleChart from '@weknow/react-bubble-chart-d3';
import './Results.scss';

export default class Results extends Component {
  constructor (props) {
    super(props);
    this.props = props;
    this.state = {
      data: this.props.data,
      comments: this.props.comments,
    }
  }


  render () {
    return (
      <div>
        <Dropdown className="DropDownStyle" options={this.props.comments} placeholder="Top Comments"/>
        <BubbleChart 
          width={500}
          graph= {{
            zoom: .7,
            offsetX: .13,
            offsetY: .10,
          }}
          overflow={true}
          height={400}
          padding={0}
          showLegend={false}
          data={this.props.data}
        >
        </BubbleChart>
      </div>
    )
  }
}