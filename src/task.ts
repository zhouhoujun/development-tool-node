/// <reference types="mocha"/>
import * as path from 'path';
import { WatchEvent } from 'gulp';
import { Src, Task, IMap, TaskConfig, EnvOption, Operation, TaskOption, ITaskDefine } from 'development-tool';
// import * as chalk from 'chalk';

export interface NodeBuildOption extends TaskOption {
    /**
     * test code src to run test.
     * 
     * @type {(string | string[])}
     * @memberOf NodeTestConfig
     */
    test?: Src;
    /**
     * tsconfig for typescript
     * 
     * @type {string}
     * @memberOf NodeBuildOption
     */
    tsconfig?: string;
    /**
     * typescript src.
     * 
     * @type {Src}
     * @memberOf NodeBuildOption
     */
    ts?: Src;
    /**
     * watch typescript file changed.
     * 
     * @param {TaskConfig} config
     * @param {WatchEvent} event
     * 
     * @memberOf NodeBuildOption
     */
    tsWatchChanged?(config: TaskConfig, event: WatchEvent): void;
    /**
     * mocha test config.
     * 
     * @type {MochaSetupOptions}
     * @memberOf NodeBuildOption
     */
    mochaOptions?: MochaSetupOptions;
    /**
     * static asserts.
     * 
     * @type {string[]}
     * @memberOf NodeBuildOption
     */
    asserts?: IMap<Src>;
    /**
     * watch assert file changed.
     * 
     * @param {string} assert
     * @param {TaskConfig} config
     * @param {WatchEvent} event
     * 
     * @memberOf NodeBuildOption
     */
    assertWatchChanged?(assert: string, config: TaskConfig, event: WatchEvent): void;
}

export default <ITaskDefine>{
    moduleTaskConfig(oper: Operation, option: TaskOption, env: EnvOption): TaskConfig {
        return {
            oper: oper,
            env: env,
            option: option,
            runTasks(subgpTask?: Src): Src[] {
                let tasks: Src[] = ['clean'];
                switch (oper) {
                    case Operation.build:
                        tasks = ['clean', ['copy-asserts', 'tscompile']];
                        if (subgpTask) {
                            tasks.push(subgpTask);
                        }
                        if (env.watch) {
                            tasks.push('watch');
                        }
                        break;
                    case Operation.test:
                    case Operation.e2e:
                    case Operation.release:
                        tasks = ['clean', ['copy-asserts', 'tscompile']];
                        if (subgpTask) {
                            tasks.push(subgpTask);
                        }
                        tasks.push('test');
                        if (env.watch) {
                            tasks.push('watch');
                        }
                        break;
                    // case Operation.e2e:
                    //     break;
                    // case Operation.release:
                    //     break;
                    case Operation.deploy:
                        tasks = ['clean', ['copy-asserts', 'tscompile']];
                        if (subgpTask) {
                            tasks.push(subgpTask);
                        }
                        tasks.push('test');
                        break;
                }
                return tasks;
            }
        }
    },

    moduleTaskLoader(config: TaskConfig): Promise<Task[]> {
        let oper = config.oper;
        let taskDirs = [path.join(__dirname, './tasks/build')];
        if (oper >= Operation.test) {
            taskDirs.push(path.join(__dirname, './tasks/test'));
        }
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
        return config.findTasksInDir(taskDirs);
    }
};
