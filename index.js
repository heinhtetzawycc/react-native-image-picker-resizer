/**
 * @format
 */

import {AppRegistry} from 'react-native';
import test from './example1';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => test);
