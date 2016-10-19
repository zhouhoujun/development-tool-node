"use strict";
const gulp = require('gulp');
const browserSync = require('browser-sync');
module.exports = (config) => {
    let option = config.option;
    gulp.task('watch', () => {
        gulp.watch(option.ts, ['tscompile', browserSync]);
        if (option.asserts) {
            _.each(_.keys(option.asserts), f => {
                gulp.watch(option.asserts[f], ['copy-' + f, browserSync]);
            });
        }
    });
};
