/// <reference types="mocha" />
import { IAsserts } from 'development-core';
export interface INodeTaskOption extends IAsserts {
    /**
     * mocha test config.
     *
     * @type {MochaSetupOptions}
     * @memberOf INodeTaskOption
     */
    mochaOptions?: MochaSetupOptions;
}
