import * as gulp from 'gulp';
import { TaskConfig } from 'development-tool';

let del = require('del');

export = (config: TaskConfig) => {
  gulp.task('clean', () => {
    return del(config.option.dist);
  });
};
