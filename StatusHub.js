class StatusHub {
	constructor(){
		this.status = {};
	}
	is(key){
		let rs = this.status[key];
		if(rs !== undefined){
			if(this.defaultStatus && (rs = this.defaultStatus[key])){
				rs = this.defaultStatusValue;
			}
		}
		return rs;
	}
	setStatus(key, value){
		this.status[key] = value;
	}
}