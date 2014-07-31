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

	return output;
    }
    
    var array = function() {

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
	if (current() === '"')
	    return string();
    };


    return value();
};
