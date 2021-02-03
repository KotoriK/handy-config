export declare function onConfigChanged(listener: () => void): void;
export declare function offConfigChanged(listener: () => void): void;
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
 * @param label 配置标签
 * @param newConfig 设置项的新值
 * @returns
 */
export declare function setConfig(label: string, newConfig: Object): any;
export declare function deleteConfig(label: string): void;
export declare function loadConfig(config: Object): void;
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
export declare const getDefaultConfig: (label?: string) => any;
//# sourceMappingURL=config.d.ts.map