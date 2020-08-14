export declare enum ConfigType {
    notSpecified = 0,
    online = 1,
    local = 2
}
/**
 * 从指定路径加载配置文件
 *
 * @author KotoriK
 * @export
 * @param configPath
 * @returns
 */
export declare function loadConfig(configPath: string): Promise<Object>;
/**
 * 保存设置到原来的位置
 *
 * @author KotoriK
 * @export
 * @param configPath
 * @returns
 */
export declare function saveConfig(configPath: string): Promise<void>;
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
export declare function useConfig<T>(label: string, defaultConfig: T): T;
/**
 * 设置配置项
 *
 * @author KotoriK
 * @export
 * @param label
 * @param newConfig
 * @returns
 */
export declare function setConfig(label: string, newConfig: Object): any;
/**
 * 获取一份当前配置的复制
 *
 * @author KotoriK
 * @export
 * @returns
 */
export declare function getGlobalConfig(): {
    constructor: Function;
    toString(): string;
    toLocaleString(): string;
    valueOf(): Object;
    hasOwnProperty(v: string | number | symbol): boolean;
    isPrototypeOf(v: Object): boolean;
    propertyIsEnumerable(v: string | number | symbol): boolean;
};
//# sourceMappingURL=config.d.ts.map