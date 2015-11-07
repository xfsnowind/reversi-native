import React from 'react-native';
import GridSection from "./GridSection.react";
import Constants from "../constants/ReversiConstants";

const { StyleSheet, View, Text, } = React;

const StyleValues = Constants.get("Styles"),
      boardWidth = StyleValues.get("board_width"),
      styles = StyleSheet.create({
        "board__row": {
          flex: 1,
          flexDirection: "row",
          height: boardWidth / 9,
        },
        "board__y_marker": {
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: "row",
          width:  boardWidth / 9,
        }
      });

const RowSection = React.createClass({

  render: function() {
    let columnItems = this.props.row.map((grid) => {
          return <GridSection grid={grid}
                              key={grid.get("row") + ", " + grid.get("col")}/>;
        });

    return (
      <View style={styles.board__row}>
        <View style={styles.board__y_marker}>
          <Text>{this.props.id}</Text>
        </View>
        {columnItems}
      </View>
    );
  }
});

export default RowSection;
