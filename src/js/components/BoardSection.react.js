import React from 'react-native';
import Immutable from 'immutable';
import BoardStore from "../stores/BoardStore";
import SettingsStore from "../stores/SettingsStore";
import RowSection from "./RowSection.react";
import Constants from "../constants/ReversiConstants";

let { StyleSheet, View, Text, } = React;

const StyleValues = Constants.get("Styles"),
      boardWidth = StyleValues.get("board_width"),
      boardPadding = StyleValues.get("board_padding"),
      styles = StyleSheet.create({
        board: {
          marginTop: 100,
          marginHorizontal: boardPadding,
          width:  boardWidth,
          height: boardWidth,
        },
        "board__x_markers": {
          flex: 1,
          flexDirection: "row",
          height: boardWidth / 9,
        },
        "board__x_marker": {
          justifyContent: 'center',
          alignItems: 'center',
          height: boardWidth / 9,
          width: boardWidth / 9,
        }
      });

function getStateFromStores() {
  return {data: Immutable.Map({"board": BoardStore.getBoard()})};
}

const markers = "abcdefghijklmnopqrstuvwxyz";

const BoardSection = React.createClass({

  getInitialState: function () {
    return getStateFromStores();
  },

  componentDidMount: function () {
    BoardStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function () {
    BoardStore.removeChangeListener(this._onChange);
  },

  render: function () {
    let board = this.state.data.get("board"),
      rowColLength = SettingsStore.getRowColumnLength(),
      i = 0
        ,
      markerItems = markers.substring(0, rowColLength)
                           .split("")
                           .map((a) => {
                               return <View style={styles.board__x_marker} key={a}>
                                        <Text>{a.toUpperCase()}</Text>
                                      </View>;
                           }),
      rowListItems = board.map((row) => {
          i++;
          return <RowSection row={row} id={i} key={"row" + row.getIn([0, "row"])} />;
      })
    ;
    markerItems = [<Text style={styles.board__x_marker} key="EMPTY"> </Text>].concat(markerItems);

    return (
      <View style={styles.board}>
        <View style={styles.board__x_markers}>{markerItems}</View>
        {rowListItems}
      </View>
    );
  },

  _onChange: function () {
    this.setState(getStateFromStores());
  }
});

export default BoardSection;
