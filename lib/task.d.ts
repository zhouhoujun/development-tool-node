/// <reference types="mocha" />
import { Src, IMap, TaskOption, ITaskDefine } from 'development-tool';
export interface NodeBuildOption extends TaskOption {
    test?: Src;
    tsconfig?: string;
    ts?: Src;
    mochaOptions?: MochaSetupOptions;
    asserts?: IMap<Src>;
}
declare var _default: ITaskDefine;
export default _default;
