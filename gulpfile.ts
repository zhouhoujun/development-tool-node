import * as gulp from 'gulp';
import { Operation, currentOperation, bindingConfig, runTaskSequence, IEnvOption, generateTask, findTasksInDir } from 'development-core';
import * as path from 'path';
import * as minimist from 'minimist';

gulp.task('build', () => {
    var env: IEnvOption = minimist(process.argv.slice(2), {
        string: 'env',
        default: { env: process.env.NODE_ENV || 'development' }
    });

    let oper: Operation = currentOperation(env);
    let config = bindingConfig({
        env: env,
        oper: oper,
        option: {
            src: 'src',
            dist: 'lib',
            asserts: {
                ts: findTasksInDir(path.join(__dirname, './src/tasks'), { group: 'ts' })
            }
        }
    });
    return findTasksInDir(path.join(__dirname, './src/tasks'))
        .then(tasks => {
            return runTaskSequence(gulp, tasks, config);
        })
});



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
