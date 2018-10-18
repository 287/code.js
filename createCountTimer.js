function createCountTimer(key){
	return new CountTimer(key);
}

class CountTimer{
	constructor(key){
		this.times = {};
		this.start(key);
	}
	
	start(key){
		this.times[key] = Date.now();
	}
	
	end(key){
		return Date.now() - this.times[key];
	}
}