import Path from 'path'
import fs from 'fs/promises'
export enum ConfigType {
    notSpecified, online, local,
}
const httpReg = /^http(s)?:\/\//
let globalConfig: Object = {}
let configType: ConfigType = ConfigType.notSpecified

async function _loadConfigFile(configPath: string) {
    const isHTTP = configPath.match(httpReg)//检查链接是否是HTTP链接
    if (isHTTP) {
        const path = configPath
        configType = ConfigType.online
        return await fetch(path).then((resp) => {
            if (resp.ok) {
                return resp.text().then((v) => { return v }
                )
            } else {
                return handleLoadError(new Error(`HTTP ${resp.status}:${resp.statusText}`))
            }
        }, (reason) => { return handleLoadError(reason) })
    } else {
        const path = Path.normalize(configPath)
        configType = ConfigType.local
        return await fs.readFile(path,{flag:'a+'}).then((value) => {
            try {
                return value.toString()
            } catch (e) {
                return handleLoadError(e)
            }
        }, (reason) => { return handleLoadError(reason) })
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
export async function loadConfig(configPath: string) {
    globalConfig = JSON.parse(await _loadConfigFile(configPath))
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
export async function saveConfig(configPath: string) {
    if (configType == ConfigType.local) {
        const oldConfig = await _loadConfigFile(configPath)
        const newConfig = JSON.stringify(globalConfig)
        if (oldConfig == newConfig) {
            console.log('Config Save skipped because nothing change.')
            return
        }
        return await fs.writeFile(configPath, newConfig, { encoding: 'utf-8' })
    } else {
        if (process.env.NODE_ENV !== "production") {
            console.log('Cant save config. Because' + ConfigType[configType])
        }
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
export function useConfig<T>(label: string, defaultConfig: T): T {
    if (!globalConfig[label]) globalConfig[label] = defaultConfig
    return globalConfig[label]
}

/**
 * 设置配置项
 *
 * @author KotoriK
 * @export
 * @param label
 * @param newConfig
 * @returns
 */
export function setConfig(label: string, newConfig: Object) {
    return Object.assign(globalConfig[label], newConfig)
}

/**
 * 获取一份当前配置的复制
 *
 * @author KotoriK
 * @export
 * @returns
 */
export function getGlobalConfig(){
    return {...globalConfig}
}