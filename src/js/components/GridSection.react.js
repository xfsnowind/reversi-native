import React from 'react-native';
import Immutable from 'immutable';
import Constants from "../constants/ReversiConstants";
import PlayerActionCreators from "../actions/PlayerActionCreators";
import PieceSection from "./PieceSection.react";

const { StyleSheet, View, Text } = React,
      StyleValues = Constants.get("Styles"),
      boardWidth = StyleValues.get("board_width"),
      border = StyleValues.get("piece_border"),
      AVAILABLE = Constants.get("GridStatus").get("AVAILABLE");

const GridSection = React.createClass({

    render: function() {
        let baseStyle = {borderWidth: border,
                         borderStyle: "solid",
                         borderColor: "black",
                         width:  boardWidth / 9,
            },
            style = {backgroundColor: "#2aa198"};

        if (Immutable.is(this.props.grid.get("value"), AVAILABLE)) {
            style = {backgroundColor: "#93a1a1"};
        }

        return (
            <View style={[baseStyle, style]}>
                <PieceSection player={this.props.grid.get("value")} />
            </View >
        );
    },

    _onClick: function(event) {
        if (Immutable.is(this.props.grid.get("value"), AVAILABLE)) {
            PlayerActionCreators.clickThread(this.props.grid);
        }
    }
});

export default GridSection;
