/// <reference types="mocha" />
import { IAssertOption, Order } from 'development-core';
export interface INodeTaskOption extends IAssertOption {
    /**
     * mocha test config.
     *
     * @type {MochaSetupOptions}
     * @memberOf INodeTaskOption
     */
    mochaOptions?: MochaSetupOptions;
    /**
     * test or not.
     *
     * @type {boolean}
     * @memberof INodeTaskOption
     */
    test?: boolean;
    /**
     * test order
     *
     * @type {Order}
     * @memberof INodeTaskOption
     */
    testOrder?: Order;
}
