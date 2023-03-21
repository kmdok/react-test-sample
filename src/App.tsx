import "./App.css";
import { TodoPage } from "./todo/TodoPage";

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h3>TODOリスト</h3>
                <TodoPage />
            </header>
        </div>
    );
}

export default App;
