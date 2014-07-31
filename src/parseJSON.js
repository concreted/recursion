// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:

// Referencing:
// http://oreilly.com/javascript/excerpts/javascript-good-parts/json.html 
// http://progzoo.net/wiki/Recursive_Descent_Parser_Tutorial

var parseJSON = function(json) {
    var i = 0;

    var current = function() {
	if (i > json.length) {
	    throw new SyntaxError("Unexpected end of input");
	}

	return json[i];
    };

    var next = function() {
	return json[i++];
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

	while ((current() >= '0' && current() <= '9') || current() === '.') {
	    output += next();
	}
	
	if (output === '') {
	    throw new SyntaxError("no number");
	}
	
	output = +output;

	if (isNaN(output)) {
	    throw new SyntaxError("bad number");
	}
	
	return output;
    };

    var string = function() {
	var output = '';

	if (current() !== '"') {
	    throw new SyntaxError('string: expected "');
	}

	next();

	while (current() !== '"') {
	    if (current() === '\\') {
		next();
	    }
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
	    throw new SyntaxError('bool: invalid');
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
	    throw new SyntaxError('bool: invalid');
	}

	throw new SyntaxError('bool: invalid');	
    }
    
    var array = function() {
	if (current() !== '[') {
	    throw new SyntaxError('array: expected [');
	}

	next();

	var output = [];
	while (current() !== ']') {
	    output.push(value());
	    
	    if (current() === ',') {
		next();
	    }
	    else if (current() !== ']') {
		throw new SyntaxError('array: expected ]');
	    }

	}

	next();

	return output;
    };

    var object = function() {
	if (current() !== '{') {
	    throw new SyntaxError("object: expected {");
	}
	
	next();

	var output = {};

	while (current() !== '}') {
	    var key = value();	    

	    if (current() !== ':') {
		throw new SyntaxError("object: expected :");
	    }

	    next();

	    var val = value();

	    if (current() !== ',' && current() !== '}') {
		throw new SyntaxError("object: expected ,");
	    }

	    output[key] = val;

	    if (current() === ',') {
		next();
	    }
	    
	}

	next();

	return output;

    };

    var nul = function() {
	var val = next();
	if (val !== 'n') {
	    throw new SyntaxError("null: expected n");
	}
	val += (next());
	val += (next());
	val += (next());
	
	if (val !== 'null') {
	    throw new SyntaxError("null: expected null");
	}

	return null;

    }

    var value = function() {
	whitespace();

	var output = null;

	if (current() === '-' || (current() >= '0' && current() <= '9')) 
	    output = number();
	if (current() === '[')
	    output = array();
	if (current() === '{')
	    output = object();
	if (current() === 't' || current() === 'f') 
	    output = bool();
	if (current() === '"')
	    output = string();
	if (current() === 'n')
	    output = nul();

	whitespace();

	return output;
    };

    if (!json) return null;

    //console.log(json);

    return value();
};
