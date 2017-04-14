import React, { Component } from 'react';
// import { List, ListItem } from 'material-ui/List';
// import { browserHistory } from 'react-router';
import BottleBox from './BottleBox';
import UrlList from './UrlList';
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router'
// import Login from './Login/Login';
// import Auth from './modules/Auth';
// import axios from 'axios';
import style from './style';

export default class BottleHome extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     secretData: '',
  //     vertica: ''
  //   }
  // }
  //   this.handleUrlChange = this.handleUrlChange.bind(this);
  //   this.handleBackArrow = this.handleBackArrow.bind(this);
  // }
  // handleUrlChange = (url, vertical) => {
  //
  //   this.setState({
  //     url: url,
  //     vertical: vertical
  //   })
  //   console.log(url, vertical);
  // }
  // handleBackArrow (e) {
  //
  //   browserHistory.push('/');
  //   window.location.reload(true);
  //
  // }
  //
  render() {
    return(
      <div>

        <BottleBox
          pollInterval={2000}
           />

      </div>
    )
  }

  // render () {
  //   return (
  //     <UrlList />
  //   )
  // }
}
