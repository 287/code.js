/**
 * 获取多层path中点的边界
 * @include eachPointPath
 * @param {array<Point>} path
 * @return {object}
 */
function getPathBounds(path){
	let lt = null, rb = [0, 0], i;
	
	eachPointPath(path, (path)=> path.forEach((p)=>{
		if(!lt){
			lt = p.slice(0, 2);
		}
		for(i = 0; i < 2; i++){
			if(p[i] < lt[i]){
				lt[i] = p[i];
			}else if(p[i] > rb[i]){
				rb[i] = p[i];
			}
		}
	}));
	
	return {
		width: rb[0] - lt[0],
		height: rb[1] - lt[1],
		left: lt[0],
		top: lt[1],
	};
}