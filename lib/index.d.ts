import { ITask, IAssertOption, IEnvOption, IContextDefine, ITaskContext, ITaskConfig } from 'development-core';
export * from './NodeTaskOption';
export declare class NodeContextDefine implements IContextDefine {
    loadConfig(option: IAssertOption, env: IEnvOption): ITaskConfig;
    setContext(ctx: ITaskContext): void;
    tasks(context: ITaskContext): Promise<ITask[]>;
}
