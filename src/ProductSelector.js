import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

const ProductSelector = ({data, onSelect, selected, selectRow}) => {
  let productNodes = data.slice(0).reverse().map((product, index) => {
    return(
      <TableRow key={index} id={product._id} onChange={onSelect} selected={selected}>
        <TableRowColumn>{product.step1}</TableRowColumn>
        <TableRowColumn><img style={{width: '50px', height: '50px'}} src={product.step1ImageUrl} role='presentation'/></TableRowColumn>
        <TableRowColumn>{product.step2}</TableRowColumn>
        <TableRowColumn><img style={ product.step2 ? {width: '50px', height: '50px'} : {display: 'none'}} src={product.step2ImageUrl} role='presentation'/></TableRowColumn>
      </TableRow>
    )
  })
  return (
    <Table multiSelectable={true} deselectOnClickawawy={false} height='300px' onRowSelection={selectRow}>
      <TableHeader>
        <TableRow>
          <TableHeaderColumn>Step 1</TableHeaderColumn>
          <TableHeaderColumn>Step 1 Image</TableHeaderColumn>
          <TableHeaderColumn>Step 2</TableHeaderColumn>
          <TableHeaderColumn>Step 2 Image</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody deselectOnClickaway={false} showRowHover={true}>
        {productNodes}
      </TableBody>
    </Table>

  )
}

export default ProductSelector
