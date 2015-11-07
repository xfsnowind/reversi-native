import EventEmitter from 'events';
import assign from 'object-assign';

const _rowColLength = 8;

const SettingsStore = assign({}, EventEmitter.prototype, {
    getRowColumnLength: function () {
        return _rowColLength;
    }
});

export default SettingsStore;
