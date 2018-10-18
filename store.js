function store(key, value){
	if(value !== undefined){
		return localStorage.setItem(key, JSON.stringify(value)) || value;
	}else{
		return JSON.parse(localStorage.getItem(key) || 'null');
	}
}