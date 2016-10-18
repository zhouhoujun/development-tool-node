import { Development, TaskOption } from 'development-tool';

Development.create(__dirname, {
    tasks: [

    ]
});


import * as gulp from 'gulp';

const ts = require('gulp-typescript');
const merge = require('merge2');
const del = require('del');


gulp.task('build', ['clean-lib'], () => {
    let tsProject = ts.createProject('tsconfig.json');
    let tsResult = gulp.src('src/**/*.ts')
        .pipe(tsProject());

    return merge([
        // Merge the two output streams, so this task is finished when the IO of both operations are done. 
        tsResult.dts.pipe(gulp.dest('lib')),
        tsResult.js.pipe(gulp.dest('lib'))
    ]);
});

gulp.task('clean-lib', () => {
    return del('lib');
});
