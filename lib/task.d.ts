/// <reference types="gulp" />
/// <reference types="mocha" />
import { WatchEvent } from 'gulp';
import { Asserts, Src, IMap, TaskConfig, TaskOption, ITaskDefine } from 'development-tool';
export interface NodeBuildOption extends TaskOption {
    test?: Src;
    tsconfig?: string;
    ts?: Src;
    tsWatchChanged?(config: TaskConfig, event: WatchEvent): void;
    mochaOptions?: MochaSetupOptions;
    asserts?: IMap<Src | Asserts>;
    assertWatchChanged?(assert: string, config: TaskConfig, event: WatchEvent): void;
}
declare var _default: ITaskDefine;
export default _default;
