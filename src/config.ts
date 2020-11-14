import Path from 'path'
import fs from 'fs'

let globalConfig: Object = {}
let BEHAVIOUR_AUTOSAVE = true
let CONFIG_PATH = ''
function _loadConfigFile(configPath: string) {
    const path = Path.resolve(configPath)
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
    CONFIG_PATH = configPath
    globalConfig = JSON.parse(_loadConfigFile(configPath))
    return globalConfig
}
/**
 * 保存设置到指定的位置
 *
 * @author KotoriK
 * @export
 * @param configPath 可选，默认为loadConfig的文件位置
 * @returns 
 */
export function saveConfig(configPath?: string) {
    const path = configPath ?? CONFIG_PATH
    return new Promise<true>((resolve, reject) => {
        const oldConfig = _loadConfigFile(path)
        const newConfig = JSON.stringify(globalConfig)
        if (oldConfig == newConfig) {
            console.log('Config Save skipped because nothing change.')
            resolve(true)
            return
        }
        try {
            fs.writeFile(path, newConfig, { encoding: 'utf-8' }, () => {
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
    if (BEHAVIOUR_AUTOSAVE) saveConfig()
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
    const result = Object.assign(globalConfig[label], newConfig)
    if (BEHAVIOUR_AUTOSAVE) {
        saveConfig()
    }
    return result
}
export function deleteConfig(label: string) {
    delete globalConfig[label]
    if (BEHAVIOUR_AUTOSAVE) {
        saveConfig()
    }
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
export function setBehaviour(tag: 'autosave', value: boolean) {
    switch (tag) {
        case 'autosave':
            BEHAVIOUR_AUTOSAVE = value
            break
        default:
            throw new Error('Behaviour not found')
    }
}