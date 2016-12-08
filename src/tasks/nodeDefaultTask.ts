
import * as _ from 'lodash';
// import * as path from 'path';
import { IDynamicTaskOption, Operation, IDynamicTasks, dynamicTask } from 'development-core';
// import * as chalk from 'chalk';
import * as mocha from 'gulp-mocha';
import { INodeTaskOption } from '../NodeTaskOption';


const del = require('del');


@dynamicTask
export class NodeDynamicTasks implements IDynamicTasks {
    tasks(): IDynamicTaskOption[] {
        return [
            {
                name: 'clean',
                // cleanSrc: 'lib/**/*.js',
                oper: Operation.clean | Operation.default,
                order: 0,
                task: (ctx, dt) => del(ctx.getDist(ctx.getSrc(dt)))
            },
            {
                name: 'test',
                order: total => 2 / total,
                oper: Operation.test | Operation.default,
                pipes: [
                    (config) => mocha((<INodeTaskOption>config.option).mochaOptions)
                ],
                output: null
            }
        ];
    }
}
