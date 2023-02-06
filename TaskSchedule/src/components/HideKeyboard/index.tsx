import React from 'react';
import {TouchableWithoutFeedback, Keyboard} from 'react-native';

const HideKeyboard = (props: any) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {props.children}
  </TouchableWithoutFeedback>
);

export default HideKeyboard;
