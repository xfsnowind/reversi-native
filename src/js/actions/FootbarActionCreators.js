import Constants from "../constants/ReversiConstants";
import Dispatcher from "../dispatcher/ReversiDispatcher";

const ActionTypes = Constants.get("ActionTypes");

export default {
    startGame: function() {
        Dispatcher.dispatch({
            "type": ActionTypes.get("START_THREAD")
        });
    },

    regret: function() {
        Dispatcher.dispatch({
            "type": ActionTypes.get("REGRET_THREAD")
        });
    }
};

