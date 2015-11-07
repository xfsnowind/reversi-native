import React from 'react-native';
import Immutable from 'immutable';
import FlipperSection from "./FlipperSection.react";
import Constants from "../constants/ReversiConstants";

const { StyleSheet, View, Text } = React,
      GridStatus = Constants.get("GridStatus");

function hasPiece(value) {
  return Immutable.is(value, GridStatus.get("WHITE")) ||
         Immutable.is(value, GridStatus.get("BLACK"));
}

const PieceSection = React.createClass({

  render: function() {
    if (hasPiece(this.props.player)) {
      return (
          <FlipperSection player={this.props.player} />
      );
    } else {
      return false;
    }
  }
});

export default PieceSection;
