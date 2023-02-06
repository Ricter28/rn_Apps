import * as React from 'react';
import { StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
interface IconProps {
  size?: number | 24;
  name: string;
  onPress?(): void;
  color?: string;
  type?:
  | 'Entypo'
  | 'AntDesign'
  | 'EvilIcons'
  | 'Feather'
  | 'FontAwesome'
  | 'Fontisto'
  | 'Foundation'
  | 'Ionicons'
  | 'MaterialCommunityIcons'
  | 'MaterialIcons'
  | 'Octicons'
  | 'SimpleLineIcons'
  | 'Zocial';
  style?: StyleProp<ViewStyle | TextStyle>;
}

const Icon = (props: IconProps) => {
  var IconCustom;
  switch (props.type) {
    case 'Entypo':
      IconCustom = Entypo;
      break;
    case 'AntDesign':
      IconCustom = AntDesign;
      break;
    case 'EvilIcons':
      IconCustom = EvilIcons;
      break;
    case 'Feather':
      IconCustom = Feather;
      break;
    case 'FontAwesome':
      IconCustom = FontAwesome;
      break;
    case 'Foundation':
      IconCustom = Foundation;
      break;
    case 'MaterialCommunityIcons':
      IconCustom = MaterialCommunityIcons;
      break;
    case 'Fontisto':
      IconCustom = Fontisto;
      break;
    case 'MaterialIcons':
      IconCustom = MaterialIcons;
      break;
    case 'Octicons':
      IconCustom = Octicons;
      break;
    case 'SimpleLineIcons':
      IconCustom = SimpleLineIcons;
      break;
    case 'Zocial':
      IconCustom = Zocial;
      break;
    default:
      IconCustom = Ionicons;
  }
  return <IconCustom {...props} />;
};

export default Icon;

const styles = StyleSheet.create({
  container: {},
});
