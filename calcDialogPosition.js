/**
 * 计算弹框在显示框的位置，避免弹框出现在外框以外
 * @param {array<number>} p
 * @param {object} dialogRect
 * @param {number} dialogRect.width
 * @param {number} dialogRect.height
 * @param {object} wrapRect
 * @param {number} wrapRect.width
 * @param {number} wrapRect.height
 * @return {array<number>}
 */
function calcDialogPosition(p, dialogRect, wrapRect){
	if(!wrapRect){
		wrapRect = {
			width: document.body.clientWidth,
			height: document.body.clientHeight,
		};
	}
	var rs = [];
	rs[0] = wrapRect.width - dialogRect.width;
	rs[1] = wrapRect.height - dialogRect.height;
	rs.forEach(function(v, i){
		if(v > 0){
			rs[i] = Math.min(p[i], v);
		}else if(v < 0){
			rs[i] = 0;
		}
	});
	return rs;
}