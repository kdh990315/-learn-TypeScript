import TodoList from "./components/TodoList"

const App = () => {
  const todos = [
		{
			id: 't1',
			text: 'Finish the course'
		}
	]

  return <div className="App">
    <TodoList items={todos}></TodoList>
  </div>

}
export default App