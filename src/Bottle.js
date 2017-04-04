import React, { Component } from 'react';
// import BottleStep1ImageUpload from './BottleStep1ImageUpload';
// import BottleStep2ImageUpload from './BottleStep2ImageUpload';
import Subheader from 'material-ui/Subheader';
import style from './style';
// import marked from 'marked';

export default class Bottle extends Component{
  constructor (props) {
    super(props);
    this.state = {
      toBeUpdatedStep1: false,
      toBeUpdatedStep2: false,
      toBeUploadedStep1: false,
      toBeUploadedStep2: false,
      step1: '',
      step2: '',
      step1ImageUrl: '',
      step2ImageUrl: ''
    };
    // this.deleteBottle = this.deleteBottle.bind(this);
    // this.updateStep1 = this.updateStep1.bind(this);
    // this.updateStep2 = this.updateStep2.bind(this);
    // this.uploadImageStep1 = this.uploadImageStep1.bind(this);
    // this.uploadImageStep2 = this.uploadImageStep2.bind(this);
    // this.handleStep1Change = this.handleStep1Change.bind(this);
    // this.handleStep2Change = this.handleStep2Change.bind(this);
    // this.handleStep1ImageChange = this.handleStep1ImageChange.bind(this);
    // this.handleStep2ImageChange = this.handleStep2ImageChange.bind(this);
    // this.handleBottleUpdate = this.handleBottleUpdate.bind(this);
  }

  handleBottleUpdate = (e) => {
    e.preventDefault();
    let id = this.props.uniqueID;
    //if step1 changed set it, if not leave null to skip it
    let step1 = (this.state.step1) ? this.state.step1 : null;
    let step2 = (this.state.step2) ? this.state.step2 : null;
    let step1ImageUrl = (this.props.step1ImageUrl) ? this.props.step1ImageUrl : null;
    let step2ImageUrl = (this.props.step2ImageUrl) ? this.props.step2ImageUrl : null;
    let bottle = { step1: step1, step2: step2, step1ImageUrl: step1ImageUrl, step2ImageUrl: step2ImageUrl};
    this.props.onBottleUpdate(id, bottle);
    this.setState({
      step1: '',
      step2: '',
      step1ImageUrl: '',
      step2ImageUrl: ''
    })
    if(this.state.toBeUpdatedStep1){
      this.setState({
        toBeUpdatedStep1: !this.state.toBeUpdatedStep1
      })
    }
    if(this.state.toBeUpdatedStep2) {
      this.setState({
        toBeUpdatedStep2: !this.state.toBeUpdatedStep2
      })
    }
    console.log(step1, step2, step1ImageUrl, step2ImageUrl)
  }


  render() {
    return (
      <div style={ style.bottle } >
        <div style={ style.bottleInner }>
          <div style={ style.bottleStep}>
            <Subheader style={style.imageHeader}>{ this.props.step1}</Subheader>
            {this.props.step1ImageUrl ?
              <img style={style.bottleImage} src={this.props.step1ImageUrl} alt='' /> : null
            }

          </div>
          <div style={ style.bottleStep}>
            <Subheader style={style.imageHeader}>{this.props.step2}</Subheader>
            {(this.props.step2ImageUrl && this.props.step2) ?
              <img style={style.bottleImage} src={this.props.step2ImageUrl} alt='' /> : null
            }

          </div>
        </div>
      </div>
    )
  }
}
