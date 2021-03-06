import * as gulp from 'gulp';

import { Development } from 'development-tool';
import * as path from 'path';

Development.create(gulp, __dirname, [
    {
        src: 'src',
        dist: 'lib',
        buildDist: 'build',
        loader: path.join(__dirname, './src/index.ts')
    }
]).start();


//
// import * as minimist from 'minimist';
// import { Operation, currentOperation, bindingConfig, runTaskSequence, IEnvOption, ITaskConfig, findTasksInDir } from 'development-core';
// gulp.task('build', () => {
//     var env: IEnvOption = minimist(process.argv.slice(2), {
//         string: 'env',
//         default: { env: process.env.NODE_ENV || 'development', root: __dirname }
//     });

//     let oper: Operation = currentOperation(env);
//     let config = bindingConfig({
//         env: env,
//         oper: oper,
//         option: {
//             src: 'src/**/*.ts',
//             dist: 'lib',
//             testSrc: 'test/**/*.spec.ts'
//         }
//     });

//     console.log(config);
//     return Promise.all([
//         config.findTasksInDir(path.join(__dirname, './src/tasks')),
//         config.findTasksInDir(path.join(__dirname, './src/tasks'), { group: 'ts' })
//     ])
//         .then(tasks => {
//             return runTaskSequence(gulp, tasks[0].concat(tasks[1]), config);
//         })
// });



// test
// import { NodeBuildOption } from './src/index';
// Development.create(gulp, __dirname, {
//     tasks: <NodeBuildOption>{
//         src: 'src',
//         dist: 'lib',
//         asserts: {
//             json: 'src/**/*.json',
//             css: 'src/**/*.css'
//         },
//         loader: {
//             module: path.join(__dirname, './src/index.ts')
//         },
//         tasks: [
//             <NodeBuildOption>{
//                 src: 'src',
//                 dist: 'lib',
//                 asserts: {
//                     json: 'src/**/*.json',
//                     css: 'src/**/*.css'
//                 },
//                 loader: {
//                     type: 'dir',
//                     // taskDefine: taskDefine,
//                     configModule: path.join(__dirname, './src/index.ts')
//                 },
//                 tasks: [
//                     <NodeBuildOption>{
//                         src: 'src',
//                         dist: 'lib',
//                         asserts: {
//                             jpg: 'src/**/*.jpg',
//                             jpeg: 'src/**/*.jpeg'
//                         },
//                         loader: {
//                             module: path.join(__dirname, './src/index.ts')
//                         }
//                     }
//                 ]
//             }
//         ]
//     }
// });
