/**
 * @include toArray
 * @param {element} node
 * @param {string} [type = 'all'] - ['all', 'prev', 'next']
 * @return {array<element>}
 */
function getNodeSiblings(node, type){
	let list = [];
	if(node.parentNode){
		list = toArray(node.parentNode.childNodes);
		let index = list.indexOf(node);
		switch(type){
			case 'prev':
				list = list.slice(0, index);
			break; case 'next':
				list = list.slice(index + 1);
			break; default:
				list.splice(index, 1);
		}
	}
	return list;
}