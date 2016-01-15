import * as ko from "knockout";
import { Todo } from "TodoModels";

let todos = new WeakMap();
let _allCompleted = new WeakMap();

export default class TodoViewModel {
	get Todos() { return todos.get(this); }
	get AllCompleted() { return _allCompleted.get(this); }

	constructor() {
		todos.set(this, ko.observableArray());
		this.Current = ko.observable();
		_allCompleted.set(this, ko.computed(() => {
			return todos.get(this)().every(n => n.Completed);
		}));
	}

	AddItem(title) {
		todos.get(this).push(new Todo({ title }));
	}

	RemoveItem(item) {
		todos.get(this).remove(item);
	}

	EditItem(item) {
		item.Editing = true;
	}

	SaveEditing(item, value) {
		item.Editing = false;
	}
}