import * as path from 'path';
import { Task, TaskConfig, Operation, TaskOption, tasksInDir } from 'development-tool';


export function moduleTaskConfig(oper: Operation, option: TaskOption): TaskConfig {
    return null
}

export function moduleTaskLoader(oper: Operation, option: TaskOption, loadFromDir?: tasksInDir): Promise<Task[]> {
    return loadFromDir(path.join(__dirname, './tasks/' + oper.toString()));
}
