"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var development_core_1 = require("development-core");
var nodeDefaultTask_1 = require("./tasks/nodeDefaultTask");
var NodeContextDefine = (function () {
    function NodeContextDefine() {
    }
    NodeContextDefine.prototype.loadConfig = function (option, env) {
        // register default asserts.
        var opt = option;
        opt.asserts = _.extend({
            ts: { loader: 'development-assert-ts' }
        }, opt.asserts || {});
        var cfg = {
            option: opt,
            env: env
        };
        return cfg;
    };
    NodeContextDefine.prototype.setContext = function (ctx) {
        var nodeOption = ctx.option;
        if (nodeOption.test === false) {
            return;
        }
        ctx.add({
            option: {
                name: 'test',
                order: nodeOption.testOrder || (function (total) { return 2 / total; }),
                loader: function (ctx) {
                    return ctx.findTasks(nodeDefaultTask_1.TestDynamicTasks);
                }
            }
        });
        // console.log('end setContext', ctx);
    };
    NodeContextDefine.prototype.tasks = function (context) {
        return context.findTasks(nodeDefaultTask_1.CleanDynamicTasks);
    };
    NodeContextDefine = __decorate([
        development_core_1.taskdefine()
    ], NodeContextDefine);
    return NodeContextDefine;
}());
exports.NodeContextDefine = NodeContextDefine;

//# sourceMappingURL=sourcemaps/index.js.map
