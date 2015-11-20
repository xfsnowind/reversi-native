'use strict';

import React from 'react-native';
import TopbarSection from "./TopbarSection.react";
import FootbarSection from "./FootbarSection.react";
import BoardSection from "./BoardSection.react";

const { StyleSheet, View, Text, Component } = React,
      styles = StyleSheet.create({
          "app": {
            backgroundColor: "#eee8d5",
          }});

class ReversiApp extends Component{
  render () {
    return (<View style={styles.app}>
              <TopbarSection />
              <BoardSection />
              <FootbarSection />
          </View>);
  }
};

export default ReversiApp;
