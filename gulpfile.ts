import * as gulp from 'gulp';
import { Development } from 'development-tool';
import * as path from 'path';

// require('ts-node').register({ /* options */ });
// import taskDefine from './src/index';

Development.create(gulp, __dirname, {
    tasks: {
        src: 'src',
        dist: 'lib',
        loader: path.join(__dirname, './src/index.ts')
    }
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
