import React from 'react';
import {Card, CardTitle} from 'material-ui/Card'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const OfferIds = ({onOfferIdChange, onOfferNameChange, onOfferSubmit}) => {
  return(
    <div className='bottle-container'>
      <Card>
        <CardTitle title='Offers' subtitle='Section comming soon...'/>
        <TextField hintText='Offer Name' type='text'onChange={onOfferNameChange} />
        <TextField hintText='enter offer id only' type='number' onChange={onOfferIdChange} />
        <br />
        <RaisedButton onClick={onOfferSubmit} label='Submit Offer' primary />
      </Card>
    </div>
  )
}
export default OfferIds;
