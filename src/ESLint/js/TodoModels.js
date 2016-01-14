import * as ko from "knockout";


let completed = new WeakMap();
let title = new WeakMap();
let editing = new WeakMap();

export class Todo {
	get Completed() { return completed.get(this); }
	set Completed(value) { completed.set(this, value); }
	get Title() { return title.get(this); }
	set Title(value) { title.set(this, value); }
	get Editing() { return editing.get(this); }
	set Editing(value) { editing.set(this, value); }

	constructor({ title, completed = false, editing = false }) {
		this.Title = title;
		this.Completed = completed;
		this.Editing = editing;
	}
}