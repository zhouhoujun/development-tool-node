/// <reference types="mocha"/>
import * as path from 'path';
import { WatchEvent } from 'gulp';
import { Src, Task, TaskNameSequence, IMap, TaskConfig, EnvOption, Operation, TaskOption, tasksInModule, tasksInDir, ITaskDefine } from 'development-tool';


export interface NodeBuildOption extends TaskOption {
    /**
     * code setting use to test
     * 
     * @type {(string | string[])}
     * @memberOf NodeTestConfig
     */
    test?: Src;
    tsconfig?: string;
    ts?: Src;
    tsWatchChanged?(config: TaskConfig, event: WatchEvent): void;
    mochaOptions?: MochaSetupOptions;
    /**
     * static asserts.
     * 
     * @type {string[]}
     * @memberOf NodeBuildOption
     */
    asserts?: IMap<Src>;
    assertWatchChanged?(assert: string, config: TaskConfig, event: WatchEvent): void;
}

export default <ITaskDefine>{
    moduleTaskConfig(oper: Operation, option: TaskOption, env: EnvOption): TaskConfig {
        return {
            oper: oper,
            env: env,
            option: option,
            runTasks(): TaskNameSequence {
                let tasks: TaskNameSequence = ['clean'];
                switch (oper) {
                    case Operation.build:
                        tasks = ['clean', ['copy-asserts', 'tscompile']];
                        if (env.watch) {
                            tasks.push('watch');
                        }
                        break;
                    case Operation.test:
                    case Operation.e2e:
                    case Operation.release:
                        tasks = ['clean', ['copy-asserts', 'tscompile'], 'test'];
                        if (env.watch) {
                            tasks.push('watch');
                        }
                        break;
                    // case Operation.e2e:
                    //     break;
                    // case Operation.release:
                    //     break;
                    case Operation.deploy:
                        tasks = ['clean', ['copy-asserts', 'tscompile'], 'test'];
                        break;
                }
                return tasks;
            }
        }
    },

    moduleTaskLoader(config: TaskConfig, findInModule: tasksInModule, loadFromDir: tasksInDir): Promise<Task[]> {
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
        console.log('load task from dirs:', taskDirs);
        return loadFromDir(taskDirs);
    }
};
