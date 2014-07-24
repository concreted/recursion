// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
    var tail = arguments[1]

    if (obj === undefined) {
	return undefined;
    }

    if (Array.isArray(obj)) {
	if (obj.length === 0) {
	    if (!tail)
		return '[]';
	    return ']';
	}

	var head = obj.slice(0,1)[0];
	obj = obj.slice(1, obj.length);
	var prefix = tail ? ',' : '[';
	return prefix + stringifyJSON(head) +  stringifyJSON(obj, true);
    };

    if (typeof obj === 'object' && obj !== null) {
	if (Object.keys(obj).length === 0) {
	    if (!tail)
		return '{}';
	    return '}';
	}

	var keys = Object.keys(obj);

	var tailObj = {};
	for (var i in keys) {
	    tailObj[keys[i]] = obj[keys[i]];
	}

	var key = keys[0];
	var val = tailObj[key];
	delete tailObj[key];

	var keyValuePair = (typeof val === "function" || val === undefined) ? '' : stringifyJSON(key) + ':' + stringifyJSON(val)

	var prefix = !tail ? '{' : keyValuePair === '' ? '' : ',';
	
	return prefix + keyValuePair + stringifyJSON(tailObj, true);

    };

    if (typeof obj === "string") return '"' + obj + '"';
    return '' + obj;
};

/*
console.log(stringifyJSON());
console.log(stringifyJSON(9));
console.log(stringifyJSON(null));
console.log(stringifyJSON(true));
console.log(stringifyJSON(false));
console.log(stringifyJSON("Hello world"));
console.log(stringifyJSON([]));
console.log(stringifyJSON([8]));
console.log(stringifyJSON(["hi"]));
console.log(stringifyJSON([8, "hi"]));
console.log(stringifyJSON([1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]));
console.log(stringifyJSON([[],3,4]));
console.log(stringifyJSON([8, [[],3,4]]));
console.log(stringifyJSON([[[["foo"]]]]));
console.log(stringifyJSON({}));
console.log(stringifyJSON({"a": "apple"}));
console.log(stringifyJSON({"foo": true, "bar": false, "baz": null}));
console.log(stringifyJSON({"boolean, true": true, "boolean, false": false, "null": null }));
console.log(stringifyJSON({"a":{"b":"c"}}));
console.log(stringifyJSON({"a":["b", "c"]}));
console.log(stringifyJSON([{"a":"b"}, {"c":"d"}]));
console.log(stringifyJSON({"a":[],"c": {}, "b": true}));
*/