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
const path = require('path');
const development_core_1 = require('development-core');
const cache = require('gulp-cached');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
let TsTasks = class TsTasks {
    tasks() {
        return [
            {
                name: 'ts-compile',
                pipes: [
                        () => cache('typescript'),
                    sourcemaps.init,
                        (config) => {
                        let option = config.option;
                        let tsProject = ts.createProject(path.join(config.env.root || '', option.tsconfig || './tsconfig.json'));
                        return tsProject();
                    }
                ],
                output: [
                        (tsmap, config, dt, gulp) => tsmap.dts.pipe(gulp.dest(config.getDist(dt))),
                        (tsmap, config, dt, gulp) => {
                        if (config.oper === development_core_1.Operation.release || config.oper === development_core_1.Operation.deploy) {
                            return tsmap.js.pipe(babel({ presets: ['es2015'] }))
                                .pipe(uglify()).pipe(sourcemaps.write('./sourcemaps'))
                                .pipe(gulp.dest(config.getDist(dt)));
                        }
                        else {
                            return tsmap.js.pipe(sourcemaps.write('./sourcemaps')).pipe(gulp.dest(config.getDist(dt)));
                        }
                    }
                ]
            },
            {
                name: 'ts-watch',
                oper: development_core_1.Operation.build | development_core_1.Operation.e2e | development_core_1.Operation.test,
                watchTasks: ['ts-compile']
            }
        ];
    }
};
TsTasks = __decorate([
    development_core_1.dynamicTask({
        group: 'ts'
    }), 
    __metadata('design:paramtypes', [])
], TsTasks);
exports.TsTasks = TsTasks;

//# sourceMappingURL=../sourcemaps/tasks/asserts.js.map
