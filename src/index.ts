/// <reference types="mocha" />
import * as _ from 'lodash';
import { ITask, ITaskConfig, bindingConfig, IContextDefine, ITaskContext, taskdefine } from 'development-core';

export * from './NodeTaskOption';

import { NodeDynamicTasks } from './tasks/nodeDefaultTask';

@taskdefine
export class NodeContextDefine implements IContextDefine {

    getContext(config: ITaskConfig): ITaskContext {
        // register default asserts.
        config.option.asserts = _.extend({
            ts: { loader: 'development-assert-ts' }
        }, config.option.asserts);


        return bindingConfig(config);
    }

    tasks(context: ITaskContext): Promise<ITask[]> {
        return context.findTasks(NodeDynamicTasks)
    }
}
