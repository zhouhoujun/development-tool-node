/// <reference types="mocha"/>
import * as _ from 'lodash';
import { ITask, ITaskConfig, IEnvOption, ITaskOption, ITaskDefine, taskdefine } from 'development-core';

export * from './NodeTaskOption';

import { NodeDynamicTasks } from './tasks/nodeDefaultTask';

@taskdefine
export class Define implements ITaskDefine {
    loadConfig(option: ITaskOption, env: IEnvOption): ITaskConfig {
        // register default asserts.
        option.asserts = _.extend({
            ts: { loader: 'development-assert-ts' }
        }, option.asserts);


        return <ITaskConfig>{
            env: env,
            option: option
        }
    }

    loadTasks(config: ITaskConfig): Promise<ITask[]> {
        return config.findTasks(NodeDynamicTasks)
    }
}
