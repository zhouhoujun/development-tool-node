"use strict";
const gulp = require('gulp');
const gulp_mocha_1 = require('gulp-mocha');
module.exports = (config) => {
    let option = config.option;
    gulp.task('test', () => {
        gulp.src(option.test || option.dist)
            .pipe(gulp_mocha_1.default(option.mochaOptions))
            .once('error', () => {
            process.exit(1);
        })
            .once('end', () => {
            process.exit();
        });
    });
};
