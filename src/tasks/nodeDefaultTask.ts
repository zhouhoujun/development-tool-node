/// <reference types="mocha"/>
import * as _ from 'lodash';
// import * as path from 'path';
import { IDynamicTask, Operation, IDynamicTasks, dynamicTask } from 'development-core';
// import * as chalk from 'chalk';
import * as mocha from 'gulp-mocha';
import { INodeTaskOption } from '../NodeTaskOption';


const del = require('del');


@dynamicTask
export class NodeDynamicTasks implements IDynamicTasks {
    tasks(): IDynamicTask[] {
        return [
            {
                name: 'clean',
                order: 0,
                task: (config) => del(config.getDist())
            },
            {
                name: 'test',
                order: 1,
                oper: Operation.test | Operation.release | Operation.deploy,
                pipes: [
                    (config) => mocha((<INodeTaskOption>config.option).mochaOptions)
                ],
                output: null
            }
        ];
    }
}
