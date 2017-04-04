import React, { Component } from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import  TextField  from 'material-ui/TextField';
import  RaisedButton  from 'material-ui/RaisedButton';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Delete from 'material-ui/svg-icons/action/delete';
import Edit from 'material-ui/svg-icons/editor/mode-edit';
import Bottle from './Bottle';
import BottleStep1ImageUpload from './BottleStep1ImageUpload';
import BottleStep2ImageUpload from './BottleStep2ImageUpload';
import style from './style';

export default class BottleList extends Component{
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      toBeUpdatedStep1: false,
      toBeUpdatedStep2: false,
      toBeUploadedStep1: false,
      toBeUploadedStep2: false,
      step1: '',
      step2: '',
      step1ImageUrl: '',
      step2ImageUrl: ''

    }
  }
  updateStep1 = (e) => {
    e.preventDefault();
    //bring up update field when link is clicked
    this.setState({ toBeUpdatedStep1: !this.state.toBeUpdatedStep1 });
  }
  updateStep2 = (e) => {
    e.preventDefault();
    //bring up update field when link is clicked
    this.setState({ toBeUpdatedStep2: !this.state.toBeUpdatedStep2 });
  }
  uploadImageStep1 = (e) => {
    if(e){
    e.preventDefault();
  }
    //bring up image uploader
    this.setState({
      toBeUploadedStep1: !this.state.toBeUploadedStep1
    });
    // console.log(e.target.uniqueID)
  }
  uploadImageStep2 = (e) => {
    if(e){
    e.preventDefault();
  }
    //bring up image uploader
    this.setState({
      toBeUploadedStep2: !this.state.toBeUploadedStep2
    });
  }
  handleStep1Change = (e) => {
    e.preventDefault();
    this.setState({
      step1: e.target.value
    })
  }
  handleStep2Change = (e) => {
    e.preventDefault();
    this.setState({
      step2: e.target.value
    })
  }
  handleBottleUpdate = (image1, image2) => {
    // e.preventDefault();
    let id = this.state.id;
    //if step1 changed set it, if not leave null to skip it
    let step1 = (this.state.step1) ? this.state.step1.trim() : null;
    let step2 = (this.state.step2) ? this.state.step2.trim() : null;
    let step1ImageUrl = (image1 && (!step1 && !step2 && !image2)) ? image1.trim() : null;
    let step2ImageUrl = (image2 && (!step1 && !step2 && !step1ImageUrl)) ? image2.trim() : null;
    let bottle = { step1: step1, step2: step2, step1ImageUrl: step1ImageUrl, step2ImageUrl: step2ImageUrl};
    this.props.onBottleUpdate(id, bottle);
    this.setState({
      id: '',
      step1: '',
      step2: ''

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
    console.log(id, step1, step2, step1ImageUrl, step2ImageUrl)
    this.handleRequestClose();
  }
  deleteBottle = (e) => {
    e.preventDefault();
    let id = e.target.value || e.target.parentNode.value || e.target.parentNode.parentNode.value || e.target.parentNode.parentNode.parentNode.value;
    console.log(id);
    this.props.onBottleDelete(id);
    console.log('oops deleted');
  }
  openUpdateMenu = (e) => {
    e.preventDefault();
    let id = e.target.parentNode.parentNode.parentNode.value || e.target.parentNode.parentNode.value || e.target.parentNode.value ||e.target.value
    console.log(id)
    this.setState({
      open: true,
      anchorEl: e.currentTarget,
      id: id
    })
  }
  handleRequestClose = () => {
    this.setState({
      open: false,
      toBeUpdatedStep1: false,
      toBeUpdatedStep2: false,
      toBeUploadedStep1: false,
      toBeUploadedStep2: false
    })
  }
  render(){
    var bottleId = [];
    let bottleNodes = this.props.data.slice(0).reverse().map((bottle, index) => {
      let i = index + 1;
      bottleId.push(bottle['_id']);
      let step1 = bottle.step1;
      let step2 = bottle.step2;

      return (
        <GridTile

          actionIcon={
            <div>
            <IconButton  id={'delete'+ index} onClick={ this.deleteBottle } value={bottle['_id']} ><Delete color="white" /></IconButton>
            <IconButton  id={'update' + index} onClick={ this.openUpdateMenu } value={bottle['_id']} ><Edit color="white" /></IconButton>
            <Popover
              open={this.state.open}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'bottom'}}
              onRequestClose={this.handleRequestClose} >
              <Menu disableAutoFocus>

                  { (!this.state.toBeUpdatedStep1) ?
                    <MenuItem primaryText='Edit Step 1' style={style.menuItem} onTouchTap={this.updateStep1} /> :
                     <div style={{padding: '0 16px'}}>
                       <TextField
                       type='text'
                       hintText='Step 1'
                       value={ this.state.step1 }
                       onChange={ this.handleStep1Change } />
                     <div>
                       <RaisedButton  style={{display: 'inline-block', width: '50%'}} label='submit' type='submit' primary onTouchTap={this.handleBottleUpdate}/>
                       <RaisedButton  style={{display: 'inline-block', width: '50%'}} label='cancel' secondary onTouchTap={this.updateStep1}/>
                     </div>
                       </div>}
                 { (!this.state.toBeUpdatedStep2) ?
                   <MenuItem primaryText='Edit Step 2' style={style.menuItem} onTouchTap={this.updateStep2} /> :
                    <div style={{padding: '0 16px'}}>
                      <TextField
                      type='text'
                      hintText='Step 2'
                      value={ this.state.step2 }
                      onChange={ this.handleStep2Change } />
                    <div>
                      <RaisedButton  style={{display: 'inline-block', width: '50%'}} label='submit' type='submit' primary onTouchTap={this.handleBottleUpdate}/>
                      <RaisedButton  style={{display: 'inline-block', width: '50%'}} label='cancel' secondary onTouchTap={this.updateStep2}/>
                    </div>
                  </div>}

                  { (!this.state.toBeUploadedStep1) ?
                    <MenuItem primaryText='Upload/Edit Step 1 Image' style={style.menuItem} onTouchTap={this.uploadImageStep1} /> :
                     <div style={{padding: '0 16px'}}>
                       <BottleStep1ImageUpload
                       step1={step1}
                       closeUploadStep1={ this.uploadImageStep1 }
                       updateImage={ this.handleBottleUpdate}/>
                     <div>
                       <RaisedButton  style={{display: 'inline-block', width: '100%'}} label='cancel' secondary onTouchTap={this.uploadImageStep1}/>
                     </div>
                       </div>}

                  { (!this.state.toBeUploadedStep2) ?
                    <MenuItem primaryText='Upload/Edit Step 2 Image' style={style.menuItem} onTouchTap={this.uploadImageStep2} /> :
                     <div style={{padding: '0 16px'}}>
                       <BottleStep2ImageUpload
                       step2={step2}
                       closeUploadStep2={ this.uploadImageStep2 }
                       updateImage={ this.handleBottleUpdate}                       />
                     <div>
                       <RaisedButton  style={{display: 'inline-block', width: '100%'}} label='cancel' secondary onTouchTap={this.uploadImageStep2}/>
                     </div>
                   </div>}



              </Menu>
            </Popover>
            </div>
          }
          title={ 'Offer ' + i}
          key={ bottle['_id'] + i}
          >


        <Bottle
          step1={ bottle.step1 }
          step2={ bottle.step2 }
          step1ImageUrl={ bottle.step1ImageUrl }
          step2ImageUrl={ bottle.step2ImageUrl } />
        </GridTile>
      )
    })
    return (
      <div style={ style.root }>
        <GridList cellHeight={200} style={style.gridList}>
          { bottleNodes }
      </GridList>
      </div>
    )
  }
}
