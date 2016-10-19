import * as gulp from 'gulp';
import { NodeBuildOption } from '../../task';
import { TaskConfig } from 'development-tool';
import * as path from 'path';

const cache = require('gulp-cache');
const ts = require('gulp-typescript');
const merge = require('merge2');

export = (config: TaskConfig) => {
    let option: NodeBuildOption = <NodeBuildOption>config.option;
    let tscfile = path.join(config.env.root, option.tsconfig || './tsconfig.json');
    let tsProject = ts.createProject(tscfile);

    gulp.task('tscompile', () => {
        let tsResult = gulp.src(option.ts)
            .pipe(cache('typescript'))
            .pipe(tsProject());

        return merge([
            // Merge the two output streams, so this task is finished when the IO of both operations are done. 
            tsResult.dts.pipe(gulp.dest(option.dist)),
            tsResult.js.pipe(gulp.dest(option.dist))
        ]);
    });
}
