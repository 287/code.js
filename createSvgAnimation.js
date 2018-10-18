/**
 * @include toArrayIfNot setNodeAttrs getObjectExceptKeys renameObjectKeys createSvgNode eachObject
 * @param {string} type - linear or radial
 * @param {array<number>} position - length must be 4 or 6
 * @param {array<array<percent, color>>} colorList
 * @return {element}
 */
function createSvgAnimation(list){
	list = toArrayIfNot(list);
	let nodes = [];
	list.forEach((animation)=>{
		let ops = getObjectExceptKeys(animation, ['frame']);
		
		ops.delay = ops.delay || 0
		ops.count = ops.count || 'indefinite';
		ops.additive = ops.additive || 'sum';
		ops.calcMode = ops.calcMode || '';
		
		renameObjectKeys(ops, {
			delay: 'begin',
			duration: 'dur',
			count: 'repeatCount',
			timing: 'calcMode',
		});
		
		if(ops.motion){
			let mpathNode;
			if(ops.path.charAt(0) === '#'){
				mpathNode = createSvgNode(tagName);
				setNodeAttrs(mpathNode, {
					href: ops.path,
				});
				delete ops.path;
			}
			let node = pushNode('animateMotion', ops);
			if(mpathNode){
				node.appendChild(mpathNode);
			}
			
		}else{
			let frame = animation.frame;
			let percents = Object.keys(frame);
			let attrKeys = Object.keys(frame[percents[0]]);
			let times = percents.map(v=> v/100);
			let attrs = {};
			
			
			attrKeys.forEach((key)=>{
				let values = percents.map((p)=> frame[p][key]);
				attrs[key] = [times, values];
			});
			
			const transformKeys = ['scale', 'rotate', 'translate'];
			const colorKeys = ['fill', 'stroke'];
			
			eachObject(attrs, ([times, values], key)=>{
				let tagName = 'animate';
				if(transformKeys.includes(key)){
					tagName = 'animateTransform';
				}else if(colorKeys.includes(key)){
					tagName = 'animateColor';
				}
				
				let attrs = Object.assign({}, ops);
				if(tagName === 'animateTransform'){
					attrs.type = key;
					attrs.attributeName = 'transform';
				}else{
					attrs.attributeName = key;
				}
				if(times.length > 1){
					attrs.keyTimes = times.join('; ');
					attrs.values = values.join('; ');
				}else{
					attrs.to = values[0];
				}
				
				pushNode(tagName, attrs);
			});
		}
	});
	
	return nodes;
	
	
	function pushNode(tagName, attrs){
		let node = createSvgNode(tagName);
		setNodeAttrs(node, attrs);
		nodes.push(node);
		return node;
	}
}

// let nodes = createSvgAnimation([
	// {
		// duration: 1,
		// delay: 2,
		// count: 10,
		// frames: {
			// 0: {
				// x: 1,
				// scale: 1,
			// },
			// 100: {
				// x: 10,
				// scale: 2,
			// },
		// },
	// }
// ]);

// nodes.forEach((node)=> document.body.append(node))
// console.log(nodes)