import React, { useEffect } from "react";
import { useState } from "react";

const ToDoList = () => {
	const [todos, setTodos] = useState([]);
	const [task, setTask] = useState("");

	const AddTask = () => {
		const newTodos = todos.concat({
			label: task,
			done: false
		});

		fetch("https://assets.breatheco.de/apis/fake/todos/user/GuillermoSR", {
			method: "PUT",
			body: JSON.stringify(newTodos),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				resp.json();
			})
			.then(data => {
				console.log(data);
				setTodos(newTodos);
			})
			.catch(error => {
				console.log(error);
			});
		console.log("filtered");
	};

	const deleteToDoList = () => {
		const removeTodolist = [];

		fetch("https://assets.breatheco.de/apis/fake/todos/user/GuillermoSR", {
			method: "PUT",
			body: JSON.stringify(removeTodolist),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				resp.json();
			})
			.then(data => {
				console.log(data);
				setTodos(removeTodolist);
			})
			.catch(error => {
				console.log(error);
			});
		console.log("filtered");
	};

	function deleteTask(elementIndex) {
		let filtered = todos.filter(function(todo, index) {
			return elementIndex !== index;
		});
		console.log("filtered", filtered);

		fetch("https://assets.breatheco.de/apis/fake/todos/user/GuillermoSR", {
			method: "PUT",
			body: JSON.stringify(filtered),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				resp.json();
			})
			.then(data => {
				console.log(data);
				setTodos(filtered);
			})
			.catch(error => {
				console.log(error);
			});
		console.log("filtered");
	}

	// GET //
	function getToDo() {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/GuillermoSR")
			.then(res => res.json())
			.then(data => setTodos(data));
	}

	useEffect(() => {
		getToDo();
	}, []);

	return (
		<div>
			<input
				type="text"
				value={task}
				onChange={e => {
					setTask(e.target.value);
				}}
			/>
			<button onClick={AddTask}>Add</button>
			<button onClick={deleteToDoList}> Delete All</button>

			<ul>
				{todos.map((todo, index) => {
					return (
						<li key={index}>
							{todo.label}
							{todo.index}
							<button onClick={() => deleteTask(index)}>X</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default ToDoList;
