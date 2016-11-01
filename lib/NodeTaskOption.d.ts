/// <reference types="mocha" />
import { ITaskOption } from 'development-core';
export interface INodeTaskOption extends ITaskOption {
    tsconfig?: string;
    tsBabelOption?: any;
    mochaOptions?: MochaSetupOptions;
}
