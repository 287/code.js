function addNode(node, pNode){
	(pNode || document.body || document.head).appendChild(node);
}