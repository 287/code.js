/**
 * @include eachNode, getNodeAttributeNames, isMatchByFirstEndString, eachObject, getParamsFromFunctionBody, toFunction, toWithString, object2string, removeNode, insertNodeBefore
 */
function addNodeScope(node){
	let conf = {
		prefix: 'ng-',
		prefixs: ['{{', '}}'],
	};
	// console.log(scope)
	NodeScope.initNode(node);
	
	// return scope;
}

class NodeScope{
	/**
	 * @include createConcatFpsRunner
	 */
	constructor(){
		this.$options = {
			data: {},
			binds: [],
			updates: [],
			runner: createConcatFpsRunner(12),
		};
	}
	
	$set(key, value){
		this.$options.data[key] = value;
		this.$updateByKey(key);
	}
	
	$update(){
		
	}
	
	$updateView(){
		let ops = this.$options;
		if(ops.updates.length){
			ops.updates.forEach((op)=> {
				this.constructor.applyNode(op.node, op.key, op.value, op);
			});
			ops.updates = [];
		}
		console.log('updateView')
	}
	
	$updateByKey(key){
		this.$options.binds.forEach((param)=>{
			if(param.keys.includes(key)){
				this.$run(param);
			}
		});
	}
	
	$add(param){
		this.$options.binds.push(param);
		param.keys.forEach((key)=>{
			this.$options.data[key] = '';
		});
		this.$run(param);
	}
	
	$run(op){
		let rs = op.task.call(this, op.param);
		rs = this.constructor.toResult(rs, op.key);
		if(rs !== op.value){
			op.value = rs;
			let ops = this.$options;
			if(!ops.updates.includes(op)){
				ops.updates.push(op)
				ops.runner.run(()=> this.$updateView());
			}
		}
		// op.value = this.constructor.toResult(rs, op.key);
		// let rs = runcb(attrScope, scope);
		
		
		// parseCmd(node, cmd, value);
		// this.$binds.push(param);
		// this.updateByNode(param.node, param.key);
	}
	
	/**
	 * @include insertNodeBefore
	 */
	$applyEach(token, param){
		let op = this.$options.binds.find((op)=> op.token === token);
		op.nodes = op.nodes || [];
		let node = op.node.cloneNode(1);
		insertNodeBefore(node, op.placeholder);
		this.constructor.initNode(node, this, param);
		op.nodes.push(node);
	}
	
	/**
	 * @include removeArrayValueByFunction, removeNode
	 */
	$clearEach(token){
		let op = this.$options.binds.find((op)=> op.token === token);
		if(op.nodes){
			let nodes = op.nodes;
			removeArrayValueByFunction(this.$options.binds, (op)=> {
				if(nodes.includes(op.node)){
					removeNode(op.node);
					return true;
				}
			});
		}
	}
	
