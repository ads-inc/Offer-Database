import React, { Component } from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import config from '../config.js';

export default class BottleStep2ImageUpload extends Component{
  constructor (props) {
    super(props);
    this.state = {
      step1ImageUrl: '',
      step2ImageUrl: ''
    }
    this.onImageDrop = this.onImageDrop.bind(this);
    // this.handleStep1ImageChange = this.handleStep1ImageChange.bind(this);
    // this.handleStep2ImageChange = this.handleStep2ImageChange.bind(this);
    // this.handleImageUpdate = this.handleImageUpdate.bind(this);
  }
  onImageDrop(files){
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }
  handleImageUpload(file){
    let upload = request.post(config.cloudinaryUploadUrl)
                        .field('upload_preset', config.cloudinaryUploadPreset)
                        .field('file', file);
    upload.end((err, res) => {
      if (err) {
        console.log(err)
      }
      if (res.body.secure_url !== '') {
        this.setState({
          step2ImageUrl: res.body.secure_url
        });
      }
      let step1ImageUrl = this.state.step1ImageUrl
      let step2ImageUrl = this.state.step2ImageUrl
      this.props.updateImage(step1ImageUrl, step2ImageUrl);
    })
  }

  render(){
    return (
      <div>
        <div className='FileUpload'>
            <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop}
            >
              <p>Drop an image or click to select a file to upload.</p>

          </Dropzone>

        </div>
      </div>
    )
  }
}
