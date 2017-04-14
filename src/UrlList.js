import React, { Component } from 'react';
import Urls from './Urls';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import style from './style';

export default class UrlList extends Component {

  handleClick = (e) => {
    e.preventDefault();
    this.setState({
      url: '',
      vertical: ''
    })
    let url = e.target.value || e.target.parentNode.value || e.target.parentNode.parentNode.value || e.target.parentNode.parentNode.parentNode.value;
    let vertical = e.target.textContent;
    this.props.onUrlChange(url, vertical);
    // console.log(url, vertical)
  }
  render(){
    let urlLinks = Urls.map((vertical, index) => {
      let button = 'button' + index.toString();
      return (
            <RaisedButton  key={button} value={ vertical.url } labelPosition={'before'} primary={true} onClick={this.handleClick} style={ style.homeLink } label={ vertical.name } />
      )
    })
    return (
      <div style={ style.homeMenu }>
        <p style={{textAlign: 'center'}}>Choose A Vertical</p>
        { urlLinks }
      </div>
    )
  }
}
