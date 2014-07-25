// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){

    var recursivelyFindIn = function(nodes) {
	if (nodes.length === 0) {
	    return [];
	}

	var headNode = nodes[0];
	var head = headNode.className !== undefined && headNode.className.indexOf(className) >= 0 ? [headNode] : [];
	var tail = nodes.slice(1, nodes.length).concat(Array.prototype.slice.call(headNode.childNodes));;
	
	return head.concat(recursivelyFindIn(tail));	
    }

    return recursivelyFindIn([document]);

};
