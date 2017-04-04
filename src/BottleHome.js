import React, { Component } from 'react';
// import { List, ListItem } from 'material-ui/List';
import { browserHistory } from 'react-router';
import BottleBox from './BottleBox';
import UrlList from './UrlList';
// import Login from './Login/Login';
import Auth from './modules/Auth';
import axios from 'axios';
import style from './style';

export default class BottleHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      secretData: ''
    }
    this.handleUrlChange = this.handleUrlChange.bind(this);
    this.handleBackArrow = this.handleBackArrow.bind(this);
  }
  handleUrlChange (url, vertical){

    this.setState({
      url: url,
      vertical: vertical
    })
    console.log(url, vertical);
  }
  handleBackArrow (e) {

    browserHistory.push('/');
    window.location.reload(true);

  }
  componentDidMount() {
    // axios.defaults.headers.common['Authorization'] = 'bearer ' + Auth.getToken();

    axios.get('http://127.0.0.1:8081/api/dashboard')
    // axios({
    //   method: 'get',
    //   url: 'http://127.0.0.1:8081/api/dashboard',

    //   headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    //   withCredentials: true,
    //   auth: `bearer ${Auth.getToken()}`,
    //   responseType: 'json'
    // })
      .then(res => {
        this.setState({
          secretData: res.data.message
        })
      })
      .catch(err => {
        console.log(err.response)
        console.log(`bearer ${Auth.getToken()}`)
      })
  }
  render() {
    return(
          <BottleBox
            pollInterval={2000}
             />
    )
  }

  // render () {
  //   return (
  //     <UrlList />
  //   )
  // }
}
