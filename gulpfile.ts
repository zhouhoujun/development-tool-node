import * as gulp from 'gulp';
import { Development } from 'development-tool';
import * as path from 'path';
// require('ts-node').register({ /* options */ });
// import taskDefine from './src/task';
Development.create(gulp, __dirname, {
    tasks: {
        src: 'src',
        dist: 'lib',
        loader: {
            type: 'dir',
            // taskDefine: taskDefine,
            configModule: path.join(__dirname, './src/task.ts')
        },
        tasks: [
            // {
            //     src: 'src',
            //     dist: 'lib',
            //     loader: {
            //         type: 'dir',
            //         // taskDefine: taskDefine,
            //         configModule: path.join(__dirname, './src/task.ts')
            //     }
            // }
        ]
    }
});
