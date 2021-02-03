/**
 * 从指定路径加载配置文件
 *
 * @author KotoriK
 * @export
 * @param configPath
 * @returns
 */
export declare function loadConfigFromFile(configPath: string): void;
/**
 * 保存设置到指定的位置
 *
 * @author KotoriK
 * @export
 * @param configPath 可选，默认为loadConfig的文件位置
 * @returns
 */
export declare function saveConfigToFile(configPath?: string): Promise<true>;
export declare function saveDefaultConfigToFile(configPath?: string): Promise<true>;
export declare function setBehaviour(tag: 'autosave', value: boolean): void;
//# sourceMappingURL=fs.d.ts.map