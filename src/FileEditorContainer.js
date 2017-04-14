import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import axios from 'axios'
import fileDownload from 'react-file-download'
import HbsContainer from './HbsContainer'
import UrlList from './UrlList'
import ProductSelectorContainer from './ProductSelectorContainer'
import RaisedButton from 'material-ui/RaisedButton'
import style from './style'

export default class FileEditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state ={
      data: '',
      selectedData:'',
      select: true,
      url: '',
      vertical: '',
    }
  }
  loadProductsFromServer = () => {
    axios.get(this.state.url)
      .then(res => {
        this.setState({
          data: res.data
        })
      })
  }
  handleVerticalSelect = (url, vertical) => {
    this.setState(
      {
        url: url,
        vertical: vertical,
        select: true
      },
      () => {
        this.loadProductsFromServer();
      }
    );
  }
  handleProductSelect = (products) => {
    this.setState({
      selectedData: products
    }, () => {
      console.log(this.state.selectedData)
    })
  }
  handleLanderFill = (content, name) => {
    this.state.selectedData.map(product => {
      console.log(product)
      let lander = content.replace(/{{step1}}/g, product.step1)
                          .replace(/{{step1ImageUrl}}/g, product.step1ImageUrl)
                          .replace(/{{step2}}/g, product.step2)
                          .replace(/{{step2ImageUrl}}/g, product.step2ImageUrl)
      // console.log(lander)
      let productName = product.step1.trim().split(' ')[0].toLowerCase()
      let landerName = name.replace(/.html/i, '').trim() + '-' + productName + '.html'
      console.log(landerName)


      fileDownload(lander, landerName)
      // ReactDOM.render(
      //   <div>{lander}</div>,
      //     document.getElementById('hbs')
      // )
    })
  }
  toggleSelect = (e) => {
    e.preventDefault();
    this.setState({
      select: !this.state.select
    })
  }
  compnentDidMount() {
    console.log('files')
  }

  render () {
    return (
      <div>
        <div style={ style.homeLinkContainer }>
          <UrlList
            onUrlChange={this.handleVerticalSelect}/>


          <p style={{textAlign: 'center'}}>Other Actions</p>
          <Link to='/productupload'>
            <RaisedButton labelPosition={'before'} primary={true} style={ style.homeLink } label='Add Offers' />
          </Link>
          <Link to='/offerids'>
            <RaisedButton labelPosition={'before'} primary={true} style={ style.homeLink } label='Add Ids' />
          </Link>

        </div>
        <div className='bottle-container'>
          {this.state.data ? (this.state.select ?
          <ProductSelectorContainer
            data={this.state.data}
            onProductSelect={this.handleProductSelect}/> :
          <HbsContainer
            onLanderUpload={this.handleLanderFill}/>):
            <p style={{textAlign: 'center'}}>Choose an option in the bar to the right</p>}
            { this.state.data ? (!this.state.select ?
                <RaisedButton labelPosition={'before'} primary={true}  label='Select More' onClick={this.toggleSelect} />  :
             <RaisedButton labelPosition={'before'} primary={true} label='Done Selecting' onClick={this.toggleSelect}/>) : null}
        </div>
      </div>
    )
  }
}
