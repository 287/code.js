/**
 * @param {number} timer
 * @param {string} [cmd = null]
 * @return {undefined}
 */
function clearTimer(timer, cmd){
	if(isString(cmd)){
		switch(cmd){
			case 'a':
				cancelAnimationFrame(timer);
			break; case 'i':
				clearInterval(timer);
			break; case 't':
				clearInterval(timer);
		}
	}else{
		cancelAnimationFrame(timer);
		clearInterval(timer);
		clearTimeout(timer);
	}
}