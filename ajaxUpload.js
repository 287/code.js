/**
 * @include randomNumber, formAjaxPost
 * @param {string} url
 * @param {function} cb - cb(err, rs)
 * @return {htmlformelement} cb - cb(err, rs)
 */
function ajaxUpload(url, cb){
	var node = document.createElement('div');
	var id = 'upload-button-' + randomNumber();
	node.innerHTML = '<form action="'+ url +'" method="post" enctype="multipart/form-data"><label upload-button for="'+ id +'"></label><input type="file" name="file" id="'+ id +'" onchange="this.parentNode.submit()"></form>';
	var form = node.childNodes[0];
	formAjaxPost(form, cb);
	return form;
}