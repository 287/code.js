function getMacAddress(isAll){
	const os = require('os');
	let o = os.networkInterfaces();
	let mac;
	for(let key in o){
		let list = o[key];
		list.some((info)=>{
			if(info.mac && info.mac !== '00:00:00:00:00:00'){
				if(isAll){
					info.key = key;
					mac = info;
				}else{
					mac = info.mac;
				}
				return true;
			}
		})
		if(mac) break;
	}
	return mac;
}