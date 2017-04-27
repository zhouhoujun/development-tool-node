"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/// <reference types="mocha" />
var _ = require("lodash");
var development_core_1 = require("development-core");
var nodeDefaultTask_1 = require("./tasks/nodeDefaultTask");
var NodeContextDefine = (function () {
    function NodeContextDefine() {
    }
    NodeContextDefine.prototype.getContext = function (config) {
        // register default asserts.
        config.option.asserts = _.extend({
            ts: { loader: 'development-assert-ts' }
        }, config.option.asserts);
        return development_core_1.bindingConfig(config);
    };
    NodeContextDefine.prototype.tasks = function (context) {
        return context.findTasks(nodeDefaultTask_1.NodeDynamicTasks);
    };
    return NodeContextDefine;
}());
NodeContextDefine = __decorate([
    development_core_1.taskdefine
], NodeContextDefine);
exports.NodeContextDefine = NodeContextDefine;

//# sourceMappingURL=sourcemaps/index.js.map
