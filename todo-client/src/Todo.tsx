export interface Todo {
    id: number;
    description: string;
    status: TodoStatus;
}

export enum TodoStatus {
    COMPLETE = 'COMPLETE',
    INCOMPLETE = 'INCOMPLETE'
}