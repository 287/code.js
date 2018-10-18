/**
 * @include createSvgNode
 * @param {string} type - linear or radial
 * @param {array<number>} position - length must be 4 or 6
 * @param {array<array<percent, color>>} colorList
 * @return {element}
 */
function createSvgClip(type, position, colorList){
	let tagName = type === 'radial' ? 'radialGradient' : 'linearGradient';
	let attrs = type === 'radial' ? ['cx', 'cy', 'r', 'fx', 'fy'] : ['x1', 'y1', 'x2', 'y2'];
	
	let node = createSvgNode(tagName);
	attrs.forEach((key, i)=>{
		node.setAttribute(key, position[i]);
	});
	
	colorList.forEach((colorItem)=> {
		let item = createSvgNode('stop');
		['offset', 'stop-color'].forEach((key, i)=> {
			item.setAttribute(key, colorItem[i]);
		});
		node.appendChild(item);
	});
	
	return node;
}