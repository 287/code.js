/**
 * 把输入节点的数据合并成一个对象：当同name的checkbox节点数量为1时，值是布尔值，大于1时是数组，其余字段是字符串
 * @param {element} wrapNode - 输入节点的父节点
 * @param {string} [targetName] - 指定节点的name
 * @return {object} - 值类型只有 字符串、布尔值、数组 3种类型
 */

function getFormData(wrapNode, targetName){
	var data = {};
	var checkboxs = {};
	var name;
	[].forEach.call(wrapNode.querySelectorAll(targetName !== undefined ? '[name="' + targetName + '"]' : '[name]'), function(node){
		name = node.name;
		switch(node.type){
			case 'text': case 'number': case 'date': case 'range': case 'textarea': case 'select-one':
				data[name] = node.value;
			break; case 'radio':
				data[name] = data[name] == null ? '' : data[name];
				if(node.checked){
					data[name] = node.value;
				}
			break; case 'checkbox':
				checkboxs[name] = checkboxs[name] || [];
				checkboxs[name].push(node);
		}
	});
	for(name in checkboxs){
		var nodes = checkboxs[name];
		if(nodes.length === 1){
			data[name] = nodes[0].checked;
		}else{
			data[name] = [];
			nodes.forEach(function(node){
				if(node.checked){
					data[name].push(node.value);
				}
			});
		}
	}
	if(targetName !== undefined){
		data = data[targetName];
	}
	return data;
}