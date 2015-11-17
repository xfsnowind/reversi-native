import React from 'react-native';
import Immutable from 'immutable';
import FootbarActionCreators from "../actions/FootbarActionCreators";
import BoardStore from "../stores/BoardStore";
import Constants from "../constants/ReversiConstants";

const { StyleSheet, Text, View,
        TouchableHighlight, Platform,
        TouchableNativeFeedback } = React,
      StyleValues = Constants.get("Styles"),
      boardWidth = StyleValues.get("board_width"),
      boardMargin = StyleValues.get("board_margin"),

      styles = StyleSheet.create({
        "footbar": {
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          height: 40,
          marginTop: 20,
          marginLeft: boardMargin + boardWidth / 9,
          marginRight: boardMargin,
        },
        "footbar__right": {

        },
        "button": {
          height: 43,
          paddingHorizontal: 6,
          paddingVertical: 12,
          marginBottom: 0,
          borderWidth: 1,
          borderStyle: "solid",
          borderRadius: 4,
        },
        "button__disabled": {
          opacity: 0.65
        },
        "button__success": {
          backgroundColor: "#268bd2",
        },
        "button__danger": {
          backgroundColor: "#dc322f",
        }
      });
function getStateFromStores() {
    return {data: Immutable.Map({
        "canRegret": BoardStore.canRegret(),
        "gameOver": BoardStore.gameOver(),
    })};
}

var FootbarSection = React.createClass({

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
      var regretDisable = !this.state.data.get("canRegret"),
          gameOver = this.state.data.get("gameOver"),
          regretButton,
          TouchableElement = TouchableHighlight;

      if (Platform.OS === 'android') {
       TouchableElement = TouchableNativeFeedback;
      };

      if (regretDisable || gameOver) {
        regretButton = <TouchableElement style={[styles.button, styles.button__danger, styles.button__disabled, styles.footbar__right]}>
                         <Text>Regret</Text>
                       </TouchableElement>;
      } else {
        regretButton = <TouchableElement style={[styles.button, styles.button__danger, styles.footbar__right]} onPress={this._regret}>
                         <Text>Regret</Text>
                       </TouchableElement>;
      }

      return (
          <View style={styles.footbar}>
            <TouchableElement style={[styles.button, styles.button__success]} onPress={this._start}>
              <Text>New Game</Text>
            </TouchableElement>
            {regretButton}
          </View>
      );
    },

    _start: function() {
      FootbarActionCreators.startGame();
    },

    _regret: function() {
      FootbarActionCreators.regret();
    },

    _onChange: function() {
      this.setState(getStateFromStores());
    }
});

export default FootbarSection;
