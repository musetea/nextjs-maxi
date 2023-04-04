import "./App.scss";
import Todo from "./components/Todo";

const todos: string[] = [
	"Learn React JS",
	"Learn Next JS",
	"나는 너의 영원한 친구여",
];

function App() {
	const items = todos.map(t => <Todo key={t} title={t} />);

	return (
		<div className="App">
			<header className="header">
				<h1>TODO APP</h1>
			</header>
			<hr />
			<h2>TODO LIST</h2>
			{items}
		</div>
	);
}

export default App;
