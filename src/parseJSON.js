// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

// Referencing:
// http://oreilly.com/javascript/excerpts/javascript-good-parts/json.html 
// http://progzoo.net/wiki/Recursive_Descent_Parser_Tutorial

var parseJSON = function(json) {
    var text = json;
    var i = 0;

    // Parse JSON
    var parse = function(input) {
	
    };

    var current = function() {
	return text[i];
    };

    var next = function() {
	return text[i++];
    };

    var whitespace = function() {
	while (/\s/.test(current())) {
	    next();
	}
    };

    var number = function() {
	var output = '';

	if (current() === '-') {  
	    output = next();
	}

	while (current() >= '0' && current() <= '9') {
	    output += next();
	}
	
	if (output === '') {
	    throw "no number";
	}
	
	output = +output;

	if (isNaN(output)) {
	    throw "bad number";
	}
	
	return output;
    };

    var string = function() {
	var output = '';

	if (current() !== '"') {
	    throw 'string: expected "';
	}

	next();

	while (current() !== '"') {
	    output += next();
	}

	next();

	return output;
    }

    var bool = function() {
	if (current() === 't') {
	    var val = next();
	    val += next();
	    val += next();
	    val += next();
	    if (val === 'true') {
		return true;
	    }
	    throw 'bool: invalid';
	}

	if (current() === 'f') {
	    var val = next();
	    val += next();
	    val += next();
	    val += next();
	    val += next();
	    if (val === 'false') {
		return false;
	    }
	    throw 'bool: invalid';
	}

	throw 'bool: invalid';	
    }
    
    var array = function() {
	if (current() !== '[') {
	    throw 'array: expected [';
	}

	next();

	var output = [];
	while (current() !== ']') {
	    output.push(value());
	    if (current() === ',') {
		next();
	    }
	    else if (current() !== ']') {
		throw 'array: expected ]';
	    }
	}

	next();

	return output;
    };

    var object = function() {
    
    };

    var value = function() {
	whitespace();

	if (current() === '-' || (current() >= '0' && current() <= '9')) 
	    return number();
	if (current() === '[')
	    return array();
	if (current() === '{')
	    return object();
	if (current() === 't' || current() === 'f') 
	    return bool();
	if (current() === '"')
	    return string();

	whitespace();
    };

    return value();
};
