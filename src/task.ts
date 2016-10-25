/// <reference types="mocha"/>
import * as _ from 'lodash';
import * as path from 'path';
import { DynamicTask, Src, Task, TaskConfig, EnvOption, Operation, TaskOption, ITaskDefine } from 'development-tool';
import * as chalk from 'chalk';
import * as gulp from 'gulp';
import mocha from 'gulp-mocha';


export interface NodeTaskOption extends TaskOption {
    /**
     * tsconfig for typescript
     * 
     * @type {string}
     * @memberOf NodeTaskOption
     */
    tsconfig?: string;

    tsBabelOption?: any;
    /**
     * mocha test config.
     * 
     * @type {MochaSetupOptions}
     * @memberOf NodeTaskOption
     */
    mochaOptions?: MochaSetupOptions;
}

/**
 * unused. please use NodeTaskOption
 * 
 * @export
 * @interface NodeBuildOption
 * @extends {NodeTaskOption}
 */
export interface NodeBuildOption extends NodeTaskOption {

}

const del = require('del');
const cache = require('gulp-cached');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

// import * as chalk from 'chalk';

let nodeDynamicTasks: DynamicTask[] = [
    {
        name: 'clean',
        task: (config) => del(config.getDist())
    },
    {
        name: 'test',
        oper: Operation.e2e | Operation.test,
        pipe(gulpsrc, config) {
            return gulpsrc
                .pipe(mocha((<NodeTaskOption>config.option).mochaOptions))
                .once('error', () => {
                    process.exit(1);
                })
                .once('end', () => {
                    process.exit();
                });
        }
    }
];
let tsDynamicTasks = <DynamicTask[]>[
    {
        name: 'ts-compile',
        pipes(config) {
            let option = <NodeTaskOption>config.option;
            let tsProject = ts.createProject(path.join(config.env.root, option.tsconfig || './tsconfig.json'));
            return [
                () => cache('typescript'),
                sourcemaps.init,
                tsProject
            ]
        },
        output: [
            (tsmap, config) => tsmap.dts.pipe(gulp.dest(config.getDist())),
            (tsmap, config) => {
                let option = <NodeTaskOption>config.option;
                if (config.oper === Operation.release || config.oper === Operation.deploy) {
                    return tsmap.js
                        .pipe(babel(option.tsBabelOption || {
                            presets: ['es2015']
                        }))
                        .pipe(uglify())
                        .pipe(sourcemaps.write('./sourcemaps'))
                        .pipe(gulp.dest(config.getDist()));
                } else {
                    return tsmap.js
                        .pipe(sourcemaps.write('./sourcemaps'))
                        .pipe(gulp.dest(config.getDist()));
                }
            }
        ]
    },
    {
        name: 'ts-watch',
        oper: Operation.build | Operation.e2e | Operation.test,
        watch: ['ts-compile']
    }
];

export default <ITaskDefine>{
    moduleTaskConfig(oper: Operation, option: TaskOption, env: EnvOption): TaskConfig {
        // register default asserts.
        option.asserts = _.extend({
            ts: { loader: tsDynamicTasks }
        }, option.asserts);


        return <TaskConfig>{
            oper: oper,
            env: env,
            option: option,
            runTasks(subGroupTask?: Src, tasks?: Src[], assertTasks?: Src): Src[] {
                assertTasks && tasks.splice(1, 0, assertTasks);
                subGroupTask && tasks.splice(1, 0, subGroupTask);
                return tasks;
            }
        }
    },

    moduleTaskLoader(config: TaskConfig): Promise<Task[]> {
        return Promise.resolve(config.dynamicTasks(nodeDynamicTasks));
        // let oper = config.oper;
        // let taskDirs = [path.join(__dirname, './tasks/build')];
        // if (oper >= Operation.test) {
        //     taskDirs.push(path.join(__dirname, './tasks/test'));
        // }
        // if (oper >= Operation.e2e) {
        //     taskDirs.push(path.join(__dirname, './tasks/e2e'));
        // }
        // if (oper >= Operation.release) {
        //     taskDirs.push(path.join(__dirname, './tasks/release'));
        // }
        // if (oper >= Operation.deploy) {
        //     taskDirs.push(path.join(__dirname, './tasks/deploy'));
        // }
        // console.log(chalk.grey('load task from dirs:'), taskDirs);
        // return config.findTasksInDir(taskDirs);
    }
}
