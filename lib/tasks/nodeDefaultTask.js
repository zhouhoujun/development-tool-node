"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
const development_core_1 = require('development-core');
const mocha = require('gulp-mocha');
const del = require('del');
let NodeDynamicTasks = class NodeDynamicTasks {
    tasks() {
        return [
            {
                name: 'clean',
                order: 0,
                task: (config) => del(config.getDist())
            },
            {
                name: 'test',
                order: 1,
                test: true,
                oper: development_core_1.Operation.test | development_core_1.Operation.release | development_core_1.Operation.deploy,
                pipes: [
                        (config) => mocha(config.option.mochaOptions)
                ],
                output: null
            }
        ];
    }
};
NodeDynamicTasks = __decorate([
    development_core_1.dynamicTask, 
    __metadata('design:paramtypes', [])
], NodeDynamicTasks);
exports.NodeDynamicTasks = NodeDynamicTasks;

//# sourceMappingURL=../sourcemaps/tasks/nodeDefaultTask.js.map
