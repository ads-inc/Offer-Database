import React, { Component } from 'react'
import ProductSelector from './ProductSelector'

export default class ProductSelectorContainer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: '',
      selected: false
    }
  }

    // let ids = this.state.ids
    // let addIds = ids.concat([e.target.parentNode.parentNode.parentNode.id])
    // this.setState({
    //   ids: addIds
    // })
    // console.log(ids, addIds)

  handleRowSelection = (rowArray) => {
    let productData= ''

    if(rowArray !== 'all' && rowArray){
     productData = rowArray.map(item => {

        let data = this.props.data.slice(0).reverse().map(item => {
          let step1 = ''
          let step2 = ''
          let step1ImageUrl = ''
          let step2ImageUrl = ''
          step1 += item.step1
          step2 += item.step2
          step1ImageUrl += item.step1ImageUrl
          step2ImageUrl += item.step2ImageUrl
          let product = {step1: step1, step2: step2, step1ImageUrl: step1ImageUrl, step2ImageUrl: step2ImageUrl}
          return product
        })
        return data[item]
      })
      console.log(productData)
      // return productdata

    } else if (rowArray === 'all'){
    productData = this.props.data.slice(0).reverse().map((item, index) => {
          let step1 = ''
          let step2 = ''
          let step1ImageUrl = ''
          let step2ImageUrl = ''
          step1 += item.step1
          step2 += item.step2
          step1ImageUrl += item.step1ImageUrl
          step2ImageUrl += item.step2ImageUrl
          let product = {step1: step1, step2: step2, step1ImageUrl: step1ImageUrl, step2ImageUrl: step2ImageUrl}
          return product        
      })
      console.log(productData)
      // return productdata
    } else {
      productData = this.state.data;
    }

    console.log(productData)
    this.props.onProductSelect(productData)
    // Now pass productdata into another function that loops through the array and fills product data into landers
  }
  render() {
    return(
      <ProductSelector
        data={this.props.data}
        onSelect={this.handleProductSelect}
        selected={this.state.selected}
        selectRow={this.handleRowSelection}/>
    )
  }
}
