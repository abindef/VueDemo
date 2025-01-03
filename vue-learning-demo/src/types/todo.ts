export interface Todo {
    id: number;
    title: string;
    completed: boolean;
    createdAt: Date;
}

// 类似于C#中的枚举
export enum TodoFilter {
    All = 'all',
    Active = 'active',
    Completed = 'completed'
}
