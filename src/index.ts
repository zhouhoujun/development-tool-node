/// <reference types="mocha"/>
import * as _ from 'lodash';
import { ITaskConfig, IEnvOption, IDynamicTasks, Operation, ITaskOption, ITaskDefine, taskdefine, dynamicTask } from 'development-core';

import tasks from './task';

export * from './NodeTaskOption';

@dynamicTask
export class NodeDynamicTasks implements IDynamicTasks {
    tasks() {
        return tasks.nodeDynamicTasks;
    }
}

@taskdefine()
export class Define implements ITaskDefine {
    loadConfig(oper: Operation, option: ITaskOption, env: IEnvOption): ITaskConfig {
        // register default asserts.
        option.asserts = _.extend({
            ts: { loader: tasks.tsDynamicTasks }
        }, option.asserts);


        return <ITaskConfig>{
            oper: oper,
            env: env,
            option: option
        }
    }
}
