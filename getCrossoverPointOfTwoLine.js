//#!py
/**
 * @include isEqualPoint
 */
function getCrossoverPointOfTwoLine(line1, line2)
	const [a, b] = line1
	const [c, d] = line2
  
    // 三角形abc 面积的2倍  
    const abc = (a[0] - c[0]) * (b[1] - c[1]) - (a[1] - c[1]) * (b[0] - c[0])
  
    // 三角形abd 面积的2倍  
    const abd = (a[0] - d[0]) * (b[1] - d[1]) - (a[1] - d[1]) * (b[0] - d[0])
  
    // 面积符号相同则两点在线段同侧,不相交 (对点在线段上的情况,本例当作不相交处理)
    if abc * abd >= 0
        return
  
    // 三角形cda 面积的2倍  
    const cda = (c[0] - a[0]) * (d[1] - a[1]) - (c[1] - a[1]) * (d[0] - a[0])
    // 三角形cdb 面积的2倍  
    // 注意: 这里有一个小优化.不需要再用公式计算面积,而是通过已知的三个面积加减得出.  
    const cdb = cda + abc - abd
	
    if cda * cdb >= 0
        return
  
    //计算交点坐标  
    const t = cda / ( abd- abc )
	const point = [0, 0].map((v, i)=> t * (b[i] - a[i]) + a[i])
	
    return point