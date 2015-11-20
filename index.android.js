'use strict';

import React from 'react-native';
import ReversiApp from "./src/js/components/ReversiApp.react";

let {
  AppRegistry,
  Text,
  View,
} = React;

AppRegistry.registerComponent('reversi_native', () => ReversiApp);
