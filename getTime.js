/**
 * @param {~boolean} [second = false] - just second
 * @return {number}
 */
function getTime(second){
	var time = Date.now ? Date.now() : new Date().getTime();
	return second ? Math.round(time / 1000) : time;
}