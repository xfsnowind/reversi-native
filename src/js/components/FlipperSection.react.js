import React from 'react-native';
import Immutable from 'immutable';
import Constants from "../constants/ReversiConstants";

const { StyleSheet, View, Easing, Animated } = React,
      StyleValues = Constants.get("Styles"),
      boardWidth = StyleValues.get("board_width"),
      border = StyleValues.get("piece_border"),
      margin = 1,
      pieceSize = boardWidth / 9 - 2 * margin - 2 * border,
      styles = StyleSheet.create({
        flipper__piece: {
          position: "absolute",
          width:  pieceSize,
          height: pieceSize,
          margin: margin,
          borderRadius: pieceSize / 2,
          backfaceVisibility: "hidden",
        },
        flipper__front: {
          transform: [{rotateY: "0deg"}]
        },
        flipper__back: {
          transform: [{rotateY: "180deg"}]
        },
        flipper__white: {
          backgroundColor: "white",
        },
        flipper__black: {
          backgroundColor: "black",
        }
      });

const FlipperSection = React.createClass({

  getInitialState: function () {
    return {animationValue: new Animated.Value(0)};
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    return this.props.player != nextProps.player;
  },

  render: function () {
    let player = this.props.player,
        animationStyle = this.state.animationValue;

      return (
        <Animated.View style={{transform: [{rotateY: animationStyle.interpolate({
          inputRange:  [0, 1],
          outputRange: ["0deg", "180deg"]
        })}]}}>
          <View style={[styles.flipper__piece,
                        styles.flipper__white,
                        player == "WHITE" ?
                          styles.flipper__front : styles.flipper__back]} />
          <View style={[styles.flipper__piece,
                        styles.flipper__black,
                        player == "BLACK" ?
                          styles.flipper__front : styles.flipper__back]} />
        </Animated.View>
    );
  },

  componentWillUpdate: function () {
    let flipValue = this.state.animationValue._value == 1 ? 0 : 1;
    Animated.timing(this.state.animationValue, {
      duration: 800,
      toValue: flipValue,
    }).start();
  }
});

export default FlipperSection;
