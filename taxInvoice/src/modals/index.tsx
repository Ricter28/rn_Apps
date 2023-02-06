import React, { Component } from 'react';
import { View } from 'react-native';
import Loading from './Loading';
import Message from './Message';
import Confirm from './Confirm';
export default class Modals extends Component {
  render() {
    return (
      <View style={{ position: 'absolute' }}>
        <Loading />
        <Message />
        <Confirm />
      </View>
    );
  }
}
