"use strict";
const gulp_mocha_1 = require('gulp-mocha');
const chalk = require('chalk');
module.exports = (gulp, config) => {
    let option = config.option;
    gulp.task('test', () => {
        if (!option.test) {
            console.log(chalk.red('has not configed test src in option.'));
            return null;
        }
        else {
            return gulp.src(option.test)
                .pipe(gulp_mocha_1.default(option.mochaOptions))
                .once('error', () => {
                process.exit(1);
            })
                .once('end', () => {
                process.exit();
            });
        }
    });
};

//# sourceMappingURL=../../sourcemaps/tasks/test/test.js.map
