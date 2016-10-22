import { Gulp } from 'gulp';
import { NodeBuildOption } from '../../task';
import { TaskConfig } from 'development-tool';
import * as path from 'path';

const cache = require('gulp-cached');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const merge = require('merge2');

export = (gulp: Gulp, config: TaskConfig) => {
    let option: NodeBuildOption = <NodeBuildOption>config.option;
    let tscfile = path.join(config.env.root, option.tsconfig || './tsconfig.json');
    let tsProject = ts.createProject(tscfile);

    let dist = config.getDist(config.option);
    gulp.task('tscompile', () => {
        let tsResult = gulp.src(option.ts || (option.src + '/**/*.ts'))
            .pipe(cache('typescript'))
            .pipe(sourcemaps.init())
            .pipe(tsProject());

        return merge([
            // Merge the two output streams, so this task is finished when the IO of both operations are done. 
            tsResult.dts.pipe(gulp.dest(dist)),
            tsResult.js.pipe(sourcemaps.write('./sourcemaps')).pipe(gulp.dest(dist))
        ]);
    });
}
