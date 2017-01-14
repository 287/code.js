function createNode(html){
	var node = document.createElement('div')
	;
	node.innerHTML = (html || '').toString().replace(/^\s+|\s+$/g, '');
	return node.childNodes[0];
}