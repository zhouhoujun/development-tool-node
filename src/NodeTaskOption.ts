import { ITaskOption } from 'development-core';



export interface INodeTaskOption extends ITaskOption {
    /**
     * tsconfig for typescript
     * 
     * @type {string}
     * @memberOf INodeTaskOption
     */
    tsconfig?: string;

    /**
     * babel option.
     * 
     * @type {*}
     * @memberOf INodeTaskOption
     */
    tsBabelOption?: any;
    /**
     * mocha test config.
     * 
     * @type {MochaSetupOptions}
     * @memberOf INodeTaskOption
     */
    mochaOptions?: MochaSetupOptions;
}

