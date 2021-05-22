import React, { useEffect } from "react";
import { useState } from "react";
import { promise } from "remote-origin-url";

const ToDoList = () => {
	const [todos, setTodos] = useState([]);
	const [task, setTask] = useState("");

	const AddTask = () => {
		const newTodos = todos.concat({
			label: task,
			done: false,
			id: Math.random() * 10
		});
		setTodos(newTodos);
	};
	const deleteTask = taskId => {
		const removeTask = todos.filter(task => task.id != taskId);
		setTodos(removeTask);
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

	// function deleteAll() {
	// 	if (task === todos.id) {
	// 		useEffect(() => {
	// 			const deleteMethod = {
	// 				method: "DELETE", // Method itself
	// 				headers: {
	// 					"Content-type": "application/json" // Indicates the content
	// 				}
	// 				// No need to have body, because we don't send nothing to the server.
	// 			};
	// 			// Make the HTTP Delete call using fetch api
	// 			fetch(
	// 				"https://assets.breatheco.de/apis/fake/todos/user/GuillermoSR",
	// 				deleteMethod
	// 			)
	// 				.then(res => res.json())
	// 				.then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
	// 				.catch(err => console.log(err)); // Do something with the error
	// 		}),
	// 			[];
	// 	}
	// }
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
			{/* <button onClick={deleteAll(todos.id)}>Delete All</button> */}
			<ul>
				{todos.map(todo => {
					return (
						<li key={todos.id}>
							{todo.label}
							<button onClick={() => deleteTask(todo.id)}>
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
