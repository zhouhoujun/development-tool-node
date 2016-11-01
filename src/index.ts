/// <reference types="mocha"/>
import * as _ from 'lodash';
import { findTasks, ITaskConfig, IEnvOption, Operation, ITaskOption, ITaskDefine, taskdefine } from 'development-core';

export * from './NodeTaskOption';

import { TsTasks } from './tasks/tsTask';


@taskdefine
export class Define implements ITaskDefine {
    loadConfig(oper: Operation, option: ITaskOption, env: IEnvOption): ITaskConfig {
        // register default asserts.
        option.asserts = _.extend({
            ts: {
                loader: () => findTasks(TsTasks, { group: 'ts' })
            }
        }, option.asserts);


        return <ITaskConfig>{
            oper: oper,
            env: env,
            option: option
        }
    }
}
