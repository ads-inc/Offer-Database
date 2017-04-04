import React, { Component } from 'react';
import { Card, CardTitle } from 'material-ui/Card';

export default class Home extends Component {
  render() {
    return (
      <Card className="container">
        <CardTitle title='Offer Database' subtitle='Home' />
      </Card>
    )
  }
}
