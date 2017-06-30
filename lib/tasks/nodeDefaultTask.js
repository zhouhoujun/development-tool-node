"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// import * as path from 'path';
var development_core_1 = require("development-core");
// import * as chalk from 'chalk';
var mocha = require("gulp-mocha");
var del = require('del');
var CleanDynamicTasks = (function () {
    function CleanDynamicTasks() {
    }
    CleanDynamicTasks.prototype.tasks = function () {
        return [
            {
                name: 'clean',
                // cleanSrc: 'lib/**/*.js',
                oper: development_core_1.Operation.clean | development_core_1.Operation.default,
                order: 0,
                task: function (ctx, dt) { return del(ctx.getSrc(dt)); }
            }
        ];
    };
    CleanDynamicTasks = __decorate([
        development_core_1.dynamicTask()
    ], CleanDynamicTasks);
    return CleanDynamicTasks;
}());
exports.CleanDynamicTasks = CleanDynamicTasks;
var TestDynamicTasks = (function () {
    function TestDynamicTasks() {
    }
    TestDynamicTasks.prototype.tasks = function () {
        return [
            {
                name: 'mocha',
                oper: development_core_1.Operation.test | development_core_1.Operation.default,
                pipes: [
                    function (config) { return mocha(config.option.mochaOptions); }
                ],
                output: null
            }
        ];
    };
    TestDynamicTasks = __decorate([
        development_core_1.dynamicTask()
    ], TestDynamicTasks);
    return TestDynamicTasks;
}());
exports.TestDynamicTasks = TestDynamicTasks;

//# sourceMappingURL=../sourcemaps/tasks/nodeDefaultTask.js.map
