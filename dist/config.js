"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultConfig = exports.getGlobalConfig = exports.loadConfig = exports.deleteConfig = exports.setConfig = exports.useConfig = exports.offConfigChanged = exports.onConfigChanged = void 0;
let Global_Config = {};
let Default_Config = {};
const mapListenerAfterChange = new Map();
function onConfigChanged(listener) {
    mapListenerAfterChange.set(listener, listener);
}
exports.onConfigChanged = onConfigChanged;
function offConfigChanged(listener) {
    mapListenerAfterChange.delete(listener);
}
exports.offConfigChanged = offConfigChanged;
function emitConfigChanged() {
    for (const listener of mapListenerAfterChange.values()) {
        listener();
    }
}
/**
 * 分模块读取配置文件，若通过label找不到配置，则返回传入的默认值
 *
 * @author KotoriK
 * @export
 * @template T 配置类型
 * @param label 配置标签，应当唯一
 * @param defaultConfig 配置默认值
 * @returns
 */
function useConfig(label, defaultConfig) {
    Default_Config[label] = defaultConfig;
    if (!Global_Config[label]) {
        Global_Config[label] = defaultConfig;
        emitConfigChanged();
    }
    return Global_Config[label];
}
exports.useConfig = useConfig;
/**
 * 设置配置项
 *
 * @author KotoriK
 * @export
 * @param label 配置标签
 * @param newConfig 设置项的新值
 * @returns
 */
function setConfig(label, newConfig) {
    const result = Object.assign(Global_Config[label], newConfig);
    emitConfigChanged();
    return result;
}
exports.setConfig = setConfig;
function deleteConfig(label) {
    delete Global_Config[label];
    emitConfigChanged();
}
exports.deleteConfig = deleteConfig;
function loadConfig(config) {
    Global_Config = config;
}
exports.loadConfig = loadConfig;
/**
 * 获取一份当前配置的复制
 *
 * @author KotoriK
 * @export
 * @returns
 */
function getGlobalConfig() {
    return { ...Global_Config };
}
exports.getGlobalConfig = getGlobalConfig;
const getDefaultConfig = (label) => label ? { ...Default_Config[label] } : { ...Default_Config };
exports.getDefaultConfig = getDefaultConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxJQUFJLGFBQWEsR0FBVyxFQUFFLENBQUE7QUFDOUIsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFBO0FBQ3ZCLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSxHQUFHLEVBQXNCLENBQUE7QUFDNUQsU0FBZ0IsZUFBZSxDQUFDLFFBQW9CO0lBQ2hELHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUE7QUFDbEQsQ0FBQztBQUZELDBDQUVDO0FBQ0QsU0FBZ0IsZ0JBQWdCLENBQUMsUUFBb0I7SUFDakQsc0JBQXNCLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0FBQzNDLENBQUM7QUFGRCw0Q0FFQztBQUNELFNBQVMsaUJBQWlCO0lBQ3RCLEtBQUssTUFBTSxRQUFRLElBQUksc0JBQXNCLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDcEQsUUFBUSxFQUFFLENBQUE7S0FDYjtBQUNMLENBQUM7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSCxTQUFnQixTQUFTLENBQUksS0FBYSxFQUFFLGFBQWdCO0lBQ3hELGNBQWMsQ0FBQyxLQUFLLENBQUMsR0FBRyxhQUFhLENBQUE7SUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN2QixhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsYUFBYSxDQUFBO1FBQ3BDLGlCQUFpQixFQUFFLENBQUE7S0FDdEI7SUFDRCxPQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtBQUMvQixDQUFDO0FBUEQsOEJBT0M7QUFFRDs7Ozs7Ozs7R0FRRztBQUNILFNBQWdCLFNBQVMsQ0FBQyxLQUFhLEVBQUUsU0FBaUI7SUFDdEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUE7SUFDN0QsaUJBQWlCLEVBQUUsQ0FBQTtJQUNuQixPQUFPLE1BQU0sQ0FBQTtBQUNqQixDQUFDO0FBSkQsOEJBSUM7QUFDRCxTQUFnQixZQUFZLENBQUMsS0FBYTtJQUN0QyxPQUFPLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUMzQixpQkFBaUIsRUFBRSxDQUFBO0FBQ3ZCLENBQUM7QUFIRCxvQ0FHQztBQUNELFNBQWdCLFVBQVUsQ0FBQyxNQUFjO0lBQ3JDLGFBQWEsR0FBRyxNQUFNLENBQUE7QUFDMUIsQ0FBQztBQUZELGdDQUVDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsZUFBZTtJQUMzQixPQUFPLEVBQUUsR0FBRyxhQUFhLEVBQUUsQ0FBQTtBQUMvQixDQUFDO0FBRkQsMENBRUM7QUFDTSxNQUFNLGdCQUFnQixHQUFHLENBQUMsS0FBYyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLGNBQWMsRUFBRSxDQUFBO0FBQW5HLFFBQUEsZ0JBQWdCLG9CQUFtRiJ9