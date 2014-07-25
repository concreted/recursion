// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
    // your code here
    /*
    console.log(document.body);
    console.log(document.body.childNodes);
    console.log(document.body.classList);
    */
    var recursivelyFindIn = function(nodes) {
	if (nodes.length === 0) {
	    return [];
	}

	var head = nodes[0];
	//console.log(head);
	//console.log(nodes);
	var result = head.className === undefined ? [] : head.className.indexOf(className) >= 0 ? [head] : [];

	var tail = nodes.slice(1, nodes.length);
	tail = tail.concat(Array.prototype.slice.call(head.childNodes));


	//console.log(nodes);
	//console.log(Array.prototype.slice.call(head.childNodes));
	//console.log(tail);
	
	return result.concat(recursivelyFindIn(tail));	
    }

    return recursivelyFindIn([document.body]);

};
