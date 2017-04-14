import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import Hbs from './Hbs'

export default class HbsContainer extends Component {
  constructor(props) {
    super(props)
  }

  handleFileUpload = (files) => {
    let file = files[0]
    let fileType = 'text/html'
    console.log(file)
    // console.log(file.type, fileType)
    var content =''
    if(file.type === fileType) {
      readFile(file, (e) => {
        this.props.onLanderUpload(e.target.result, file.name)
      })
      // console.log(content)
    }else{
      ReactDOM.render(
        <div style={{color: 'red'}}>Error</div>,
          document.getElementById('hbs')
      )
    }
    function readFile(doc, callback){
      var reader = new FileReader();
      reader.onload = callback
      reader.readAsText(doc);
    }
  }
  render() {
    return (
      <div>
        <div id='hbs' />
        <Hbs
          onFileUpload={this.handleFileUpload}/>
        <div id='hbs' />

      </div>
    )
  }
}
