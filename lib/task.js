"use strict";
const path = require('path');
const development_tool_1 = require('development-tool');
let dir = __dirname;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    moduleTaskConfig(oper, option, env) {
        return {
            oper: oper,
            env: env,
            option: option,
            runTasks() {
                let tasks = ['clean'];
                switch (oper) {
                    case development_tool_1.Operation.build:
                        tasks = ['clean', ['copy-asserts', 'tscompile']];
                        if (env.watch !== false) {
                            tasks.push('watch');
                        }
                        break;
                    case development_tool_1.Operation.test:
                    case development_tool_1.Operation.e2e:
                    case development_tool_1.Operation.release:
                        tasks = ['clean', ['copy-asserts', 'tscompile'], 'test'];
                        if (env.watch !== false) {
                            tasks.push('watch');
                        }
                        break;
                    case development_tool_1.Operation.deploy:
                        tasks = ['clean', ['copy-asserts', 'tscompile'], 'test'];
                        break;
                }
                return tasks;
            }
        };
    },
    moduleTaskLoader(oper, option, findInModule, loadFromDir) {
        console.log('load task');
        let taskDirs = [path.join(__dirname, './tasks/' + development_tool_1.Operation.build.toString())];
        if (oper >= development_tool_1.Operation.test) {
            taskDirs.push(path.join(__dirname, './tasks/' + development_tool_1.Operation.test.toString()));
        }
        if (oper >= development_tool_1.Operation.e2e) {
            taskDirs.push(path.join(__dirname, './tasks/' + development_tool_1.Operation.e2e.toString()));
        }
        if (oper >= development_tool_1.Operation.release) {
            taskDirs.push(path.join(__dirname, './tasks/' + development_tool_1.Operation.release.toString()));
        }
        if (oper >= development_tool_1.Operation.deploy) {
            taskDirs.push(path.join(__dirname, './tasks/' + development_tool_1.Operation.deploy.toString()));
        }
        return loadFromDir(taskDirs);
    }
};
