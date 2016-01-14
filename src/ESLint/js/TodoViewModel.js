import * as ko from "knockout";
import { Todo } from "TodoModels";

let todos = new WeakMap();

export default class TodoViewModel {
	get Todos() { return todos.get(this); }

	constructor() {
		todos.set(this, ko.observableArray());
		this.Current = ko.observable();
	}

	AddItem(title) {
		todos.get(this).push(new Todo({ title }));
	}

	RemoveItem(item) {
		todos.get(this).remove(item);
	}

	EditItem() {

	}
}