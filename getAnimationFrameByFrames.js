/**
 * @include isArray, getAnimationFrameByPercent
 * @param {object} frames
 * @param {number} percent - 小数
 * @return {object}
 */
function getAnimationFrameByFrames(frames, percent){
	let targetFrame;
	frames = isArray(frames) ? frames : Object.entries(frames);
	percent *= 100;
	for(let [i, [itemPercent, itemFrame]] of frames.entries()){
		if((itemPercent === 100 && itemPercent - percent < 100) || itemPercent === percent){
			targetFrame = itemFrame;
		}else if(i !== frames.length -1){
			let [nextPercent, nextFrame] = frames[i + 1];
			if(percent >= itemPercent && percent <= nextPercent){
				const targetPercent = (percent - itemPercent) / (nextPercent - itemPercent);
				targetFrame = getAnimationFrameByPercent(itemFrame, nextFrame, targetPercent);
			}
		}
	}
	
	return targetFrame;
}