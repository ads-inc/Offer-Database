import React, { PropTypes, Component } from 'react';
import axios from 'axios';
import Signup from './Signup';

export default class SignupContainer extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      errors: {},
      user: {
        email: '',
        name: '',
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

     //create string for http boby message
    //  const name = encodeURIComponent(this.state.user.name);
    //  const email = encodeURIComponent(this.state.user.email)
    //  const password = encodeURIComponent(this.state.user.password)
    //  const formData = `email=${email}&password=${password}&name=${name}`;
    const name = this.state.user.name;
    const email = this.state.user.email;
    const password = this.state.user.password;
    const formData = {name: name, email: email, password: password};

     // create an AJAX request

    //  axios.post('http://127.0.0.1:3001/auth/signup', formData)
    //    .then(res => {
    //      this.setState({
    //        errors: {}
    //      })
    //      localStorage.setItem('successMessage', res.data.message);
    //      this.context.router.replace('/login');
    //    })
    //    .catch(err => {
    //      const errors = err.response.data.errors ? err.response.data.errors : {};
    //      this.setState({
    //        errors
    //      })
    //      console.log(this.state.errors)
    //    })

       axios({
         method: 'post',
         data: formData,
         responseType: 'json',
         url: 'http://127.0.0.1:3001/auth/signup'
       })
       .then(res => {
         this.setState({
           errors: {}
         })
         localStorage.setItem('successMessage', res.data.message);
         this.context.router.replace('/login');
       })
       .catch(err => {
         const errors = err.response.data.errors ? err.response.data.errors : {};
         this.setState({
           errors
         })
         console.log(this.state.errors);
       })

     console.log('name:', this.state.user.name);
     console.log('email:', this.state.user.email);
     console.log('password:', this.state.user.password);

   }
   render() {
     return(
       <Signup
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        user={this.state.user}
        />
     )
   }
}

SignupContainer.contextTypes = {
  router: PropTypes.object.isRequired
}
