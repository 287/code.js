function createBlobUrl(data, type){
	switch(typeof data){
		case 'string':
			data = data.split('');
	}
	var blob = new Blob(data, type);
	return URL.createObjectURL(blob);
}