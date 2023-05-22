import { ReactNode, createContext, useCallback, useContext } from "react";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { TODO_STATUS, Title, TodoList, TodoStatus } from "../table/common";

type TodoContextType = {
    todoList?: TodoList;
    handleAddTodoList?: (title: Title) => void;
    handleChangeTodoStatus?: (title: string, checked: TodoStatus) => void;
    handleDeleteTodo?: (title: string) => void;
};

const TodoContext = createContext<TodoContextType>({});

const useTodoContext = () => {
    return useContext(TodoContext);
};

/**
 * Todoリストを管理するContextのProdvider
 */
export const TodoProvider = (props: { children: ReactNode }) => {
    const [storageTodoList, setStorageTodoList] = useLocalStorage<TodoList>(
        "todoList",
        []
    );

    const handleAddTodoList = useCallback(
        (title: Title) => {
            setStorageTodoList([
                ...storageTodoList,
                { title, status: TODO_STATUS.UN_DONE },
            ]);
        },
        [setStorageTodoList, storageTodoList]
    );

    const handleChangeTodoStatus = useCallback(
        (title: string, checked: TodoStatus) => {
            const newTodoList = storageTodoList.map(todo => {
                if (todo.title === title) {
                    return { title, status: checked };
                }
                return todo;
            });
            setStorageTodoList(newTodoList);
        },
        [setStorageTodoList, storageTodoList]
    );

    const handleDeleteTodo = useCallback(
        (title: string) => {
            const newTodoList = storageTodoList?.filter(
                todo => todo.title !== title
            );
            setStorageTodoList(newTodoList);
        },
        [setStorageTodoList, storageTodoList]
    );

    const value: TodoContextType = {
        todoList: storageTodoList,
        handleAddTodoList,
        handleChangeTodoStatus,
        handleDeleteTodo,
    };

    return (
        <TodoContext.Provider value={value}>
            {props.children}
        </TodoContext.Provider>
    );
};

/**
 * Todoリストを管理するカスタムフック
 * TodoProviderの内側で使用する
 */
export const useTodoList = () => {
    const {
        todoList,
        handleAddTodoList,
        handleChangeTodoStatus,
        handleDeleteTodo,
    } = useTodoContext();

    if (
        // undefinedの場合はProvideの外側で使用したときのみ
        todoList === undefined ||
        handleAddTodoList === undefined ||
        handleChangeTodoStatus === undefined ||
        handleDeleteTodo === undefined
    )
        throw Error("TodoProviderを通して使用してください");

    return {
        todoList,
        handleAddTodoList,
        handleChangeTodoStatus,
        handleDeleteTodo,
    };
};
