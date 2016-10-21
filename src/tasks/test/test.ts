import { Gulp } from 'gulp';
import { NodeBuildOption } from '../../task';
import { TaskConfig } from 'development-tool';
import mocha from 'gulp-mocha';
import * as chalk from 'chalk';

export = (gulp: Gulp, config: TaskConfig) => {
    let option: NodeBuildOption = <NodeBuildOption>config.option;

    gulp.task('test', () => {
        if (!option.test) {
            console.log(chalk.red('has not configed test src in option.'));
            return null;
        } else {
           return gulp.src(option.test)
                .pipe(mocha(option.mochaOptions))
                .once('error', () => {
                    process.exit(1);
                })
                .once('end', () => {
                    process.exit();
                });
        }
    });
}
