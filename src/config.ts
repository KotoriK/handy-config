import Path from 'path'
import fs from 'fs'

let globalConfig: Object = {}

function _loadConfigFile(configPath: string) {
    const path = Path.normalize(configPath)
    const buf = fs.readFileSync(path, { flag: 'a+' })
    try {
        return buf.toString()
    } catch (e) {
        return handleLoadError(e)
    }
}
function handleLoadError(e) {
    if (process.env.NODE_ENV !== "production") {
        console.groupCollapsed('CONFIG_LOAD_ERROR')
        console.error(e)
        console.error('Unable to load config file. Using default.')
        console.groupEnd()
    }
    return '{}'//use default config
}
/**
 * 从指定路径加载配置文件
 *
 * @author KotoriK
 * @export
 * @param configPath
 * @returns
 */
export function loadConfig(configPath: string) {
    globalConfig = JSON.parse(_loadConfigFile(configPath))
    return globalConfig
}

/**
 * 保存设置到原来的位置
 *
 * @author KotoriK
 * @export
 * @param configPath
 * @returns 
 */
export function saveConfig(configPath: string) {
    return new Promise<true>((resolve, reject) => {
        const oldConfig = _loadConfigFile(configPath)
        const newConfig = JSON.stringify(globalConfig)
        if (oldConfig == newConfig) {
            console.log('Config Save skipped because nothing change.')
            resolve(true)
            return
        }
        try {
            fs.writeFile(configPath, newConfig, { encoding: 'utf-8' }, () => {
                resolve(true)
                console.log('Save complete')
            })
        } catch (e) {
            reject(e)
        }
    })
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
export function useConfig<T>(label: string, defaultConfig: T): T {
    if (!globalConfig[label]) globalConfig[label] = defaultConfig
    return globalConfig[label]
}

/**
 * 设置配置项
 *
 * @author KotoriK
 * @export
 * @param label 配置标签
 * @param newConfig 设置项的新值
 * @returns
 */
export function setConfig(label: string, newConfig: Object) {
    return Object.assign(globalConfig[label], newConfig)
}
export function deleteConfig(label: string) {
    delete globalConfig[label]
}

/**
 * 获取一份当前配置的复制
 *
 * @author KotoriK
 * @export
 * @returns
 */
export function getGlobalConfig() {
    return { ...globalConfig }
}