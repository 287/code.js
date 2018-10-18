class NumberIterator{
	constructor(num){
		this.count = num;
		this.index = 0;
		this.done = false;
		this.value = 0;
	}
	[Symbol.iterator](){
		return this;
	}
	next(){
		if(this.index < this.count){
			this.value = this.index++;
		}else{
			this.done = true;
			this.value = undefined;
		}
		return this;
	}
}