import * as _ from 'lodash';
import { ITask, IAssertOption, IEnvOption, IContextDefine, ITaskContext, ITaskConfig, taskdefine, Operation } from 'development-core';

import { INodeTaskOption } from './NodeTaskOption';
export * from './NodeTaskOption';

import { CleanDynamicTasks, TestDynamicTasks } from './tasks/nodeDefaultTask';

@taskdefine()
export class NodeContextDefine implements IContextDefine {

    loadConfig(option: IAssertOption, env: IEnvOption): ITaskConfig {
        // register default asserts.
        option.asserts = _.extend({
            css: Operation.default,
            jpeg: Operation.default,
            jpg: Operation.default,
            gif: Operation.default,
            png: Operation.default,
            ioc: Operation.default,
            svg: Operation.default,
            ttf: Operation.default,
            woff: Operation.default,
            eot: Operation.default,
            js: Operation.default | Operation.autoWatch,
            ts: 'development-assert-ts'
        }, option.asserts || {});


        return <ITaskConfig>{
            option: option,
            env: env
        };
    }

    setContext(ctx: ITaskContext) {
        let nodeOption = ctx.option as INodeTaskOption
        if (nodeOption.test === false) {
            return;
        }
        ctx.add(<ITaskConfig>{
            option: <IAssertOption>{
                name: 'test',
                order: nodeOption.testOrder || (total => 2 / total),
                loader: (ctx) => {
                    return ctx.findTasks(TestDynamicTasks);
                }
            }
        });
    }

    tasks(context: ITaskContext): Promise<ITask[]> {
        return context.findTasks(CleanDynamicTasks);
    }
}
