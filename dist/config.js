"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGlobalConfig = exports.deleteConfig = exports.setConfig = exports.useConfig = exports.saveConfig = exports.loadConfig = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
let globalConfig = {};
function _loadConfigFile(configPath) {
    const path = path_1.default.normalize(configPath);
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
    globalConfig = JSON.parse(_loadConfigFile(configPath));
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
function saveConfig(configPath) {
    return new Promise((resolve, reject) => {
        const oldConfig = _loadConfigFile(configPath);
        const newConfig = JSON.stringify(globalConfig);
        if (oldConfig == newConfig) {
            console.log('Config Save skipped because nothing change.');
            resolve(true);
            return;
        }
        try {
            fs_1.default.writeFile(configPath, newConfig, { encoding: 'utf-8' }, () => {
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
    return Object.assign(globalConfig[label], newConfig);
}
exports.setConfig = setConfig;
function deleteConfig(label) {
    delete globalConfig[label];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnREFBdUI7QUFDdkIsNENBQW1CO0FBR25CLElBQUksWUFBWSxHQUFXLEVBQUUsQ0FBQTtBQUU3QixTQUFTLGVBQWUsQ0FBQyxVQUFrQjtJQUN2QyxNQUFNLElBQUksR0FBRyxjQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ3ZDLE1BQU0sR0FBRyxHQUFHLFlBQUUsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7SUFDakQsSUFBSTtRQUNBLE9BQU8sR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFBO0tBQ3hCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixPQUFPLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUM1QjtBQUNMLENBQUM7QUFDRCxTQUFTLGVBQWUsQ0FBQyxDQUFDO0lBQ3RCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUFFO1FBQ3ZDLE9BQU8sQ0FBQyxjQUFjLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtRQUMzQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ2hCLE9BQU8sQ0FBQyxLQUFLLENBQUMsNENBQTRDLENBQUMsQ0FBQTtRQUMzRCxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUE7S0FDckI7SUFDRCxPQUFPLElBQUksQ0FBQSxDQUFBLG9CQUFvQjtBQUNuQyxDQUFDO0FBQ0Q7Ozs7Ozs7R0FPRztBQUNILFNBQWdCLFVBQVUsQ0FBQyxVQUFrQjtJQUN6QyxZQUFZLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQTtJQUN0RCxPQUFPLFlBQVksQ0FBQTtBQUN2QixDQUFDO0FBSEQsZ0NBR0M7QUFFRDs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsVUFBVSxDQUFDLFVBQWtCO0lBQ3pDLE9BQU8sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDekMsTUFBTSxTQUFTLEdBQUcsZUFBZSxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQzdDLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDOUMsSUFBSSxTQUFTLElBQUksU0FBUyxFQUFFO1lBQ3hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsNkNBQTZDLENBQUMsQ0FBQTtZQUMxRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDYixPQUFNO1NBQ1Q7UUFDRCxJQUFJO1lBQ0EsWUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRTtnQkFDNUQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO2dCQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7WUFDaEMsQ0FBQyxDQUFDLENBQUE7U0FDTDtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ1o7SUFDTCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFsQkQsZ0NBa0JDO0FBQ0Q7Ozs7Ozs7OztHQVNHO0FBQ0gsU0FBZ0IsU0FBUyxDQUFJLEtBQWEsRUFBRSxhQUFnQjtJQUN4RCxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUFFLFlBQVksQ0FBQyxLQUFLLENBQUMsR0FBRyxhQUFhLENBQUE7SUFDN0QsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDOUIsQ0FBQztBQUhELDhCQUdDO0FBRUQ7Ozs7Ozs7O0dBUUc7QUFDSCxTQUFnQixTQUFTLENBQUMsS0FBYSxFQUFFLFNBQWlCO0lBQ3RELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUE7QUFDeEQsQ0FBQztBQUZELDhCQUVDO0FBQ0QsU0FBZ0IsWUFBWSxDQUFDLEtBQWE7SUFDdEMsT0FBTyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDOUIsQ0FBQztBQUZELG9DQUVDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsU0FBZ0IsZUFBZTtJQUMzQixPQUFPLEVBQUUsR0FBRyxZQUFZLEVBQUUsQ0FBQTtBQUM5QixDQUFDO0FBRkQsMENBRUMifQ==