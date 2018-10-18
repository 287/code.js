/**
 * @include httpGet
 */
function getTTS(text, op, cb){
	if(!cb){
		cb = op;
		op = null;
	}
	op = op || {};
	let url = `https://cn.bing.com/ttaSpeak?language=en&gender=${op.gender}&format=audio/mp3&text=${text}`;
	httpGet(url, cb);
}