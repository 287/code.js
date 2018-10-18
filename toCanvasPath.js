/**
 * @type lineTo
 * @input-params [x, y]
 * @input-length 2, 3, 4
 * @input-params [x, y, type, radius]
 * @ouput-params [x, y]
 */
 
 /**
 * @type arcTo
 * @input-length 6
 * @ouput-length 5
 * @input-params [x, y, controlPointX, controlPointY, radius, 'a']
 * @ouput-params [controlPointX, controlPointY, x, y, radius]
 */
 
/**
 * @type quadraticCurveTo
 * @input-length 4
 * @ouput-length 4
 * @input-params [x, y, controlPointX, controlPointY]
 * @ouput-params [controlPointX, controlPointY, x, y]
 */
 
/**
 * @type arc
 * @input-length 5
 * @ouput-length 6
 * @input-params [x, y, r, startAngle, endAngle]
 * @ouput-params [x, y, r, startAngle, endAngle, reverse]
 */
 
/**
 * @type bezierCurveTo
 * @input-length 6
 * @ouput-length 6
 * @input-params [x, y, controlPointOneX, controlPointOneY, controlPointTwoX, controlPointTwoY]
 * @ouput-params [controlPointOneX, controlPointOneY, controlPointTwoX, controlPointTwoY, x, y]
 */
 
/**
 * @include eachPointPath, isClosedPath, transformCanvasPoint
 * @param {array} path
 * @param {object} op
 * @param {string} [op.pathJoin]
 * @param {number} [op.pathJoinValue]
 * @param {array} [op.matrix]
 * @return {array}
 */
function toCanvasPath(path, op){
	let newPath = [];
	
	eachPointPath(path, (path)=>{
		let list = [];
		let closedPath = isClosedPath(path);
		let lastPointIndex = path.length - (closedPath ? 2 : 1); 
		let {pathJoin, pathJoinValue, matrix} = op;
		
		path.forEach((p, i)=>{
			if(i > lastPointIndex){
				return ;
			}
			// debugger
			
			switch(p.length){
			case 2:
				if(pathJoin){
					list.push(...alterPoint(pathJoin, pathJoinValue, p, i, path, closedPath, lastPointIndex));
					p = null;
				}else{
					p = toCanvasPoint(p, i);
				}
				
			break; case 3: case 4:
				if(isString(p[2]) && p[3]){
					pathJoin = p[2];
					pathJoinValue = p[3] ;
					alterPoint(pathJoin, pathJoinValue, path, i, prevPoint, p, nextPoint);
				}else{
					p = toCanvasPoint(p);
				}
				
			break; default:
				p = toCanvasPoint(p);
				
			}
		
			if(p !== null){
				list.push(p);
			}
		});
		
		// if(pathJoin && closedPath){
		if(closedPath){
			list.push(list[0]);
		}
		
		matrix && list.forEach((p, i)=>{
			list[i] = transformCanvasPoint(p, matrix);
		});
		
		if(list.length > 1){
			newPath.push(list);
		}
	});
	
	return newPath.length === 1 ? newPath[0] : newPath;
	
	
	/**
	 * @include toCanvasPoint
	 * @param {string} type
	 * @param {number} param
	 * @param {array<point>} path
	 * @param {point} prevPoint
	 * @param {point} p
	 * @param {point} nextPoint
	 * @return {array<point>}
	 */
	function alterPoint(type, param, p, i, path, closedPath, lastPointIndex){
		let prevPoint = path[i - 1];
		let nextPoint = path[i + 1];
		let list;
		if(closedPath){
			if(i === 0){
				prevPoint = path[lastPointIndex];
			}else if(i === lastPointIndex){
				nextPoint = path[0];
			}
		}
		
		switch(type){
		case 'curve':
			list = toCurve(prevPoint, p, param, op.curveMode);
		break; case 'fillet': case 'chamfer':
			list = toFillet(prevPoint, p, nextPoint, param, type);
		}

		if(!list){
			list = [toCanvasPoint(p, i)];
		}
		list = list.map(p=> toCanvasPoint(p, i));
		return list;
	}
	
	/**
	 * @param {point} prevPoint
	 * @param {point} p
	 * @param {number} curvature - gt 0 is render in x otherwise in y
	 * @return {array<point>}
	 */
	function toCurve(prevPoint, p, curvature = .5, mode = 'x'){
		let list = [];
		if(!prevPoint){
			list.push(p);
		}else{
			let goup = mode === 'x' && p[1] > prevPoint[1] || mode === 'y' && p[1] < prevPoint[1] ? 1 : -1;
			let middle = p.map((v, i)=> (v - prevPoint[i]) / 2);
			let middlePoint = middle.map((v, i)=> v + prevPoint[i]);
			let offsetRatios = mode === 'x' ? [1, 0] : [0, 1];
			let offset = middle.map((v, i)=> v * offsetRatios[i] * curvature);
			/**
			 * x: up: +--+, down: ++--
			 * y: up: -++-, down: ++--
			 */
			let controlRatio;
			if(goup){
				if(mode === 'x'){
					controlRatio = [1, -1, -1, 1];
				}else{
					controlRatio = [-1, 1, 1, -1];
				}
			}else{
				controlRatio = [1, 1, -1, -1];
			}
			let controlPoint1 = offset.map((v, i)=> prevPoint[i] + v * controlRatio[i]);
			let controlPoint2 = offset.map((v, i)=> p[i] + v * controlRatio[i + 2]);
			
			list.push(middlePoint.concat(controlPoint1));
			list.push(p.slice(0, 2).concat(controlPoint2));
		}
		return list;
	}
	
	/**
	 * @include getFilletControlPoint
	 * @param {point} prevPoint
	 * @param {point} p
	 * @param {point} nextPoint
	 * @param {number} radius
	 * @param {string} type - [fillet|chamfer]
	 * @return {array<point>}
	 */
	function toFillet(prevPoint, p, nextPoint, radius = 5, type = 'fillet'){
		let list;
		if(prevPoint !== undefined && nextPoint !== undefined){
			list = [];
			let controlPoints = getFilletControlPoint(prevPoint, p, nextPoint, radius);
			
			list.push(controlPoints[0]);
			if(type === 'chamfer'){
				list.push(controlPoints[1]);
			}else{
				list.push(controlPoints[1].concat(p, [controlPoints[2], 'a']));
			}
		}
			
		return list;
	}
}