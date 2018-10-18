function createStorage(op){
	return new WebStorage(op);
}

class WebStorage{
	/**
	 * @include addEvent
	 */
	constructor(op){
		this.conf = {};
		op = Object.assign(this.conf, {
			context: 'localStorage',
			dataKey: 'storage_data',
			prefix: '_S_',
			autosave: !false,
			ondestroy: ()=> this.save(),
		}, op);
		
		this.storage = window[op.context];
		this.data = {};
		this.load();
		
		if(op.autosave){
			addEvent(window, 'beforeunload', op.ondestroy);
		}
	}
	
	get(key){
		return JSON.parse(this.storage.getItem(`${this.conf.prefix}${key}`) || 'null');
	}
	
	set(key, value){
		return this.storage.setItem(`${this.conf.prefix}${key}`, JSON.stringify(value)) || value;
	}
	
	remove(key){
		return this.storage.removeItem(`${this.conf.prefix}${key}`);
	}
	
	/**
	 * @include isEmptyObject
	 */
	save(){
		if(!isEmptyObject(this.data)){
			this.set(this.conf.dataKey, this.data);
		}
	}
	
	/**
	 * @include emptyObject
	 */
	load(){
		return Object.assign(emptyObject(this.data), this.get(this.conf.dataKey));
	}
	
	/**
	 * @include removeEvent
	 */
	destroy(){
		removeEvent(window, 'beforeunload', op.ondestroy);
	}
}