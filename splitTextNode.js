function splitTextNode(textNode, indexs){
	let lastNode = textNode;
	let list = [];
	let lastIndex = 0;
	0 && indexs.forEach((index)=>{
		let node = lastNode.splitText(index - lastIndex);
		list.push(lastNode);
		lastNode = node;
		lastIndex = index;
	});
	list.push(lastNode);
	return list;
}