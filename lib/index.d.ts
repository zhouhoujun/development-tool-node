import { ITask, ITaskConfig, IEnvOption, ITaskOption, ITaskDefine } from 'development-core';
export * from './NodeTaskOption';
export declare class Define implements ITaskDefine {
    loadConfig(option: ITaskOption, env: IEnvOption): ITaskConfig;
    loadTasks(config: ITaskConfig): Promise<ITask[]>;
}
