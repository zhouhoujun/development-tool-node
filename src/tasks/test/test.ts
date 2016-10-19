import * as gulp from 'gulp';
import { NodeBuildOption } from '../../task';
import { TaskConfig } from 'development-tool';
import mocha from 'gulp-mocha';

export = (config: TaskConfig) => {
    let option: NodeBuildOption = <NodeBuildOption>config.option;
    gulp.task('test', () => {
        gulp.src(option.test || option.dist)
            .pipe(mocha(option.mochaOptions))
            .once('error', () => {
                process.exit(1);
            })
            .once('end', () => {
                process.exit();
            });
    });
}
