import { useState } from "react";
import NewTodo from "./components/NewTodo"
import TodoList from "./components/TodoList"
import { Todo } from "./todo.module";
// import { Route } from "react-router-dom";

const App = () => {
	const [todos, setTodos] = useState<Todo[]>([]);

	const todoAddHandler = (text: string) => {
		setTodos(prevTodos => [...prevTodos, {id: Math.random().toString(), text: text}])
		console.log(text);
	}

	const todoDeleteHandler = (todoId: string) => { 
		setTodos(prevTodo => {
			return prevTodo.filter(item => item.id !== todoId);
		})
	}

  return <div className="App">
		<NewTodo onAddTodo={todoAddHandler}></NewTodo>
    <TodoList items={todos} onDeleteTodo={todoDeleteHandler}></TodoList>
  </div>

}
export default App