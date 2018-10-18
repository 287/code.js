//#!py
/**
 * @desc 获取圆上点
 * @param {point} origin
 * @param {number} r
 * @param {number} angle - 0度是xy轴中的x轴
 * @param {boolean} [round = true] - 取整
 * @return {point}
 */
function getPointOnCircle(origin, r, angle, round = true)
	angle = angle % 360
	if angle < 0
		angle += 360
		
	const p = [0, 0]
	const index = Math.floor(angle / 90) % 4
	angle = angle % 90
	
	if angle === 0
		select index
			case 0
				p[0] = r
			case 1
				p[1] = r
			case 2
				p[0] = r * -1
			case 3
				p[1] = r * -1
	else
		angle = index % 2 === 1 ? 90 - angle : angle
	
		p[1] = Math.sin(Math.PI / 180 * angle) * r
		p[0] = Math.sqrt(Math.pow(r, 2) - Math.pow(p[1], 2))
		
		select index
			case 1
				p[0] *= -1
			case 2
				p[0] *= -1
				p[1] *= -1
			case 3
				p[1] *= -1
	
	
	p.forEach((v, i)=> {
		v += origin[i]
		if round
			v = Math.round(v)
		p[i] = v
	})
	
	return p