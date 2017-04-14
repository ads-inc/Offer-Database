import React, { Component } from 'react';
import Card from 'material-ui/Card'
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';
import BottleList from './BottleList';
import BottleForm from './BottleForm';
import UrlList from './UrlList'
import Auth from './modules/Auth';
import style from './style';

// => Use in production
// axios.defaults.headers.common['Authorization'] = `bearer ${Auth.getToken()}`;

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
      }, 300)
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

  componentDidMount() {
    if (this.state.url !== ''){
      this.loadBottlesFromServer()

  }
  axios.get('/api/dashboard')
  // axios.get('http://127.0.0.1:8081/api/dashboard')
    .then(res => {
      this.setState({
        secretData: res.data.message
      })
    })
    .catch(err => {
      console.log(err.response)
    })
  }
  didComponentUpdate() {

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
          <p></p>
            <Link to='/'>
              <RaisedButton labelPosition={'before'} secondary={true} style={ style.homeLink } label='Back' />
            </Link>
        </div>
        {this.state.url ?
      <Card className='bottle-container'>
        <div style={ style.bottleBox }>
          <h2 style={ style.header }>{ this.state.vertical } Offers</h2>
          <BottleForm onBottleSubmit={ this.handleBottleSubmit }/>
          <BottleList
            data={ this.state.data }
            onBottleDelete={ this.handleBottleDelete }
            onBottleUpdate={ this.handleBottleUpdate }
            onImageUpdate={ this.handleBottleUpdate } />
        </div>
      </Card> : <div className='bottle-container'>
      Choose an option in the menu to the left to get started
      </div> }
    </div>

    )
  }
}
