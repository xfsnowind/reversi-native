'use strict';

import React from 'react-native';
import TopbarSection from "./TopbarSection.react";
// import FootbarSection from "./FootbarSection.react";
import BoardSection from "./BoardSection.react";

let { StyleSheet, View, Text, Component } = React;

class ReversiApp extends Component{
  render () {
              // <FootbarSection />
    return (<View style={{flex: 1}}>
              <TopbarSection />
              <BoardSection />
          </View>);
  }
};

export default ReversiApp;
