import Immutable from "immutable";
import keyMirror from "keymirror";
import Dimensions from "Dimensions";

const screenWidth = Dimensions.get("window").width,
      boardMargin = 10,
      boardWidth = screenWidth - 2 * boardMargin;

export default Immutable.fromJS({
  "GridStatus": keyMirror({
    "WHITE":     null,
    "BLACK":     null,
    "AVAILABLE": null,
    "EMPTY":     null
  }),
  "Direction": {
    "UP":         {"row" : -1, "col" : 0},
    "DOWN":       {"row" :  1, "col" : 0},
    "LEFT":       {"row" :  0, "col" : -1},
    "RIGHT":      {"row" :  0, "col" : 1},
    "UP_LEFT":    {"row" : -1, "col" : -1},
    "UP_RIGHT":   {"row" : -1, "col" : 1},
    "DOWN_LEFT":  {"row" :  1, "col" : -1},
    "DOWN_RIGHT": {"row" :  1, "col" : 1}
  },
  "ActionTypes": keyMirror({
    "CLICK_THREAD":  null,
    "START_THREAD":  null,
    "REGRET_THREAD": null
  }),
  "Styles": {
    "board_width": boardWidth,
    "board_margin": boardMargin,
    "piece_border": 1,
  }
});
