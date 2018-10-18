/**
 * @include isFunction isObject addEvent splitUrl scrollIntoView whenPageReady
 * @param {object|function} op
 * @param {function} [op.onchange]
 * @param {function} [op.onanchor]
 * @param {object} [op.win]
 * @return {undefined}
 */
function onHashPathChange(cb){
	let op = {
		onchange: null,
		onanchor: null,
		win: null,
	};
	
	if(isFunction(cb)){
		op.onchange = cb;
	}else if(isObject(op)){
		Object.assign(op, cb)
	}
	
	let win = op.win || window;
	let lastHashPath = null;
	
	onchange();
	addEvent(win, 'hashchange', onchange);
	
	function onchange(e){
		let hash = win.location.hash.slice(1);
		if(hash.charAt(0) === '/'){
			let item = splitUrl(hash);
			if(lastHashPath === null && item.hash){
				whenPageReady(()=> setTimeout(()=> scrollIntoView(item.hash.slice(1))));
			}
			if(lastHashPath !== item.path){
				lastHashPath = item.path;
				op.onchange && op.onchange(item);
			}
		}else{
			op.onanchor && op.onanchor(hash);
			if(lastHashPath != null){
				let url = '#' + lastHashPath + '#' + hash;
				win.location.replace(url);
			}
		}
	}
}