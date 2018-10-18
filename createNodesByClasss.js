/**
 * 按object的key去创建节点，按object的结构去插入节点树，返回按key为key的object
 * @include eachObject, isFunction
 * @param {object} classs
 * @param {object} [op = {}]
 * @param {function} [op.createNode = null]
 * @param {string} [op.tagName = 'div']
 * @param {string} [op.attrName = 'role']
 * @return {object}
 */
function createNodesByClasss(classs, op = {}){
	let nodes = {};
	
	create(classs);
	
	return nodes;
	
	function create(obj, pNode){
		eachObject(obj, (value, key)=>{
			let node;
			if(isFunction(op.createNode)){
				node = op.createNode(key);
			}else{
				node = document.createElement(op.tagName || 'div');
				node.setAttribute(op.attrName || 'role', key);
			}
			if(node){
				nodes[key] = node;
				pNode && pNode.appendChild(node);
			}
			if(value){
				create(value, node);
			}
		});
	}
}