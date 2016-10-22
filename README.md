# packaged development-tool-node

This repo is for distribution on `npm`. The source for this module is in the
[main repo](https://github.com/zhouhoujun/development-tool-node/src/mastert).
Please file issues and pull requests against that repo.
This package use to develop kit for typescript node project development via gulp tasks.

## Install

You can install this package either with `npm`.

### npm

```shell

npm install development-tool-node

```

You can `import` modules:

## import module

```ts
import * as gulp from 'gulp';
import  { Development } from 'development-tool';
import { NodeBuildOption } from 'development-tool-node';

```

## Create development tool

```ts
Development.create(gulp, __dirname, {
    tasks:[
        <NodeBuildOption>{
            src: 'src',
            dist: 'lib',
            // build:'build path',
            // release: 'release path',
            // depoly: 'depoly path'
            asserts:{
                json: 'src/**/*.json',
                css:'src/common/**/*.css',
                moduleBcss: ['src/moduleB/**/*.css'],
                moduleAcss: {
                    src: ['src/apath/**/*.css', 'src/bpath/**/*.css'],
                    dist:'dist path',
                    build:'build path',
                    release: 'release path',
                    depoly: 'depoly path'
                },
                ...
            },
            loader: 'development-tool-node'
        }
    ]
});
```

## Create development tool with addation sub tasks

```ts
Development.create(gulp, __dirname, {
    tasks:{
        src: 'src',
        dist: 'lib',
        loader: 'development-tool-node',
        tasks:[
            {
                src: 'files be dealt with',
                dist: 'dist path',
                // build:'build path',
                // release: 'release path',
                // depoly: 'depoly path',
                loader:'development-tool-*' //the module must implement ITaskDefine.
            },
            {
                src: ['src/apath/**/*.css', 'src/bpath/**/*.css'],
                dist: 'dist path',
                // build:'build path',
                // release: 'release path',
                // depoly: 'depoly path',
                loader: {
                    configModule: path.join(__dirname, './src/task.ts'), //the module must implement ITaskDefine.
                    dir: [path.join(__dirname, './src/mytasks')]
                },
                tasks: [
                    {
                        src: 'files be dealt with',
                        dist: 'dist path',
                        // build:'build path',
                        // release: 'release path',
                        // depoly: 'depoly path',
                        loader: {
                            //./src/mytasks folder must has module implement ITaskDefine.
                            dir: path.join(__dirname, './src/mytasks')
                        }
                    },
                    {
                        src: 'files be dealt with',
                        dist: 'dist path',
                        // build:'build path',
                        // release: 'release path',
                        // depoly: 'depoly path',
                        loader: {
                            module: path.join(__dirname, './src/mytasks/dosomething'),
                            configModule: path.join(__dirname, './src/mytasks/config') //the module must implement ITaskDefine.
                        }
                    }
                ]
            }
            ...
        ]
    }
});
```

https://github.com/zhouhoujun/development-tool-node.git

## Documentation

Documentation is available on the
[development-tool-node docs site](https://github.com/zhouhoujun/development-tool-node).

## License

MIT © [Houjun](https://github.com/zhouhoujun/)