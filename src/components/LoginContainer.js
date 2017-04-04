import React, { Component, PropTypes } from 'react';
import Login from './Login';
import axios from 'axios';
import Auth from '../modules/Auth'
// import { browserHistory } from 'react-router';

export default class LoginContainer extends Component {
  constructor(props, context) {
    super(props);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage')
    }
    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    }

  }

  changeUser = (e) => {
    const field = e.target.name;
    const user = this.state.user;
    user[field] = e.target.value;

    this.setState({
      user
    });
   }

   processForm = (e) => {
     e.preventDefault();
     // create a string for an HTTP body message
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    // create an AJAX request
    axios.post('http://127.0.0.1:8081/auth/login', formData)
      .then(res => {
        this.setState({
          errors: {}
        })
        Auth.authenticateUser(res.data.token);


        this.context.router.replace('/');
      })
      .catch(err => {
        const errors = err.response.data.errors ? err.response.data.errors : {};
        this.setState({
          errors
        })
      })
    // const xhr = new XMLHttpRequest();
    // xhr.open('post', 'localhost:8081/auth/login');
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    // xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
    // xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    // xhr.setRequestHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    // xhr.setRequestHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    // xhr.responseType = 'json';
    // xhr.addEventListener('load', () => {
    //   if (xhr.status === 200) {
    //     // success
    //
    //     // change the component-container state
    //     this.setState({
    //       errors: {}
    //     });
    //
    //     console.log('The form is valid');
    //   } else {
    //     // failure
    //
    //     // change the component state
    //     const errors = xhr.response.errors ? xhr.response.errors : {};
    //     errors.summary = xhr.response.message;
    //
    //     this.setState({
    //       errors
    //     });
    //   }
    // });
    // xhr.send(formData);

    //  console.log('name:', this.state.user.name)
     console.log('email:', this.state.user.email)
     console.log('password:', this.state.user.password)
    //  browserHistory.push('/home');
   }
   render() {
     return(
       <Login
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
        />
     )
   }
}

LoginContainer.contextTypes = {
  router: PropTypes.object.isRequired
}
