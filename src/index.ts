/// <reference types="mocha"/>
import * as _ from 'lodash';
import { Task, TaskConfig, EnvOption, Operation, TaskOption, ITaskDefine } from 'development-tool';

import tasks from './task';

export * from './NodeTaskOption';

export default <ITaskDefine>{
    moduleTaskConfig(oper: Operation, option: TaskOption, env: EnvOption): TaskConfig {
        // register default asserts.
        option.asserts = _.extend({
            ts: { loader: tasks.tsDynamicTasks }
        }, option.asserts);


        return <TaskConfig>{
            oper: oper,
            env: env,
            option: option
        }
    },

    moduleTaskLoader(config: TaskConfig): Promise<Task[]> {
        return Promise.resolve(config.dynamicTasks(tasks.nodeDynamicTasks));
    }
}