	/**
	 * @include eachSimple
	 */
	$each(...args){
		if(args[0]){
			return eachSimple(...args);
		}
	}
	
	
	/**
	 * @include eachNode
	 */
	static initNode(node, scope, param){
		scope = scope || this.getScope();
		this.parseNode(node, scope, param);
		eachNode(node, {nodeTypes: [1, 3, 8]}, (node)=> this.parseNode(node, scope, param));
	}
	
	
	/**
	 * @include getNodeAttributeNames, isMatchByFirstEndString, insertNodeBefore, removeNode, addEvent, random, getNodeSiblings
	 */
	static parseNode(node, scope, param){
		let nodeType = node.nodeType;
		param = param || this.$scopeParam;
		let exp;
		let add = (key, exp, op)=> {
			let task;
			let token = random();
			let keys;
			if(key === 'each'){
				let obj = this.parseEachExps(exp);
				exp = obj.object;
				keys = this.getParams(exp);
				exp = `this.$clearEach(${token}),  this.$each(${obj.object}, (${obj.keyValue})=>{ ${obj.if} this.$applyEach(${token}, {${obj.keyValue}}); })`;
			}
			
			let notExpKeys = ['model'];
			if(notExpKeys.includes(key)){
				if(key === 'model'){
					addEvent(node, 'input', ()=> scope.$set(exp, node.value));
					// key = value;
				}else{
					
				}
			}else{
				// keys = this.getParams(exp);
			}
			keys = keys || this.getParams(exp);
			
			scope.$add(Object.assign({
				keys,
				key,
				token,
				exp,
				task: task || this.wrapFunction(exp, keys),
				param,
				node,
			}, op));
		};
		switch(nodeType){
			case 1:
				let attrs = this.getAttrs(node);
				if(attrs.scope){
					this.removeAttrs(node, ['scope']);
					this.initNode(node, this.getScope(attrs.scope));
					return true;
				}else if(attrs.each){
					let key = 'each';
					let exp = attrs.each;
					this.removeAttrs(node, ['each']);
					add(key, exp, {
						placeholder: this.insertPlaceholder(node, 1),
					});
					return true;
				}else{
					this.removeAttrs(node, Object.keys(attrs));
					eachObject(attrs, (exp, key)=>{
						let param = {};
						if(['if', 'else-if', 'else'].includes(key)){
							param.placeholder = this.insertPlaceholder(node, 1);
							param.placeholder._ifKey = key;
							param.placeholder._ifExp = exp;
							if(['else-if', 'else'].includes(key)){
								let ifExps = [];
								eachArray(getNodeSiblings(param.placeholder, 'prev'), (node)=>{
									if(node._ifExp){
										ifExps.push(`!(${node._ifExp})`);
										if(node._ifKey === 'if'){
											return false;
										}
									}
								}, 'reverse');
								if(ifExps.length){
									if(key === 'else-if'){
										ifExps.reverse().push(`(${exp})`);
									}
									exp = ifExps.join(' && ');
								}
							}
						}
						add(key, exp, param);
					});
				}
			break; case 3:
				this.getParamsFromTextNode(node).forEach(([exp, textNode])=>{
					node = textNode;
					add('textContent', exp);
				});
				// exp = node.textContent;
				// console.log(exp)
				// exp.
				// add('textContent', exp);
				
			break; case 8:
				// parseCommentNode(node);
				exp = node.textContent;
				
				if(isMatchByFirstEndString(exp, [':', ''])){
					exp = exp.slice(1);
					node = this.insertPlaceholder(node, 1);
					add('textContent', exp);
				}
		}
	}
	
	
	/**
	 * @include insertNodeBefore, removeNode, setNodeDisplay
	 */
	static applyNode(node, key, value, op){
		const ignoreKeys = ['each'];
		const keyAliases = {
			model: 'value',
		};
		key = keyAliases[key] || key;
		// const keys = ['textContent', 'value'];
		// return;
		
		// let type = types[key] || types.default;
		// value = this.toResult(value, type);
		
		
		if(ignoreKeys.includes(key)){
			// nothing;
		}else if(['if', 'else-if', 'else'].includes(key)){
			if(value){
				if(!node.parentNode){
					insertNodeBefore(node, op.placeholder);
					removeNode(op.placeholder);
				}
			}else{
				if(node.parentNode){
					insertNodeBefore(op.placeholder, node);
					removeNode(node);
				}
			}
		}else if(['show', 'hide'].includes(key)){
			value = key === 'show' ? value : !value;
			setNodeDisplay(node, value);
		}else if(key in node){
			node[key] = value;
		// }else if(`on${key}` in node){
			// node[`on${key}`] = value;
		}else{
			node.setAttribute(key, value);
		}
		console.log('apply', op.token, key)
	}
	
	
	static toResult(result, key){
		const types = {
			// keys: ['class'],
			// object: ['style'],
			// boolean: ['show', 'hide', 'if', 'else-if', 'else'],
			class: 'keys',
			style: 'object',
			if: 'boolean',
			'else-if': 'boolean',
			else: 'boolean',
			show: 'boolean',
			hide: 'boolean',
			default: 'string',
		};
		
		let type = types[key] || types.default;
		let rs;
		switch(type){
			case 'boolean':
				rs = !!result;
			break; case 'keys':
				rs = [];
				eachObject(result, (value, key)=>{
					if(value){
						rs.push(key);
					}
				});
				rs = rs.join(' ')
			break; case 'object':
				rs = object2string(result, [':', ';']);
			break; default:
				rs = result != null ? result.toString() : '';
		}
		return rs;
	}
	
	
	/**
	 * @include insertNodeBefore, removeNode
	 */
	static insertPlaceholder(node, replace){
		let placeholder = document.createTextNode('');
		insertNodeBefore(placeholder, node);
		if(replace){
			removeNode(node);
		}
		return placeholder;
	}
	
	
	/**
	 * @include getParamNamesFromString, isMatchByFirstEndString, string2object, removeArrayDuplicateValues
	 */
	static getParams(str){
		let keys = [];
		let isObjectCmd = isMatchByFirstEndString(str, ['{', '}']);
		if(isObjectCmd){
			eachObject(string2object(str.slice(1, -1), [':', ',']), (value, key)=>{
				keys.push(...getKeys(value));
			});
		}else{
			keys.push(...getKeys(str));
		}
		return removeArrayDuplicateValues(keys);
		
		function getKeys(str){
			return getParamNamesFromString(str);
		}
	}
	
	
	/**
	 * @include toWithString
	 */
	static wrapFunction(text, needKeys){
		let withString = toWithString(needKeys);
		return Function('params', `${withString} with(this.$options.data){ with(params || {}){\n return ${text} \n}}`);
	}
	
	
	/**
	 * @include matchAll, insertNodeBefore, splitTextNode, removeNode
	 */
	static getParamsFromTextNode__(node){
		let text = node.textContent;
		let matchs = text.replace(/\{\{(.*?)\}\}/g, ()=>{
			
		});
		if(!matchs.length){
			return ;
		}
		
	}
	/**
	 * @include matchAll, insertNodeBefore, splitStringByIndexs, removeNode
	 */
	static getParamsFromTextNode(node){
		let text = node.textContent;
		let list = [];
		let matchs = matchAll(text, /\{\{(.*?)\}\}/g);
		if(!matchs.length){
			return list;
		}
		let indexs = [].concat(...matchs.map((match)=> [match.index, match.index + match[0].length]));
		let texts = splitStringByIndexs(text, indexs);
		
		for(let i = 0; i < texts.length - 1; i += 2){
			let prevText = texts[i];
			let exp = texts[i + 1].slice(2, -2);
			let placeholder = document.createTextNode('');
			let prevNode = document.createTextNode(prevText);
			
			list.push([
				exp,
				placeholder,
			]);
			insertNodeBefore(prevNode, node);
			insertNodeBefore(placeholder, node);
		}
		node.textContent = texts[texts.length - 1];
		return list;
	}
	
	
	/**
	 * @include getNodeAttributeNames, isMatchByFirstEndString
	 */
	static getAttrs(node){
		let prefix = this.conf.prefix;
		let names = getNodeAttributeNames(node).filter(name=> isMatchByFirstEndString(name, [prefix, '']));
		let attrs = {};
		names.forEach(name=> {
			attrs[name.slice(prefix.length)] = node.getAttribute(name);
			// node.removeAttribute(name);
		});
		return attrs;
	}
	
