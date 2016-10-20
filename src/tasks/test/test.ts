import { Gulp } from 'gulp';
import { NodeBuildOption } from '../../task';
import { TaskConfig } from 'development-tool';
import mocha from 'gulp-mocha';

export = (gulp: Gulp, config: TaskConfig) => {
    let option: NodeBuildOption = <NodeBuildOption>config.option;

    gulp.task('test', () => {
        if (!option.test) {
            console.error('option test src not configed.');
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
