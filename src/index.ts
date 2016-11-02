/// <reference types="mocha"/>
import * as _ from 'lodash';
import { ITask, findTasks, ITaskConfig, IEnvOption, Operation, ITaskOption, ITaskDefine, taskdefine } from 'development-core';

export * from './NodeTaskOption';

import * as asserts from './tasks/asserts';

import { NodeDynamicTasks } from './tasks/nodeDefaultTask';

@taskdefine
export class Define implements ITaskDefine {
    loadConfig(oper: Operation, option: ITaskOption, env: IEnvOption): ITaskConfig {
        // register default asserts.
        option.asserts = _.extend({
            ts: {
                loader: (config: ITaskConfig) => config.findTasks(asserts, { group: 'ts' })
            }
        }, option.asserts);


        return <ITaskConfig>{
            oper: oper,
            env: env,
            option: option
        }
    }

    loadTasks(config: ITaskConfig): Promise<ITask[]> {
        return config.findTasks(NodeDynamicTasks)
    }
}
