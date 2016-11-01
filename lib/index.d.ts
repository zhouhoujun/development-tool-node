import { ITask, ITaskConfig, IEnvOption, Operation, ITaskOption, ITaskDefine } from 'development-core';
export * from './NodeTaskOption';
export declare class Define implements ITaskDefine {
    loadConfig(oper: Operation, option: ITaskOption, env: IEnvOption): ITaskConfig;
    loadTasks(config: ITaskConfig): Promise<ITask[]>;
}
