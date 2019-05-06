//#!py
/**
 * @include toOptionNodesData createOptionNodes setNodeChild
 * @param {array<object|array|any>|object} options
 * @param {object} [op]
 * @param {element} [op.node]
 * @param {string} [op.textKey]
 * @param {any} [op.valueKey]
 * @param {any} [op.value]
 * @return {<element>}
 */
function createSelectNode(options, op = {})
	const selectNode = op.node || document.createElement('select')
	
	let [values, texts] = toOptionNodesData(options, op)
	
	setNodeChild(selectNode, ...createOptionNodes(values, texts))
	
	if op.value != null
		selectNode.value = op.value

	return selectNode