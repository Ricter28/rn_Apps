import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
if (!__DEV__) {
  Object.keys(console).forEach(function (key) {
    console[key] = function () { };
  });
}

AppRegistry.registerComponent(appName, () => App);
