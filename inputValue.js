function inputValue(name, value, parent){
	parent = parent || document;
	var nodes = parent.getElementsByName(name);
	if(nodes.length > 0){
		var tagName = nodes.tagName.toLowerCase();
		var type = nodes.type;
		switch(tagName){ case 'input':
			
			
		}
		if(value === undefined){
			return els[0].checked;
		}else{
			els[0].checked = value
		}
	}
	return null;
}