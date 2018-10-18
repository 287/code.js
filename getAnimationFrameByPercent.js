/**
 * @include isArray, isNumber, getPercentValue
 * @param {array<object>} frames
 * @param {number} percent - 小数
 * @return {object}
 */
function getAnimationFrameByPercent(startFrame, endFrame, percent){
	let frame;
	for(let [key, startValue] of Object.entries(startFrame)){
		let endValue = endFrame[key];
		let value;
		if(isArray(startValue)){
			value = startValue.slice(0);
			for(let [i, itemStartValue] of startValue.entries()){
				if(isNumber(itemStartValue)){
					let itemEndValue = endValue[i];
					value[i] = getPercentValue(percent, itemStartValue, itemEndValue);
				}
			}
		}else if(isNumber(startValue)){
			value = getPercentValue(percent, startValue, endValue);
		}else{
			value = startValue;
		}
		frame = frame || {};
		frame[key] = value;
	}
	return frame;
}