	/**
	 * @include getNodeAttributeNames, isMatchByFirstEndString
	 */
	static removeAttrs(node, keys){
		let prefix = this.conf.prefix;
		keys.forEach(key=> {
			node.removeAttribute(prefix + key);
		});
	}
	
	
	/**
	 * @include getNodeAttributeNames, isMatchByFirstEndString, insertNodeBefore, insertNodeBefore, removeNode, addEvent
	 */
	static parseEachExps(exp){
		let ifItem;
		[exp, ifItem] = exp.split(' if ');
		let [object, keyValue] = exp.split(' as ');
		let [value, key = '']  = keyValue.split(',');
		ifItem = ifItem ? `if(!(${ifItem})) return; ` : '';
		return {
			object,
			keyValue,
			key,
			value,
			if: ifItem,
		};
	}
	
	
	/**
	 * @include whenPageReady
	 */
	static init(){
		whenPageReady(()=> this.initNode(document.documentElement));
	}
	
	
	static getScope(name){
		let scope = this.scopes[name] = this.scopes[name] || new this;
		return scope;
	}
	
	
	static get conf(){
		return {
			prefix: ':',
			prefixs: [':', ''],
		};
	}
}

NodeScope.scopes = {};
NodeScope.conf = {
	prefix: ':',
};

NodeScope.def('header', {
	data: {
		moth: 6,
	},
})

// NodeScope.def('header', {
	// data: {
		// moth: 6,
	// },
// })


NodeScope.init();
window.NodeScope = NodeScope;
// console.log(NodeScope.getScope('header'))