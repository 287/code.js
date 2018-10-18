
function createTextLoadingAnimation(op){
	return new TextLoadingAnimation(op);
}

class TextLoadingAnimation{
	constructor(op){
		const node = document.createElement('span');
		node.style.cssText = 'position:absolute; font-size: 12px; letter-spacing: 3px; transform: translateX(-50%); line-height: .5em;';
		
		Object.assign(this, {
			text: '...',
			dom: node,
			playing: false,
			timeout: 0,
			interval: 260,
			timer: null,
			duration: .6,
			timeoutColor: '#f00',
		}, op);
	}
	/**
	 * @include isNumber
	 */
	show(p){
		const node = this.dom;
		if(p){
			p = p.map(v=> isNumber(v) ? `${v}px` : v);
			node.style.left = p[0];
			node.style.top = p[1];
		}
		if(!this.playing){
			this.playing = true;
			document.body.appendChild(node);
			
			let i = 0;
			let text = this.text;
			this.timer = setInterval(()=>{
				i = i++ >= text.length ? 0 : i;
				node.innerHTML = text.slice(0, i);
			}, this.interval);
			
			node.innerHTML = text;
			node.style.width = `${node.clientWidth}px`;
			node.style.height = `${node.clientHeight}px`;
		}
		
		if(this.timeout){
			clearTimeout(this._timeouter);
			this._timeouter = setTimeout(()=>{
				this.hide(1);
			}, this.timeout);
		}
	}
	hide(timeout){
		if(!this.playing){
			return;
		}
		this._hideAnimate(timeout);
		this.playing = false;
		const node = this.dom;
		node.parentNode && node.parentNode.removeChild(node);
		clearInterval(this.timer);
	}
	/**
	 * @include appendStyleNode
	 */
	_hideAnimate(timeout){
		let duration = this.duration || 1;
		appendStyleNode(`
@keyframes loading-animate-frame {
	from {
		opacity: 1;
	}
	to {
		opacity: 0;
	}
}
.loading-animation {
	animation: loading-animate-frame ${duration}s forwards ease-in;
}
		`, 'loading-animation');
		
		let node = this.dom.cloneNode(1);
		node.className = 'loading-animation';
		node.innerHTML = this.text;
		if(timeout){
			node.style.color = this.timeoutColor;
		}
		document.body.appendChild(node);
		
		setTimeout(()=>{
			node.parentNode.removeChild(node);
		}, 1000 * duration);
	}
}