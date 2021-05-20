import React, { Component } from "react";

//include images into your bundle
import ToDoList from "./ToDoList"

//create your first component
export function Home() {
	return (
		<div> <ToDoList/>	
		</div>
	);
}
