(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define(["exports", "knockout", "TodoModels"], factory);
	} else if (typeof exports !== "undefined") {
		factory(exports, require("knockout"), require("TodoModels"));
	} else {
		var mod = {
			exports: {}
		};
		factory(mod.exports, global.knockout, global.TodoModels);
		global.TodoViewModel = mod.exports;
	}
})(this, function (exports, _knockout, _TodoModels) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var ko = _interopRequireWildcard(_knockout);

	function _interopRequireWildcard(obj) {
		if (obj && obj.__esModule) {
			return obj;
		} else {
			var newObj = {};

			if (obj != null) {
				for (var key in obj) {
					if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
				}
			}

			newObj.default = obj;
			return newObj;
		}
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	var todos = new WeakMap();

	var TodoViewModel = function () {
		_createClass(TodoViewModel, [{
			key: "Todos",
			get: function get() {
				return todos.get(this);
			}
		}]);

		function TodoViewModel() {
			_classCallCheck(this, TodoViewModel);

			todos.set(this, ko.observableArray());
			this.Current = ko.observable();
		}

		_createClass(TodoViewModel, [{
			key: "AddItem",
			value: function AddItem(title) {
				todos.get(this).push(new _TodoModels.Todo({
					title: title
				}));
			}
		}, {
			key: "RemoveItem",
			value: function RemoveItem(item) {
				todos.get(this).remove(item);
			}
		}, {
			key: "EditItem",
			value: function EditItem() {}
		}]);

		return TodoViewModel;
	}();

	exports.default = TodoViewModel;
});
//# sourceMappingURL=TodoViewModel.js.map
