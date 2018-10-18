/**
 * @include eachPointPath, addBeelineNode
 * @param {object} style
 * @param {element} [style.parent = document.body]
 * @param {object} [style.attrs = {}]
 * @return {element}
 */
function addLineNode(path, style){
	eachPointPath(path, (path)=>{
		let lastPoint = null;
		path.forEach((p, i)=>{
			if(i !== 0){
				addBeelineNode(lastPoint, p, style);
			}
			lastPoint = p;
		});
	});
}

// addLineNode([
	// [300, 300],
	// [200, 200],
	// [400, 200],
	// [400, 400],
// ])