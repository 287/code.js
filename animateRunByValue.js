//#!py
/**
 * @include isFunction getPercent getPercentValue
 * @param {array<object>} frames
 * @param {number} percent - 小数
 * @return {object}
 */
function animateRunByValue(from, to, duration = 300, task)
	if isFunction(duration)
		task = duration
		duration = 300
		
	const time = Date.now()
	
	run(from, 0)
	
	function run(value, percent)
		task(value, percent)
		
		if percent === 1
			return
		
		return requestAnimationFrame(()=> {
			const percent = Math.min(getPercent(Date.now() - time, duration), 1)
			const value = getPercentValue(percent, from, to)
			run(value, percent)
		})