/**
 * 计算点的位置，避免因body滚动产生的偏移
 * @param {array<number>} p
 * @return {array<number>}
 */
function toPositionInBody(p){
	var rs = [document.body.scrollLeft, document.body.scrollTop];
	rs.forEach(function(v, i){
		rs[i] += p[i];
	});
	return rs;
}