"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBehaviour = exports.getGlobalConfig = exports.deleteConfig = exports.setConfig = exports.useConfig = exports.saveConfig = exports.loadConfig = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let globalConfig = {};
let BEHAVIOUR_AUTOSAVE = true;
let CONFIG_PATH = '';
function _loadConfigFile(configPath) {
    const path = path_1.default.resolve(configPath);
    const buf = fs_1.default.readFileSync(path, { flag: 'a+' });
    try {
        return buf.toString();
    }
    catch (e) {
        return handleLoadError(e);
    }
}
function handleLoadError(e) {
    if (process.env.NODE_ENV !== "production") {
        console.groupCollapsed('CONFIG_LOAD_ERROR');
        console.error(e);
        console.error('Unable to load config file. Using default.');
        console.groupEnd();
    }
    return '{}'; //use default config
}
/**
 * 从指定路径加载配置文件
 *
 * @author KotoriK
 * @export
 * @param configPath
 * @returns
 */
function loadConfig(configPath) {
    CONFIG_PATH = configPath;
    globalConfig = JSON.parse(_loadConfigFile(configPath));
    return globalConfig;
}
exports.loadConfig = loadConfig;
/**
 * 保存设置到指定的位置
 *
 * @author KotoriK
 * @export
 * @param configPath 可选，默认为loadConfig的文件位置
 * @returns
 */
function saveConfig(configPath) {
    const path = configPath !== null && configPath !== void 0 ? configPath : CONFIG_PATH;
    return new Promise((resolve, reject) => {
        const oldConfig = _loadConfigFile(path);
        const newConfig = JSON.stringify(globalConfig);
        if (oldConfig == newConfig) {
            console.log('Config Save skipped because nothing change.');
            resolve(true);
            return;
        }
        try {
            fs_1.default.writeFile(path, newConfig, { encoding: 'utf-8' }, () => {
                resolve(true);
                console.log('Save complete');
            });
        }
        catch (e) {
            reject(e);
        }
    });
}
exports.saveConfig = saveConfig;
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
    if (!globalConfig[label])
        globalConfig[label] = defaultConfig;
    if (BEHAVIOUR_AUTOSAVE)
        saveConfig();
    return globalConfig[label];
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
    const result = Object.assign(globalConfig[label], newConfig);
    if (BEHAVIOUR_AUTOSAVE) {
        saveConfig();
    }
    return result;
}
exports.setConfig = setConfig;
function deleteConfig(label) {
    delete globalConfig[label];
    if (BEHAVIOUR_AUTOSAVE) {
        saveConfig();
    }
}
exports.deleteConfig = deleteConfig;
/**
 * 获取一份当前配置的复制
 *
 * @author KotoriK
 * @export
 * @returns
 */
function getGlobalConfig() {
    return { ...globalConfig };
}
exports.getGlobalConfig = getGlobalConfig;
function setBehaviour(tag, value) {
    switch (tag) {
        case 'autosave':
            BEHAVIOUR_AUTOSAVE = value;
            break;
        default:
            throw new Error('Behaviour not found');
    }
}
exports.setBehaviour = setBehaviour;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnREFBdUI7QUFDdkIsNENBQW1CO0FBRW5CLElBQUksWUFBWSxHQUFXLEVBQUUsQ0FBQTtBQUM3QixJQUFJLGtCQUFrQixHQUFHLElBQUksQ0FBQTtBQUM3QixJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUE7QUFDcEIsU0FBUyxlQUFlLENBQUMsVUFBa0I7SUFDdkMsTUFBTSxJQUFJLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNyQyxNQUFNLEdBQUcsR0FBRyxZQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0lBQ2pELElBQUk7UUFDQSxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQTtLQUN4QjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsT0FBTyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDNUI7QUFDTCxDQUFDO0FBQ0QsU0FBUyxlQUFlLENBQUMsQ0FBQztJQUN0QixJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLFlBQVksRUFBRTtRQUN2QyxPQUFPLENBQUMsY0FBYyxDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFDM0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNoQixPQUFPLENBQUMsS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUE7UUFDM0QsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFBO0tBQ3JCO0lBQ0QsT0FBTyxJQUFJLENBQUEsQ0FBQSxvQkFBb0I7QUFDbkMsQ0FBQztBQUNEOzs7Ozs7O0dBT0c7QUFDSCxTQUFnQixVQUFVLENBQUMsVUFBa0I7SUFDekMsV0FBVyxHQUFHLFVBQVUsQ0FBQTtJQUN4QixZQUFZLEdBQUcsSUFBSSxDQUFDLEtB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