function splitStringByIndexs(text, indexs){
	let lastText = text;
	let lastIndex = 0;
	let list = [];
	// if(indexs[0] !== 0){
		// list.push(text.slice(0, index));
	// }
	indexs.forEach((index)=>{
		let prev = text.slice(lastIndex, index);
		list.push(prev);
		// lastText = text.slice(index);
		lastIndex = index;
	});
	list.push(text.slice(lastIndex));
	// list.push(lastNode);
	return list;
}