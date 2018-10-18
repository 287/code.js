function splitCanvasText(text, fontsize, width, ctx){
	let lines = [];
	let lastText = [];
	let lastLength = 0;
	let cache = {};
	for(let i = 0, l = text.length; i < l; i++){
		let c = text.charAt(i);
		let code = c.charCodeAt(0);
		let len = 0;
		let isEnter = isAdd = false;
		
		if(code === 10){
			isEnter = true;
			len = 0;
		}else if(code === 9){
			len = fontsize * 2;
			c = '    ';
		}else if(code > 255){
			len = fontsize;
		}else{
			len = cache[c] = cache[c] || ctx.measureText(c).width;
		}
		
		if(len + lastLength > width){
			isEnter = true;
			isAdd = true;
		}else{
			lastLength += len;
			lastText.push(c);
		}
		
		if(isEnter){
			lines.push({
				text: lastText.join(''),
				length: lastLength,
			});
			lastText = [];
			lastLength = 0;
		}
		
		if(isAdd){
			lastText.push(c);
			lastLength += len;
		}
	}
	lines.push({
		text: lastText.join(''),
		length: lastLength,
	});
	
	return lines;
}