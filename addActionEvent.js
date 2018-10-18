/**
 * bind: click dblclick move up keydown key up
 * @param {element} dom
 * @param {function} fn
 * @param {object} [op]
 * @param {number} [op.offset = 3] - offset of mouse move when mouse press
 * @param {number} [op.delay = 260] - the time sep of dblclick
 */
function addActionEvent(dom, fn, op){
	var timers = {};
	var lasts = {};
	op = Object.assign({
		offset: 3
		, delay: 260
	}, op);
	
	['mousedown', 'mouseup', 'mousemove', 'keydown', 'keyup'].forEach(function(key){
		addEvent(dom, key, action);
	});
	
	
	function emit(type, e){
		e.actionType = type;
		switch(type){
			case 'press':
				lasts.isPress = true;
			break; case 'down':
				lasts.isDown = true;
			break; case 'drag':
				var offset = [0, 0];
				if(!lasts.isDrag){
					lasts.isDrag = e;
				}else{
					offset = [e.x - lasts.isDrag.x, e.y - lasts.isDrag.y]
				}
				e.dragX = offset[0];
				e.dragY = offset[1];
				// lasts.isDrag = true;
			break; case 'up':
				lasts.isPress = lasts.isDown = lasts.isDrag = false;
		}
		
		lasts[type] = e;
		typeof fn === 'function' && fn(type, e);
	}
	
	function action(e){
		//* down move up and click dblclick press drag
		var type = e.type.replace(/^(mouse)/, '');
		var isMove, isDblclick, isFirstTime;
		
		switch(type){
			//* move drag
			case 'move':
				isMove = lasts.move ? isMoved(lasts.move, e, 0) : true;
				if(isMove){
					emit('move', e);
					if(lasts.isDown){
						emit('drag', e);
					}
					
					if(timers.press || timers.click || timers.dblclick){
						isMove = isMoved(lasts.down, e, op.offset);
						if(isMove){
							clearTimeout(timers.press);
							clearTimeout(timers.click);
							clearTimeout(timers.dblclick);
						}
					}
				}
				
			//* down press
			break; case 'down':
				emit('down', e);
				clearTimeout(timers.click);
				//* make press event
				timers.press = setTimeout(function(){
					!lasts.isDrag && emit('press', e);
				}, op.delay);
			
			//* up click dblclick	
			break; case 'up':
				var lastUp = lasts.up;
				emit('up', e);
				clearTimeout(timers.press);
				
				if(e.timeStamp - lasts.down.timeStamp < op.delay){
					isFirstTime = lastUp ? e.timeStamp - lastUp.timeStamp < op.delay : false;
					isDblclick = lasts.dblclick ? lastUp.timeStamp !== lasts.dblclick.timeStamp : true;
					
					if(isFirstTime && isDblclick){
						emit('dblclick', e);
					}else{
						timers.click = setTimeout(function(){
							emit('click', e);
						}, op.delay);
					}
				}
			break; default:
				emit(type, e);
		}
	}
	
	function isMoved(e, e2, offset){
		return !(Math.abs(e.x - e2.x) <= offset && Math.abs(e.y - e2.y) <= offset);
	}
	
	function addEvent(el, type, fn){
		return el && (el.addEventListener ? el.addEventListener(type, fn, false) : el.attachEvent && el.attachEvent('on' + type, fn));
	}
}