/**
 * eg: <div id="wrap"><a on:click="show"></a></div>  &&  addNodeEvents(wrap, {show: function(){}});
 * e2: <div id="wrap"><a on:click="show?id=1&name=2"></a></div>  &&  addNodeEvents(wrap, {show: function(e, {node, id, name}){}});
 * @include isFunction, eachNode, getNodeAttributeNames, addEvent, removeEvent, splitOnce, string2object
 * @param {element} dom
 * @param {object} [op]
 * @param {string} [op.prefix = 'on:']
 * @param {object} events
 * @return {undefined}
 */
function addNodeEvents(dom, op, events){
	if(!events){
		events = op;
		op = null;
	}
	op = op || {};
	let prefix = op.prefix || 'on:';
	let ns = op.ns || 'default';
	
	eachNode(dom, (node)=> {
		let keys = getAttrsByPrefix(node, prefix);
		if(keys.length === 0){
			return ;
		}
		let options = node.byAddNodeEvents = node.byAddNodeEvents || {};
		let conf = options[ns] = options[ns] || {
			binds: {},
			events: {},
			prefix,
		};
		keys.forEach((key)=>{
			if(conf.binds[key]){
				if(conf.events[key] === events[key]){
					return ;
				}else{
					removeEvent(node, key, conf.binds[key]);
				}
			}
			conf.binds[key] = function(e){ return trigger(this, e, conf); };
			addEvent(node, key, conf.binds[key]);
		});
	});
	
	
	function trigger(node, e, conf){
		let methodName =  node.getAttribute(`${conf.prefix}${e.type}`);
		if(!methodName){
			return ;
		}
		let paramStr;
		let method;
		[methodName, paramStr] = splitOnce(methodName, '?');
		if(isFunction(method = events[methodName])){
			let param = {
				node,
			};
			if(paramStr){
				Object.assign(param, string2object(paramStr, ['=', '&']));
			}
			return method.call(node, e, param);
		}
	}
	
	function getAttrsByPrefix(node, prefix){
		const list = [];
		getNodeAttributeNames(node).forEach((key)=> (key.slice(0, prefix.length) === prefix) && list.push(key.slice(prefix.length)));
		return list;
	}
}