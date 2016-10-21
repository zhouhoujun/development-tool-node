"use strict";
const _ = require('lodash');
const cache = require('gulp-cached');
const chalk = require('chalk');
module.exports = (gulp, config) => {
    let option = config.option;
    let tasks = [];
    if (option.asserts) {
        _.each(_.keys(option.asserts), f => {
            if (!option.asserts[f]) {
                return;
            }
            let tsk = 'copy-' + f;
            tasks.push(tsk);
            gulp.task(tsk, () => {
                gulp.src(option.asserts[f])
                    .pipe(cache('assets-' + f))
                    .pipe(gulp.dest(option.dist));
            });
        });
    }
    gulp.task('copy-asserts', () => {
        if (tasks.length > 0) {
            return config.runSequence(gulp, tasks);
        }
        else {
            console.log(chalk.yellow('has not configed asserts in option.'));
            return Promise.resolve();
        }
    });
};
