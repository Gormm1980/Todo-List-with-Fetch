import React, { useEffect } from "react";
import { useState } from "react";

const ToDoList = () => {
	const [todos, setTodos] = useState([]);
	const [task, setTask] = useState("");

	const AddTask = () => {
		const newTodos = todos.concat({ label: task, done: false });
		setTodos(newTodos);
	};

	const deleteTask = taskDone => {
		const removeTask = todos.filter(task => task.done != taskDone);
		setTodos(removeTask);
	};
	const deleteAll = () => {
		const deleteMethod = {
			method: "DELETE", // Method itself
			headers: {
				"Content-type": "application/json; charset=UTF-8" // Indicates the content
			}
			// No need to have body, because we don't send nothing to the server.
		};
		useEffect(() => {
			fetch(
				"https://assets.breatheco.de/apis/fake/todos/user/GuillermoSR",
				deleteMethod
			)
				.then(response => response.json())
				.then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
				.catch(err => console.log(err)); // Do something with the error
		}, [todos]);
	};

	// GET //

	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/GuillermoSR")
			.then(res => res.json())
			.then(json => setTodos(json))
			.catch(error => console.log(error));
	}, []);

	// PUT//
	useEffect(() => {
		fetch("https://assets.breatheco.de/apis/fake/todos/user/GuillermoSR", {
			method: "PUT",
			body: JSON.stringify(todos),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				console.log(resp.ok); // will be true if the response is successfull
				console.log(resp.status); // the status code = 200 or code = 400 etc.
				console.log(resp.text()); // will try return the exact result as string
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	}, [todos]);
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
			<button onClick={deleteAll}>Delete All</button>
			<ul>
				{todos.map((todo, done) => {
					return (
						<li key={todos.indexOf(todo)}>
							{todo.label}
							<button onClick={() => deleteTask(todo.done)}>
								X
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default ToDoList;
