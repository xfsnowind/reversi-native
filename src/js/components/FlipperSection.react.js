import React from 'react-native';
import Immutable from 'immutable';
import Constants from "../constants/ReversiConstants";

const { StyleSheet, View, Text } = React,
      StyleValues = Constants.get("Styles"),
      boardWidth = StyleValues.get("board_width"),
      border = StyleValues.get("piece_border"),
      margin = 1,
      pieceSize = boardWidth / 9 - 2 * margin - 2 * border,
      styles = StyleSheet.create({
        flipper: {
          // position: "absolute"
        },
        flipper__piece: {
          margin: margin,
          width:  pieceSize,
          height: pieceSize,
          borderRadius: pieceSize / 2,
        },
        flipper__white: {
          backgroundColor: "white",
        },
        flipper__black: {
          backgroundColor: "black",
        }
      });

const FlipperSection = React.createClass({

  render: function() {
    let player = this.props.player;
    console.log(player);
        // <View className={"flipper__piece flipper__black " + (player == "BLACK" ? "flipper__front" : "flipper__back")}> </View>

    return (
        <View style={[styles.flipper__piece,
                      player == "WHITE" ? styles.flipper__white : styles.flipper__black]} />
    );
  }
});

export default FlipperSection;
