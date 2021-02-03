"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigFromArgv = void 0;
const { argv } = process;
function _parseItem(item) {
    const _item = item.split('=');
    if (_item.length > 1) {
        return [_item[0], _item.slice(1).join('=')];
    }
    else {
        return [_item[0], true];
    }
}
const getConfigFromArgv = () => Object.fromEntries(argv.map(_parseItem));
exports.getConfigFromArgv = getConfigFromArgv;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJndi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9hcmd2LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQU0sRUFBQyxJQUFJLEVBQUMsR0FBRyxPQUFPLENBQUE7QUFDdEIsU0FBUyxVQUFVLENBQUMsSUFBVztJQUMzQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQzdCLElBQUcsS0FBSyxDQUFDLE1BQU0sR0FBQyxDQUFDLEVBQUM7UUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7S0FDN0M7U0FBSTtRQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUMsSUFBSSxDQUFDLENBQUE7S0FDekI7QUFDTCxDQUFDO0FBQ00sTUFBTSxpQkFBaUIsR0FBQyxHQUFFLEVBQUUsQ0FBQSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQTtBQUE5RCxRQUFBLGlCQUFpQixxQkFBNkMifQ==