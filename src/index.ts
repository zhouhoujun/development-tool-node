import * as _ from 'lodash';
import { ITask, IAssertOption, IEnvOption, IContextDefine, ITaskContext, ITaskConfig, taskdefine } from 'development-core';

import { INodeTaskOption } from './NodeTaskOption';
export * from './NodeTaskOption';

import { CleanDynamicTasks, TestDynamicTasks } from './tasks/nodeDefaultTask';

@taskdefine()
export class NodeContextDefine implements IContextDefine {

    loadConfig(option: IAssertOption, env: IEnvOption): ITaskConfig {
        // register default asserts.
        let opt = option;
        opt.asserts = _.extend({
            ts: { loader: 'development-assert-ts' }
        }, opt.asserts || {});


        let cfg = <ITaskConfig>{
            option: opt,
            env: env
        };
        console.log(cfg);
        return cfg;
    }

    setContext(ctx: ITaskContext) {
        let nodeOption = ctx.option as INodeTaskOption
        if (nodeOption.test === false) {
            return;
        }
        console.log('setContext');
        ctx.createContext(<ITaskConfig>{
            option: <IAssertOption>{
                name: 'test',
                order: nodeOption.testOrder || (total => 2 / total),
                loader: (cctx) => {
                    console.log('load test');
                    return cctx.findTasks(TestDynamicTasks);
                }
            }
        });

        // console.log('end setContext', ctx);
    }

    tasks(context: ITaskContext): Promise<ITask[]> {
        return context.findTasks(CleanDynamicTasks);
    }
}
