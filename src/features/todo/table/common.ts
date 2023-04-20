export const TODO_STATUS = {
    UN_DONE: false,
    DONE: true,
};

export type TodoStatus = (typeof TODO_STATUS)[keyof typeof TODO_STATUS];

export type Title = string;

export type Todo = {
    title: Title;
    status: TodoStatus;
};

export type TodoList = Todo[];
