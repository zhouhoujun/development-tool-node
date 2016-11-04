/// <reference types="mocha" />
import { ITaskOption } from 'development-core';
export interface INodeTaskOption extends ITaskOption {
    /**
     * mocha test config.
     *
     * @type {MochaSetupOptions}
     * @memberOf INodeTaskOption
     */
    mochaOptions?: MochaSetupOptions;
}
