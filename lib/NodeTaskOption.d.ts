/// <reference types="mocha" />
import { TaskOption } from 'development-tool';
export interface NodeTaskOption extends TaskOption {
    tsconfig?: string;
    tsBabelOption?: any;
    mochaOptions?: MochaSetupOptions;
}
export interface NodeBuildOption extends NodeTaskOption {
}
