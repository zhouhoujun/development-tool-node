/// <reference types="mocha"/>
import * as _ from 'lodash';
import * as path from 'path';
import { IDynamicTask, Operation, IDynamicTasks, dynamicTask } from 'development-core';
// import * as chalk from 'chalk';
import { INodeTaskOption } from '../NodeTaskOption';


const cache = require('gulp-cached');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');


@dynamicTask({
    group: 'ts'
})
export class TsTasks implements IDynamicTasks {
    tasks() {
        return <IDynamicTask[]>[
            {
                name: 'ts-compile',
                pipes: [
                    () => cache('typescript'),
                    sourcemaps.init,
                    (config) => {
                        let option = <INodeTaskOption>config.option;
                        // console.log(config);
                        let tsProject = ts.createProject(path.join(config.env.root || '', option.tsconfig || './tsconfig.json'));
                        return tsProject();
                    }
                ],
                output: [
                    (tsmap, config, dt, gulp) => tsmap.dts.pipe(gulp.dest(config.getDist(dt))),
                    (tsmap, config, dt, gulp) => {
                        if (config.oper === Operation.release || config.oper === Operation.deploy) {
                            return tsmap.js.pipe(babel({ presets: ['es2015'] }))
                                .pipe(uglify()).pipe(sourcemaps.write('./sourcemaps'))
                                .pipe(gulp.dest(config.getDist(dt)));
                        } else {
                            return tsmap.js.pipe(sourcemaps.write('./sourcemaps')).pipe(gulp.dest(config.getDist(dt)));
                        }
                    }
                ]
            },
            {
                name: 'ts-watch',
                oper: Operation.build | Operation.e2e | Operation.test,
                watchTasks: ['ts-compile']
            }
        ];
    }
}
