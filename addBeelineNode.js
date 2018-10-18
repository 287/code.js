/**
 * @include getAngleOfPoint, getLengthOfTwoPoint, addOneNode, addPointNode
 * @param {object} style
 * @param {element} [style.parent = document.body]
 * @param {object} [style.attrs = {}]
 * @return {element}
 */
function addBeelineNode(p1, p2, style){
	style = Object.assign({
		background: '#333',
		size: 1,
	}, style);
	if(style.size){
		style.width = style.size;
		delete style.size;
	}
	var angle = getAngleOfPoint(p1, p2);
	angle -= 90;
	style.x = p1[0];
	style.top = p1[1];
	style.height = getLengthOfTwoPoint(p1, p2);
	style.transform = `rotate(${angle}deg)`;
	style.transformOrigin = `50% 0 0`;
	
	return addOneNode(style);
}