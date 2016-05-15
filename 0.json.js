window.JSON = window.JSON || {};
window.JSON.stringify = window.JSON.stringify || function (s){
	return console.error('JSON.stringify error: no this function') || '';
};
window.JSON.parse = window.JSON.parse || function (s){
	return eval('(' + s + ')');
};
