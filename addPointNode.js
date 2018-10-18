/**
 * @include addOneNode
 * @param {point} p
 * @param {object} [style]
 * @return {element}
 */
function addPointNode(p, style){
	style = Object.assign({
		background: '#333',
		size: 1,
	}, style, {
		x: p[0],
		y: p[1],
	});
	
	return addOneNode(style);
}