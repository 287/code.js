/**
 * @param {*} o - data
 * @param {string} [cb = ''] - callback name, data type [json, jsonp, jsonph]
 * @return {string}
 */
function exportJson(o, cb){
	let json = JSON.stringify(o);
	let type, rs;
	
	cb = cb || '';
	type = !cb ? '' : /jsonph|parent/.test(cb) ? 'jsonph' : 'jsonp';
	
	switch(type){
		case 'jsonp':
			rs = `${cb}(${json})`;
		break; case 'jsonph':
			rs = `<script>${cb}(${json})</script>`;
		break; default:
			rs = json
	}
	
	return rs;
}