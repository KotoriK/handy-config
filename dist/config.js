"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobalConfig = exports.setConfig = exports.useConfig = exports.saveConfig = exports.loadConfig = exports.ConfigType = void 0;
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
var ConfigType;
(function (ConfigType) {
    ConfigType[ConfigType["notSpecified"] = 0] = "notSpecified";
    ConfigType[ConfigType["online"] = 1] = "online";
    ConfigType[ConfigType["local"] = 2] = "local";
})(ConfigType = exports.ConfigType || (exports.ConfigType = {}));
const httpReg = /^http(s)?:\/\//;
let globalConfig = {};
let configType = ConfigType.notSpecified;
async function _loadConfigFile(configPath) {
    const isHTTP = configPath.match(httpReg); //检查链接是否是HTTP链接
    if (isHTTP) {
        const path = configPath;
        configType = ConfigType.online;
        return await fetch(path).then((resp) => {
            if (resp.ok) {
                return resp.text().then((v) => { return v; });
            }
            else {
                return handleLoadError(new Error(`HTTP ${resp.status}:${resp.statusText}`));
            }
        }, (reason) => { return handleLoadError(reason); });
    }
    else {
        const path = path_1.default.normalize(configPath);
        configType = ConfigType.local;
        return await promises_1.default.readFile(path).then((value) => {
            try {
                return value.toString();
            }
            catch (e) {
                return handleLoadError(e);
            }
        }, (reason) => { return handleLoadError(reason); });
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
async function loadConfig(configPath) {
    globalConfig = JSON.parse(await _loadConfigFile(configPath));
    return globalConfig;
}
exports.loadConfig = loadConfig;
/**
 * 保存设置到原来的位置
 *
 * @author KotoriK
 * @export
 * @param configPath
 * @returns
 */
async function saveConfig(configPath) {
    if (configType == ConfigType.local) {
        const oldConfig = await _loadConfigFile(configPath);
        const newConfig = JSON.stringify(globalConfig);
        if (oldConfig == newConfig) {
            console.log('Config Save skipped because nothing change.');
            return;
        }
        return await promises_1.default.writeFile(configPath, newConfig, { encoding: 'utf-8' });
    }
    else {
        if (process.env.NODE_ENV !== "production") {
            console.log('Cant save config. Because' + ConfigType[configType]);
        }
    }
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
    return globalConfig[label];
}
exports.useConfig = useConfig;
/**
 * 设置配置项
 *
 * @author KotoriK
 * @export
 * @param label
 * @param newConfig
 * @returns
 */
function setConfig(label, newConfig) {
    return Object.assign(globalConfig[label], newConfig);
}
exports.setConfig = setConfig;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnREFBdUI7QUFDdkIsMkRBQTRCO0FBQzVCLElBQVksVUFFWDtBQUZELFdBQVksVUFBVTtJQUNsQiwyREFBWSxDQUFBO0lBQUUsK0NBQU0sQ0FBQTtJQUFFLDZDQUFLLENBQUE7QUFDL0IsQ0FBQyxFQUZXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBRXJCO0FBQ0QsTUFBTSxPQUFPLEdBQUcsZ0JBQWdCLENBQUE7QUFDaEMsSUFBSSxZQUFZLEdBQVcsRUFBRSxDQUFBO0FBQzdCLElBQUksVUFBVSxHQUFlLFVBQVUsQ0FBQyxZQUFZLENBQUE7QUFFcEQsS0FBSyxVQUFVLGVBQWUsQ0FBQyxVQUFrQjtJQUM3QyxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBLENBQUEsZUFBZTtJQUN2RCxJQUFJLE1BQU0sRUFBRTtRQUNSLE1BQU0sSUFBSSxHQUFHLFVBQVUsQ0FBQTtRQUN2QixVQUFVLEdBQUcsVUFBVSxDQUFDLE1BQU0sQ0FBQTtRQUM5QixPQUFPLE1BQU0sS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ25DLElBQUksSUFBSSxDQUFDLEVBQUUsRUFBRTtnQkFDVCxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxHQUFHLE9BQU8sQ0FBQyxDQUFBLENBQUMsQ0FBQyxDQUMxQyxDQUFBO2FBQ0o7aUJBQU07Z0JBQ0gsT0FBTyxlQUFlLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUE7YUFDOUU7UUFDTCxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVB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