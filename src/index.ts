/// <reference types="mocha"/>
import * as _ from 'lodash';
import { findTasks, ITaskConfig, IEnvOption, Operation, ITaskOption, ITaskDefine, taskdefine, dynamicTask } from 'development-core';

export * from './NodeTaskOption';

import { TsTasks } from './tasks/tsTask';

export * from './tasks/nodeDefaultTask';

@taskdefine
export class Define implements ITaskDefine {
    loadConfig(oper: Operation, option: ITaskOption, env: IEnvOption): ITaskConfig {
        // register default asserts.
        option.asserts = _.extend({
            ts: {
                loader: { module:  TsTasks }
            }
        }, option.asserts);


        return <ITaskConfig>{
            oper: oper,
            env: env,
            option: option
        }
    }
}
