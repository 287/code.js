/**
 * @include toArray
 */
function filterByNodeType(nodes){
	var rs = [];
	toArray(nodes).forEach(function(node){
		if(node.nodeType === 1){
			rs.push(node);
		}
	});
	return rs;
}