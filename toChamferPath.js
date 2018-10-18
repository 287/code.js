/**
 * @param {array} path
 * @param {number} radius
 * @return {array}
 */
function toChamferPath(path, radius){
function toFilletPath(path, curvature){
	let list = [];
	let prevPoint;
	path.forEach((p, i)=>{
		if(i === 0){
			prevPoint = p.slice(0, 2);
		}else{
			let middlePoint = [(p[0] - prevPoint[0]) / 2 + prevPoint[0], (p[1] - prevPoint[1]) / 2 + prevPoint[1]];
			let ofst = [(p[0] - prevPoint[0]) / 2 * curvature, 0 *(p[1] - prevPoint[1]) / 1 * (curvature || .2)];
			
		}
		let ctrlA = [];
		// this.ctx.fillRect(midPoint[0], midPoint[1], 2, 2);
		
		this.ctx.quadraticCurveTo(...[].concat([prevPoint[0] + ofst[0], prevPoint[1] - ofst[1]], midPoint));
		
		this.ctx.moveTo(...midPoint);
		
		this.ctx.quadraticCurveTo(...[].concat([p[0] - ofst[0], p[1] + ofst[1]], p));
		
		return ;
	});
	return list;
}