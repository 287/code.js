/**
 * @include setNodeStyle
 * @param {object} style
 * @param {element} [style.parent = document.body]
 * @param {object} [style.attrs = {}]
 * @return {element}
 */
function addOneNode(style){
	let node = document.createElement('i');
	let pNode = document.body;
	if(style.parent){
		pNode = style.parent
		delete style.parent;
	}
	if(style.attrs){
		for(let key in style.attrs){
			node.setAttribute(key, style.attrs[key]);
		}
		delete style.attrs;
	}
	style = Object.assign({
		position: 'absolute',
	}, style);
	if(style.size){
		style.width = style.height = style.size;
	}
	if(style.x){
		style.left = style.x - style.width / 2;
	}
	if(style.y){
		style.top = style.y - style.height / 2;
	}
	setNodeStyle(node, style);
	document.body.append(node);
}