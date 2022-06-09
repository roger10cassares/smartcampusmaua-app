/**
 * @format
 */

import { AppRegistry } from 'react-native';
// import { App } from './src/screens';
import { RootScreen } from './src/screens/RootScreen';

import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => RootScreen);
