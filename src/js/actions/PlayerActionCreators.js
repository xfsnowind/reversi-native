import Constants from "../constants/ReversiConstants";
import Dispatcher from "../dispatcher/ReversiDispatcher";

const ActionTypes = Constants.get("ActionTypes");

export default {
    clickThread: function(pos) {
        Dispatcher.dispatch({
            "type": ActionTypes.get("CLICK_THREAD"),
            "content": pos
        });
    }
};

