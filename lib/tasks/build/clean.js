"use strict";
const gulp = require('gulp');
let del = require('del');
module.exports = (config) => {
    gulp.task('clean', () => {
        return del(config.option.dist);
    });
};
