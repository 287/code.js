/**
 * @param {object} op
 * @param {number} [op.muted = false]
 * @param {number} [op.volume = 1] - 0 to 1
 * @param {string} [op.src = null]
 * @param {function} [op.onplay = null]
 * @param {function} [op.oncanplay = null]
 * @param {function} [op.onattrchange = null]
 * @return {AudioSimplePlayer}
 */
function createAudioPlayer(op){
	return new AudioSimplePlayer(op);
}

/**
 * @include eachObject
 */
class AudioSimplePlayer {
	constructor(op){
		this.dom = new Audio;
		this.onerror = ()=>{};
		eachObject(op, (value, key)=> this.attr(key, value));
	}
	
	play(src){
		if(src){
			this.attr('src', src);
		}
		this.dom.play().catch(this.onerror);
	}
	
	pause(){
		this.dom.pause();
	}
	
	attr(key, value){
		if(value === undefined){
			let rs = this[key];
			if(rs === undefined){
				rs = this.dom[key]
			}
			return rs;
		}else{
			this[key] = value;
			this.dom[key] = value;
			this.onattrchange && this.onattrchange(key, value);
		}
	}
}