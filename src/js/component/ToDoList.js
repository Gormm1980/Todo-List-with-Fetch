import React, { useEffect } from "react";
import { useState } from "react";
import { promise } from "remote-origin-url";

const ToDoList = () => {
	const [todos, setTodos] = useState([]);
	const [task, setTask] = useState("");

	const AddTask = () => {
		const newTodos = todos.concat({
			label: task,
			done: false
			// id: Math.random() * 10
		});
		setTodos(newTodos);
	};
	function deleteTodo(elementIndex) {
		let filtered = todos.filter(function(todos, index) {
			return elementIndex !== index;
		});
		setTodos(filtered);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/GuillermoSR", {
			method: "PUT",
			body: JSON.stringify(filtered),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				return resp.json();
			})
			.then(data => {
				console.log(data);
			})
			.catch(error => {
				console.log(error);
			});
		console.log(filtered);
	}

	// GET //

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/GuillermoSR")
			.then(res => res.json())
			.then(json => setTodos(json))
			.catch(error => console.log(error));
	}, []);

	function deleteAll() {
		let deleteFull = todos.filter(function(todos, index) {
			return !remove.includes(todos.index);
		});
		setTodos(deleteFull);

		const deleteMethod = {
			method: "DELETE", // Method itself
			headers: { "Content-Type": "application/json" },
			body: null
		};
		// Make the HTTP Delete call using fetch api

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/GuillermoSR",
			deleteMethod
		)
			.then(res => res.json())
			.then(data =>
				// let newTodos = [...todos].splice(0, todos.length);
				// setTodos(data),
				console.log(data)
			) // Manipulate the data retrieved back, if we want to do something with it
			.catch(err => console.log(err)); // Do something with the error
	}
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

			<ul>
				{todos.map((todo, index) => {
					return (
						<li key={index}>
							{todo.label}
							<button onClick={() => deleteTodo(index)}>X</button>
						</li>
					);
				})}
			</ul>
			<button onClick={deleteAll}>Delete All</button>
		</div>
	);
};

export default ToDoList;
