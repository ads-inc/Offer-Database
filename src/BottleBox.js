import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Card from 'material-ui/Card'
import axios from 'axios';
import BottleList from './BottleList';
import BottleForm from './BottleForm';
import UrlList from './UrlList'
import Auth from './modules/Auth';
import style from './style';

export default class BottleBox extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      url: '',
      vertical: ''
     };
    this.loadBottlesFromServer = this.loadBottlesFromServer.bind(this);
    this.handleBottleSubmit = this.handleBottleSubmit.bind(this);
    this.handleBottleDelete = this.handleBottleDelete.bind(this);
    this.handleBottleUpdate = this.handleBottleUpdate.bind(this);
  }
  loadBottlesFromServer(url) {
    let apiUrl = url || this.state.url;
    for(let i = 0; i < 5; i++){
      setTimeout(() => {
        axios.get(apiUrl)
        .then(res => {
          this.setState({ data: res.data });
        })
        console.log('loaded')
      }, 808)
    }

  }
  handleBottleSubmit(bottle){
    let bottles = this.state.data;
    bottle.id = Date.now();
    let newBottles = bottles.concat([bottle]);
    this.setState({ data: newBottles });
    axios.post(this.state.url, bottle)
    .then(res => {
      console.log('Bottle Created');
    })
    .catch( err => {
      console.log(err);
      this.setState({ data: bottles });
    });
    this.loadBottlesFromServer()


  }
  handleBottleDelete(id) {
    axios.delete(`${this.state.url}/${id}`)
    .then(res => {
      console.log('Bottle deleted');
    })
    .catch(err => {
      console.log(err);
    })

    this.loadBottlesFromServer()

  }
  handleBottleUpdate(id, bottle) {
    axios.put(`${this.state.url}/${id}`, bottle)
    .then(res => {
      console.log(bottle);
    })
    .catch(err => {
      console.log(err);
    })

    this.loadBottlesFromServer();
  }
  handleUrlChange = (url, vertical) => {

    this.setState({
      url: url,
      vertical: vertical
    })
    console.log(this.state.url, vertical);
    this.loadBottlesFromServer(url);
  }
  // handleBackArrow = (e) => {
  //
  //   browserHistory.push('/');
  //   window.location.reload(true);
  //
  // }
  componentDidMount() {
    if (this.state.url !== ''){
      this.loadBottlesFromServer()

  }
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
    // setInterval(this.loadBottlesFromServer, this.props.pollInterval);
  }

  render() {
    return(
      <div>
        <div style={ style.homeLinkContainer }>
          <UrlList
            secretData={this.state.secretData}
            onUrlChange={ this.handleUrlChange }
            vertical={this.state.vertical}
            />
        </div>
        {this.state.url ?
      <Card className='bottle-container'>
        <div style={ style.bottleBox }>
          <h2 style={ style.header }>{this.state.vertical} Offers</h2>
          <BottleForm onBottleSubmit={ this.handleBottleSubmit }/>
          <BottleList
            data={ this.state.data }
            onBottleDelete={ this.handleBottleDelete }
            onBottleUpdate={ this.handleBottleUpdate }
            onImageUpdate={ this.handleBottleUpdate } />
        </div>
      </Card> : <div className='bottle-container'>
      Choose an option in the menu to the right to get started
      </div> }
    </div>

    )
  }
}
