import * as ko from "knockout";


let _completed = new WeakMap();
let _title = new WeakMap();
let _editing = new WeakMap();

export class Todo {
	get Completed() { return _completed.get(this); }
	set Completed(value) { _completed.get(this)(value); }
	get Title() { return _title.get(this); }
	set Title(value) { _title.set(this, value); }
	get Editing() { return _editing.get(this); }
	set Editing(value) { _editing.get(this)(value); }

	constructor({ title, completed = false, editing = false }) {
		this.Title = title;
		_completed.set(this, ko.observable(completed));
		_editing.set(this, ko.observable(editing));
	}
}