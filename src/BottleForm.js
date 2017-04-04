import React, { Component } from 'react';
// import style from './style';
import  TextField  from 'material-ui/TextField';
import  RaisedButton  from 'material-ui/RaisedButton'


export default class BottleForm extends Component{

  constructor(props){
    super(props);
    this.state = {
      step1: '',
      step2: '',
      step1ImageUrl: 'images/placholder.jpg',
      step2ImageUrl: 'images/placholder.jpg'
    };
    this.handleStep1Change = this.handleStep1Change.bind(this);
    this.handleStep2Change = this.handleStep2Change.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleStep1Change(e){
    this.setState({ step1: e.target.value });
  }
  handleStep2Change(e){
    this.setState({ step2: e.target.value });
  }
  handleSubmit(e){
    e.preventDefault();
    let step1 = this.state.step1.trim();
    let step2 = this.state.step2.trim();
    let step1ImageUrl = this.state.step1ImageUrl.trim();
    let step2ImageUrl = this.state.step2ImageUrl.trim();
    if (!step1){
      return;
    }
    let bottle = {step1: step1, step2: step2, step1ImageUrl: step1ImageUrl, step2ImageUrl: step2ImageUrl}
    this.props.onBottleSubmit(bottle);
    this.setState({
      step1: '',
      step2: ''
    })
  }
  render(){
    return(
      <div>
      <form  onSubmit={ this.handleSubmit }>
        <div className='field-line inline-field'>
          <TextField
          type='text'
          floatingLabelText='Step 1'
          value={ this.state.step1 }
          onChange={ this.handleStep1Change } />
      </div>
      <div className='field-line inline-field'>
        <TextField
        type='text'
        floatingLabelText='Step 2'
        value={ this.state.step2 }
        onChange={ this.handleStep2Change } />
      </div>
      <div className='inline-field'>
        <RaisedButton
          type='submit'
          label='Post' primary />
      </div>
      </form>
    </div>
    )
  }
}
