/// <reference types="mocha" />
import { ITaskOption } from 'development-core';
export interface INodeTaskOption extends ITaskOption {
    mochaOptions?: MochaSetupOptions;
}
