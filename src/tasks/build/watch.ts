import * as gulp from 'gulp';
import * as _ from 'lodash';
import { NodeBuildOption } from '../../task';
import { TaskConfig } from 'development-tool';
const browserSync = require('browser-sync');

export = (config: TaskConfig) => {
    let option: NodeBuildOption = <NodeBuildOption>config.option;
    gulp.task('watch', () => {
        gulp.watch(option.ts, ['tscompile', browserSync]);
        if (option.asserts) {
            _.each(_.keys(option.asserts), f => {
                gulp.watch(option.asserts[f], ['copy-' + f, browserSync])
            });
        }
    });
}
