/// <reference types="mocha"/>
import * as path from 'path';
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
    mochaOptions?: MochaSetupOptions;
    /**
     * static asserts.
     * 
     * @type {string[]}
     * @memberOf NodeBuildOption
     */
    asserts?: IMap<Src>;
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
                        if (env.watch !== false) {
                            tasks.push('watch');
                        }
                        break;
                    case Operation.test:
                    case Operation.e2e:
                    case Operation.release:
                        tasks = ['clean', ['copy-asserts', 'tscompile'], 'test'];
                        if (env.watch !== false) {
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

    moduleTaskLoader(oper: Operation, option: TaskOption, findInModule: tasksInModule, loadFromDir: tasksInDir): Promise<Task[]> {
        console.log('load task');
        let taskDirs = [path.join(__dirname, './tasks/' + Operation.build.toString())];
        if (oper >= Operation.test) {
            taskDirs.push(path.join(__dirname, './tasks/' + Operation.test.toString()));
        }
        if (oper >= Operation.e2e) {
            taskDirs.push(path.join(__dirname, './tasks/' + Operation.e2e.toString()));
        }
        if (oper >= Operation.release) {
            taskDirs.push(path.join(__dirname, './tasks/' + Operation.release.toString()));
        }
        if (oper >= Operation.deploy) {
            taskDirs.push(path.join(__dirname, './tasks/' + Operation.deploy.toString()));
        }
        return loadFromDir(taskDirs);
    }
};
