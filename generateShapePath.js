//#!py
/**
 * @include isArray generatePointOnCircle isNumber
 * @param {string} type
 * @param {object} op
 * @return {array<array<number>>}
 */
function generateShapePath(type, op, resetOrigin)
	const path = []
	let {x, y} = op
	
	if resetOrigin
		x = y = 0
		
	const origin = [x, y]
		
	
	select type
		/**
		 * 绘制矩形
		 * @param {number} x - 中心点x坐标
		 * @param {number} y - 中心点y坐标
		 * @param {array<number>} r - 矩形的半径，[横半径，纵半径]
		 */
		case 'rect'
			const {width, height, left, top} = op
			let r
			if top != null && left != null
				r = [width / 2, height / 2]
				x = r[0]
				y = r[1]
				if !resetOrigin
					x += left
					y += top
					
			path.push(
				[x - r[0], y - r[1]],
				[x + r[0], y - r[1]],
				[x + r[0], y + r[1]],
				[x - r[0], y + r[1]],
				[x - r[0], y - r[1]],
			);
		
		/**
		 * 绘制矩形
		 * @param {number} x - 中心点x坐标
		 * @param {number} y - 中心点y坐标
		 * @param {array<number>} r - 矩形的半径，[横半径，纵半径]
		 */
		case 'rectCorner'
			if(op.left != null || op.width != null){
				r = [op.width / 2, op.height / 2];
				x = op.left + r[0];
				y = op.top + r[1];
			}else{
				r = isArray(r) ? r : [r, r];
			}
			let corner = op.corner || 3;
			path.push(
				[
					[x - r[0], y - r[1] + corner],
					[x - r[0], y - r[1]],
					[x - r[0] + corner, y - r[1]],
				],
				[
					[x + r[0] - corner, y - r[1]],
					[x + r[0], y - r[1]],
					[x - r[0], y - r[1] + corner],
				],
				[
					[x + r[0], y + r[1] - corner],
					[x + r[0], y + r[1]],
					[x + r[0] - corner, y + r[1]],
				],
				[
					[x - r[0] + corner, y + r[1]],
					[x - r[0], y + r[1]],
					[x - r[0], y + r[1] - corner],
				],
			);
		
		/**
		 * @desc 绘制圆环或圆环的一部分
		 * @param {number} op.x
		 * @param {number} op.y
		 * @param {number} op.innerRadius
		 * @param {number} op.outerRadius
		 * @param {number} op.startsAngle
		 * @param {number} op.endsAngle
		 */
		case 'ring'
			const {innerRadius, outerRadius, startsAngle, endsAngle} = op
			
			if (startsAngle - endsAngle) % 360 === 0
				for let i = 0; i < 2; i++
					let r = i === 0 ? innerRadius : outerRadius
					path.push(
						generateShapePath('circle', {
							x,
							y,
							r,
						}, resetOrigin),
					)
				return path
			
			path.push(
				generatePointOnCircle(innerRadius, startsAngle, origin),
				generatePointOnCircle(outerRadius, startsAngle, origin),
				generatePointOnCircle(outerRadius, endsAngle, origin).concat([startsAngle, endsAngle, outerRadius]),
				generatePointOnCircle(innerRadius, endsAngle, origin),
			)
			path.push(path[0].concat([endsAngle, startsAngle, innerRadius]))
	
		/**
		 * @desc 绘制圆形
		 * @param {number} op.x
		 * @param {number} op.y
		 * @param {number} op.r
		 */
		case 'circle'
			const {r} = op
			for let i = 0; i < 2; i++
				let startsAngle = 180 * i
				path.push([
					generatePointOnCircle(r, startsAngle, origin),
					generatePointOnCircle(r, startsAngle + 180, origin).concat([startsAngle, startsAngle + 180, r]),
				])
		
		/**
		 * @desc 绘制圆形的一部分扇形
		 * @param {number} op.x
		 * @param {number} op.y
		 * @param {number} op.r
		 * @param {number} op.startsAngle
		 * @param {number} op.endsAngle
		 */
		case 'sector'
			const {r, startsAngle, endsAngle} = op
			if (startsAngle - endsAngle) % 360 === 0
				return generateShapePath('circle', op, resetOrigin)
				
			path.push(
				[x, y],
				generatePointOnCircle(r, startsAngle, origin),
				generatePointOnCircle(r, endsAngle, origin).concat([startsAngle, endsAngle, r]),
				[x, y],
			);
	
	
		/**
		 * 绘制圆上的一段弧线
		 * @param {number} x - 中心点x坐标
		 * @param {number} y - 中心点y坐标
		 * @param {number} r - 弧线的半径
		 * @param {array<number>} angle - 弧线的角度，[起始角，结束角]，角度
		 */
		case 'arc':
			path.push(
				generatePointOnCircle(r, angle[0], origin),
				generatePointOnCircle(r, angle[1], origin),
			);
		
		/**
		 * 绘制圆半径上的一段线 - 半径线
		 * @param {Point} origin - 半径线的圆心
		 * @param {array<number>} r - 半径线的半径，[起始半径，结束半径]
		 * @param {number} angle - 半径线的角度，角度
		 */
		case 'radius':
			path.push(
				generatePointOnCircle(r[0], angle, origin),
				generatePointOnCircle(r[1], angle, origin),
			);
	
		/**
		 * @desc 绘制正多边形
		 * @param {number} op.x
		 * @param {number} op.y
		 * @param {number} op.r
		 * @param {number} op.sides - 边数
		 * @param {number|boolean} [op.revise] - 修正的角度 - 如果是true则旋转每个角的度数
		 */
		case 'polygon'
			const {r, sides = 4, revise} = op
			const perAngleDeg = 360 / sides
			let rotate = 0
			
			if revise
				if isNumber(revise)
					rotate = revise
				else
					rotate = perAngleDeg / 2
				
			for let i = 0; i < sides; i++
				const p = generatePointOnCircle(r, perAngleDeg * i - 90 + rotate, origin)
				path.push(p)
		
			if path.length > 0
				path.push(path[0])
		
		/**
		 * @desc 绘制多角形
		 * @param {number} op.x
		 * @param {number} op.y
		 * @param {number} op.innerRadius
		 * @param {number} op.outerRadius
		 * @param {number} op.angles - 角数
		 * @param {number|boolean} [op.revise] - 修正的角度 - 如果是true则旋转每个角的度数
		 */
		case 'isogon'
			const {innerRadius, outerRadius, angles = 4, revise} = op
			const perAngleDeg = 360 / angles / 2
			const r = [outerRadius, innerRadius]
			let rotate = 0
			
			if revise
				if isNumber(revise)
					rotate = revise
				else
					rotate = perAngleDeg
				
			for let i = 0; i < angles * 2; i++
				const p = generatePointOnCircle(r[i % 2], perAngleDeg * i - 90 + rotate, origin)
				path.push(p)
			
			if path.length > 0
				path.push(path[0])
	return path