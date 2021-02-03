let globalConfig: Object = {}
const mapListenerAfterChange = new Map<Function, Function>()
export function onConfigChanged(listener: () => void) {
    mapListenerAfterChange.set(listener, listener)
}
export function offConfigChanged(listener: () => void) {
    mapListenerAfterChange.delete(listener)
}
function emitConfigChanged() {
    for (const listener of mapListenerAfterChange.values()) {
        listener()
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
    emitConfigChanged()
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
    emitConfigChanged()
    return result
}
export function deleteConfig(label: string) {
    delete globalConfig[label]
    emitConfigChanged()
}
export function loadConfig(config: Object) {
    globalConfig = config
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
