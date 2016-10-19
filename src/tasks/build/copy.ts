import * as gulp from 'gulp';
import { NodeBuildOption } from '../../task';
import { TaskConfig } from 'development-tool';
import * as runSequence from 'run-sequence';
const cache = require('gulp-cached');

export = (config: TaskConfig) => {
    let option: NodeBuildOption = <NodeBuildOption>config.option;
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

    gulp.task('copy-asserts', callback => {
        if (tasks.length > 0) {
            tasks.push(callback);
            return runSequence(tasks);
        } else {
            return callback();
        }
    });
}
