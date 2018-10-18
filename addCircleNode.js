/**
 * @include addOneNode
 * @param {object} style
 * @param {element} [style.parent = document.body]
 * @param {object} [style.attrs = {}]
 * @return {element}
 */
function addCircleNode(origin, r, style){
	style = Object.assign({
		background: '#333',
		size: r * 2,
		x: origin[0],
		y: origin[1],
		borderRadius: '50%',
	}, style);
	
	return addOneNode(style);
}