/**
 * 把数据赋值到节点上: 当同name的checkbox节点数量为1时，值是布尔值，大于1时是数组，其余字段是字符串
 * @param {element} wrapNode - 输入节点的父节点
 * @param {object} data - 
 * @return {undefined}
 */

function setFormData(wrapNode, data){
	for(var name in data){
		var value = data[name];
		if(value == null){
			continue;
		}
		var nodes = [].slice.call(document.querySelectorAll('[name='+ name +']', wrapNode));
		if(nodes.length === 0){
			continue ;
		}
		var valueType = typeof value;
		if(['number', 'string'].indexOf(valueType) > -1){
			if(nodes[0].type === 'radio'){
				nodes.forEach(function(node){
					node.checked = node.value === value + '';
				});
			}else{
				nodes[0].value = value;
			}
		}else if(valueType === 'boolean'){
			nodes[0].checked = value;
		}else if(value.constructor === Array){
			value = value.slice(0);
			value.forEach(function(v, i){
				value[i] = v + ''
			});
			nodes.forEach(function(node){
				node.checked = value.indexOf(node.value) !== -1;
			});
		}
	}
}