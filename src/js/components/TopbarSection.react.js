import React from 'react-native';
import Immutable from 'immutable';
import BoardStore from "../stores/BoardStore";
import FlipperSection from "./FlipperSection.react";
import Constants from "../constants/ReversiConstants";

const { StyleSheet, Text, View } = React,
      StyleValues = Constants.get("Styles"),
      GridStatus = Constants.get("GridStatus"),
      boardWidth = StyleValues.get("board_width"),
      boardMargin = StyleValues.get("board_margin"),

      styles = StyleSheet.create({
        "topbar": {
          marginTop: 40,
          marginLeft: boardMargin + boardWidth / 9,
          marginRight: boardMargin,
          height: boardWidth * 2 / 9,
          width:  boardWidth * 8 / 9,
        },
        "topbar__row": {
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
          height: boardWidth / 9,
        },
        "topbar__grid": {
          width:  boardWidth / 9,
          height: boardWidth / 9,
        },
        "topbar__text": {
          justifyContent: "center",
          alignItems: "center",
        }
      });

function getStateFromStores() {
    return {data: Immutable.Map({
        "numWhite": BoardStore.getNumberPieces()[0],
        "numBlack": BoardStore.getNumberPieces()[1],
        "player": BoardStore.getPlayer(),
        "gameOver": BoardStore.gameOver(),
    })};
}

const TopbarSection = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        BoardStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        BoardStore.removeChangeListener(this._onChange);
    },

    render: function() {
        let numWhite = this.state.data.get("numWhite"),
            numBlack = this.state.data.get("numBlack"),
            player = this.state.data.get("player"),
            gameOver = this.state.data.get("gameOver"),
            middleText;

        if (gameOver) {
            if (numWhite > numBlack) {
                player = GridStatus.get("WHITE");
            } else {
                player = GridStatus.get("BLACK");
            }

            middleText = "Winner";
        } else {
            middleText = "Current Player";
        }

        return (
            <View style={styles.topbar}>
              <View style={styles.topbar__row}>
                <View style={styles.topbar__grid}>
                  <FlipperSection player={"WHITE"}/>
                </View>
                <View style={[styles.topbar__grid,
                              styles.topbar__text,
                              {width: boardWidth * 3 / 9}]}>
                  <Text>{middleText}</Text>
                </View>
                <View style={styles.topbar__grid}>
                  <FlipperSection player={"BLACK"}/>
                </View>
              </View>
              <View style={styles.topbar__row}>
                <View style={[styles.topbar__grid, styles.topbar__text]}>
                  <Text>{numWhite}</Text>
                </View>
                <View style={styles.topbar__grid}>
                  <FlipperSection player={player} />
                </View>
                <View style={[styles.topbar__grid, styles.topbar__text]}>
                  <Text>{numBlack}</Text>
                </View>
              </View>
            </View>
        );
    },

    _onChange: function() {
        this.setState(getStateFromStores());
    }
});

export default TopbarSection;
