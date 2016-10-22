"use strict";
const path = require('path');
const development_tool_1 = require('development-tool');
const chalk = require('chalk');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    moduleTaskConfig(oper, option, env) {
        return {
            oper: oper,
            env: env,
            option: option,
            runTasks(subgpTask) {
                let tasks = ['clean'];
                switch (oper) {
                    case development_tool_1.Operation.build:
                        tasks = ['clean', ['copy-asserts', 'tscompile']];
                        if (subgpTask) {
                            tasks.push(subgpTask);
                        }
                        if (env.watch) {
                            tasks.push('watch');
                        }
                        break;
                    case development_tool_1.Operation.test:
                    case development_tool_1.Operation.release:
                        tasks = ['clean', ['copy-asserts', 'tscompile']];
                        if (subgpTask) {
                            tasks.push(subgpTask);
                        }
                        tasks.push('test');
                        if (env.watch) {
                            tasks.push('watch');
                        }
                        break;
                    case development_tool_1.Operation.e2e:
                        console.log(chalk.red('can not support e2e test.'));
                        break;
                    case development_tool_1.Operation.deploy:
                        tasks = ['clean', ['copy-asserts', 'tscompile']];
                        if (subgpTask) {
                            tasks.push(subgpTask);
                        }
                        tasks.push('test');
                        break;
                }
                return tasks;
            }
        };
    },
    moduleTaskLoader(config) {
        let oper = config.oper;
        let taskDirs = [path.join(__dirname, './tasks/build')];
        if (oper >= development_tool_1.Operation.test) {
            taskDirs.push(path.join(__dirname, './tasks/test'));
        }
        return config.findTasksInDir(taskDirs);
    }
};

//# sourceMappingURL=sourcemaps/task.js.map
