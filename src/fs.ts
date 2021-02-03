import { readFileSync, writeFile } from 'fs'
import { resolve } from 'path'
import { getGlobalConfig, loadConfig, offConfigChanged, onConfigChanged } from './config'

let CONFIG_PATH = ''

function handleLoadError(e) {
    if (process.env.NODE_ENV !== "production") {
        console.groupCollapsed('CONFIG_LOAD_ERROR')
        console.error(e)
        console.error('Unable to load config file. Using default.')
        console.groupEnd()
    }
    return '{}'//use default config
}
function _loadConfigFile(configPath: string) {
    try {
        const path = resolve(configPath)
        const str = readFileSync(path, { flag: 'a+', encoding: 'utf-8' })
        return str
    } catch (e) {
        return handleLoadError(e)
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
export function loadConfigFromFile(configPath: string) {
    CONFIG_PATH = configPath
    const newConfig = JSON.parse(_loadConfigFile(configPath))
    loadConfig(newConfig)
}

/**
 * 保存设置到指定的位置
 *
 * @author KotoriK
 * @export
 * @param configPath 可选，默认为loadConfig的文件位置
 * @returns 
 */
export function saveConfigToFile(configPath?: string) {
    const path = configPath ?? CONFIG_PATH
    return new Promise<true>((resolve, reject) => {
        const oldConfig = _loadConfigFile(path)
        const newConfig = JSON.stringify(getGlobalConfig())
        if (oldConfig == newConfig) {
            console.log('Config Save skipped because nothing change.')
            resolve(true)
            return
        }
        try {
            writeFile(path, newConfig, { encoding: 'utf-8' }, () => {
                resolve(true)
                console.log('Save complete')
            })
        } catch (e) {
            reject(e)
        }
    })
}
export function setBehaviour(tag: 'autosave', value: boolean) {
    switch (tag) {
        case 'autosave':
            value ? onConfigChanged(saveConfigToFile) : offConfigChanged(saveConfigToFile)
            break
        default:
            throw new Error('Behaviour not found')
    }
}