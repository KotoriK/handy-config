"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBehaviour = exports.saveDefaultConfigToFile = exports.saveConfigToFile = exports.loadConfigFromFile = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const config_1 = require("./config");
let CONFIG_PATH = '';
function handleLoadError(e) {
    if (process.env.NODE_ENV !== "production") {
        console.groupCollapsed('CONFIG_LOAD_ERROR');
        console.error(e);
        console.error('Unable to load config file. Using default.');
        console.groupEnd();
    }
    return '{}'; //use default config
}
function _loadConfigFile(configPath) {
    try {
        const path = path_1.resolve(configPath);
        const str = fs_1.readFileSync(path, { flag: 'a+', encoding: 'utf-8' });
        return str;
    }
    catch (e) {
        return handleLoadError(e);
    }
}
/**
 * 从指定路径加载配置文件
 *
 * @author KotoriK
 * @export
 * @param configPath
 * @returns
 */
function loadConfigFromFile(configPath) {
    CONFIG_PATH = configPath;
    const newConfig = JSON.parse(_loadConfigFile(configPath));
    config_1.loadConfig(newConfig);
}
exports.loadConfigFromFile = loadConfigFromFile;
const _save = (path, content) => new Promise((resolve, reject) => {
    try {
        fs_1.writeFile(path, content, { encoding: 'utf-8' }, () => {
            resolve(true);
            console.log('Save complete');
        });
    }
    catch (e) {
        reject(e);
    }
});
/**
 * 保存设置到指定的位置
 *
 * @author KotoriK
 * @export
 * @param configPath 可选，默认为loadConfig的文件位置
 * @returns
 */
function saveConfigToFile(configPath) {
    const path = configPath ?? CONFIG_PATH;
    return new Promise((resolve, reject) => {
        const oldConfig = _loadConfigFile(path);
        const newConfig = JSON.stringify(config_1.getGlobalConfig());
        if (oldConfig == newConfig) {
            console.log('Config Save skipped because nothing change.');
            resolve(true);
        }
        else {
            _save(path, newConfig).then(resolve, reject);
        }
    });
}
exports.saveConfigToFile = saveConfigToFile;
function saveDefaultConfigToFile(configPath) {
    const path = configPath ?? CONFIG_PATH;
    return _save(path, JSON.stringify(config_1.getDefaultConfig()));
}
exports.saveDefaultConfigToFile = saveDefaultConfigToFile;
function setBehaviour(tag, value) {
    switch (tag) {
        case 'autosave':
            value ? config_1.onConfigChanged(saveConfigToFile) : config_1.offConfigChanged(saveConfigToFile);
            break;
        default:
            throw new Error('Behaviour not found');
    }
}
exports.setBehaviour = setBehaviour;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvZnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkJBQTRDO0FBQzVDLCtCQUE4QjtBQUM5QixxQ0FBMkc7QUFFM0csSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFBO0FBRXBCLFNBQVMsZUFBZSxDQUFDLENBQUM7SUFDdEIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLEVBQUU7UUFDdkMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1FBQzNDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDaEIsT0FBTyxDQUFDLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFBO1FBQzNELE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQTtLQUNyQjtJQUNELE9BQU8sSUFBSSxDQUFBLENBQUEsb0JBQW9CO0FBQ25DLENBQUM7QUFDRCxTQUFTLGVBQWUsQ0FBQyxVQUFrQjtJQUN2QyxJQUFJO1FBQ0EsTUFBTSxJQUFJLEdBQUcsY0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBQ2hDLE1BQU0sR0FBRyxHQUFHLGlCQUFZLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtRQUNqRSxPQUFPLEdBQUcsQ0FBQTtLQUNiO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDUixPQUFPLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUM1QjtBQUNMLENBQUM7QUFDRDs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0Isa0JBQWtCLENBQUMsVUFBa0I7SUFDakQsV0FBVyxHQUFHLFVBQVUsQ0FBQTtJQUN4QixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFBO0lBQ3pELG1CQUFVLENBQUMsU0FBUyxDQUFDLENBQUE7QUFDekIsQ0FBQztBQUpELGdEQUlDO0FBQ0QsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFZLEVBQUUsT0FBZSxFQUFFLEVBQUUsQ0FDNUMsSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDbEMsSUFBSTtRQUNBLGNBQVMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLEdBQUcsRUFBRTtZQUNqRCxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ2hDLENBQUMsQ0FBQyxDQUFBO0tBQ0w7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNaO0FBQ0wsQ0FBQyxDQUFDLENBQUE7QUFFTjs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0IsZ0JBQWdCLENBQUMsVUFBbUI7SUFDaEQsTUFBTSxJQUFJLEdBQUcsVUFBVSxJQUFJLFdBQVcsQ0FBQTtJQUN0QyxPQUFPLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFDLE1BQU0sRUFBRSxFQUFFO1FBQ3hDLE1BQU0sU0FBUyxHQUFHLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN2QyxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUFlLEVBQUUsQ0FBQyxDQUFBO1FBQ25ELElBQUksU0FBUyxJQUFJLFNBQVMsRUFBRTtZQUN4QixPQUFPLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxDQUFDLENBQUE7WUFDMUQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1NBQ2hCO2FBQUk7WUFDRCxLQUFLLENBQUMsSUFBSSxFQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUMsTUFBTSxDQUFDLENBQUE7U0FDN0M7SUFDTCxDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUM7QUFaRCw0Q0FZQztBQUNELFNBQWdCLHVCQUF1QixDQUFDLFVBQW1CO0lBQ3ZELE1BQU0sSUFBSSxHQUFHLFVBQVUsSUFBSSxXQUFXLENBQUE7SUFDdEMsT0FBTyxLQUFLLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxTQUFTLENBQUMseUJBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUE7QUFFekQsQ0FBQztBQUpELDBEQUlDO0FBQ0QsU0FBZ0IsWUFBWSxDQUFDLEdBQWUsRUFBRSxLQUFjO0lBQ3hELFFBQVEsR0FBRyxFQUFFO1FBQ1QsS0FBSyxVQUFVO1lBQ1gsS0FBSyxDQUFDLENBQUMsQ0FBQyx3QkFBZSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLHlCQUFnQixDQUFDLGdCQUFnQixDQUFDLENBQUE7WUFDOUUsTUFBSztRQUNUO1lBQ0ksTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxDQUFBO0tBQzdDO0FBQ0wsQ0FBQztBQVJELG9DQVFDIn0=