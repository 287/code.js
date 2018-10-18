/**
 * @include toNumberValue, toArrayIfNot, toCanvasPath, toNumberOrNull
 */
function parseCanvasNodeStyleByKey(key, value, rect, pRect){
	const rectKeys = ['width', 'height', 'left', 'top', 'right', 'bottom', 'x', 'y'];
	// const alterPathKeys = ['fillet', 'chamfer', 'curve'];
	let i;
	if((i = rectKeys.indexOf(key)) !== -1){
		value = toNumberValue(value, pRect[i % 2]);
	}else{
		switch(key){
		case 'origin': case 'translate':
			value = toArrayIfNot(value, 2).slice(0, 2);
			for(let i = 0; i < 2; i++){
				value[i] = toNumberValue(value[i], rect[i]);
			}
			
		break; case 'path':
			// value = toCanvasPath(value, rect);
			
		break; case 'scale':
			value = toArrayIfNot(value, 2).slice(0, 2);
			for(let i = 0; i < 2; i++){
				value[i] = toNumberOrNull(value[i]) || 1;
			}
			
		break; case 'rotate':
			value = toNumberOrNull(value);
		
		break; default:
			
		}
	}
	
	return value;
}