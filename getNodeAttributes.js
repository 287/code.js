/**
 * @include toArray
 * @param {element} node
 * @return {object}
 */
function getNodeAttributes(node){
	let attrs = {}
	toArray(node.attributes).forEach(item=>{
		attrs[item.name] = item.value;
	});
	return attrs;
}