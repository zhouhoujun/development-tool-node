import { Gulp } from 'gulp';
import * as _ from 'lodash';
import { NodeBuildOption } from '../../task';
import { TaskConfig } from 'development-tool';
const cache = require('gulp-cached');
import * as chalk from 'chalk';

export = (gulp: Gulp, config: TaskConfig) => {
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

    // console.log('register copy-asserts task by gulp', tasks);

    gulp.task('copy-asserts', () => {
        if (tasks.length > 0) {
            return config.runSequence(gulp, tasks);
        } else {
            console.log(chalk.yellow('has not configed asserts in option.'));
            return Promise.resolve();
        }
    });
}
