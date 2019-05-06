//#!py
/**
 * @include createNode getNodesByAttr callFunction removeNode
 * @param {object} op 
 * @param {any} [op.value]
 * @param {function} [op.onsubmit]
 * @param {function} [op.oncancel]
 * @param {function} [op.oninput]
 * @param {function} [op.onchange]
 * @return {inputelement}
 */
function createInputWithEvent(op)
	const node = createNode('<span input-wrap><input type="input"><button type="submit" style="width:1em;margin:0 .2em;">√</button><button type="cancel" style="width:1em">×</button></span>')
	const nodes = getNodesByAttr(node, 'type')
	const {input} = nodes
	
	Object.assign(node, nodes)
	
	if op.value != null
		input.value = op.value
	
	['onchange', 'input'].forEach(type=> input[type] = (e)=> callFunction(op[type], input.value, e))
	
	input.onkeyup = (e)=>
		let rs
		select e.keyCode
			case 27
				rs = callFunction(op.oncancel)
			case 13
				rs = callFunction(op.onsubmit, input.value)
				
		if rs
			removeNode(node)
			
	['cancel', 'submit'].forEach(type=> nodes[type].onclick = (e)=> callFunction(op[`on${type}`], input.value, e))
		
	return node