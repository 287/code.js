/*
 * @include isFunction
 */
function ajaxGet(url, cb){
	var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	if(isFunction(cb)){
		xhr.onreadystatechange = function (){
			var err = null, rs;
			if(xhr.readyState === 4){
				if(xhr.status === 200){
					rs = xhr.responseText;
				}else{
					err = 'ajax get error';
				}
				cb(err, rs);
			}
		};
	}
	xhr.open('GET', url, true);
	setTimeout(function(){
		xhr.send();
	}, 0);
	return xhr;
}