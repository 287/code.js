/**
 * @include isArray, toNumber, getAnimationFrameByFrames, getEasingRatio
 * @param {object} conf - animation config
 * @param {object} conf.frames - 动画帧的时间对象
 * @param {number} [conf.duration] - animation time (s) 动画单次运动时长
 * @param {number} [conf.delay = 0] - 延迟时间 (s)
 * @param {number} [conf.count = 0] - Number of animations 动画运动次数 0即不限制
 * @param {boolean} [conf.alternate = true] - 是否往返播放
 // * @param {object} op
 * @param {number} duration - 持续时长(ms)
 * @return {number}
 */
function getAnimationFrame(conf, duration){
	conf = Object.assign({
		duration: 0,
		delay: 0,
		count: 0,
		alternate: true,
	}, conf);
	conf.delay *= 1000;
	conf.duration *= 1000;
	
	let reverse = false;
	// let {duration} = op;
	// no animate durtion time
	if(duration <= 0){
		return ;
	}
	// 动画持续时长
	let runTime = duration - conf.delay;
	if(runTime <= 0){
		//* animate not start
		return ;
	}
	
	// 动画播放次数
	let playTimeCount = Math.floor(runTime / conf.duration);
	// 判断次数是否超限
	// console.log(playTimeCount)
	if(conf.count && playTimeCount >= conf.count){
		//* animate not start
		return ;
	}
	let percent = (runTime % conf.duration) / conf.duration;
	if(conf.alternate){
		if(playTimeCount % 2 === 1){
			reverse = !reverse;
		}
	}
	if(reverse){
		percent = 1 - percent;
	}
	
	percent = getEasingRatio(percent);
	// console.log('percent', toNumber(percent, 2));
	
	const targetFrame = getAnimationFrameByFrames(conf.frames, percent);
	
	return targetFrame;
}