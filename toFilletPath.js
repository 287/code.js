/**
 * @include getFilletControlPoint
 * @param {array} path
 * @param {number} radius
 * @return {array}
 */
function toFilletPath(path, radius){
	let list = [];
	let prevPoint, nextPoint;
	let closedPath = false;
	path.forEach((p, i, path)=>{
		let prevPoint = path[i - 1];
		let nextPoint = path[i + 1];
		
		if(closedPath){
			if(i === 0){
				prevPoint = path[path.length - 1];
			}else if(i === path.length - 1){
				nextPoint = path[0];
			}
		}
		
		if(prevPoint === undefined || nextPoint === undefined){
			return ;
		}
		
		let controlPoints = getFilletControlPoint(prevPoint, p, nextPoint, radius);
		
		
		list.push(controlPoints[0]);
		list.push(p.slice(0, 2).concat(controlPoints[1], controlPoints[2]));
		
	});
	return list;
}