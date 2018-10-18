//#!py
/**
 * @desc 计算外卖价格满减后的实际支付价格
 * @param {array<number>} prices - 每件标的价格
 * @param {number} total - 实际总价
 * @param {boolean} returnMap
 * @return {object|array}
 */
function calcWaimaiPerPrice(prices, total, returnMap)
	let _total = prices.reduce((total, price)=> total += price)
	let ratio = (total / _total).toFixed(2) * 1
	let list = prices.map((p, i)=> (total * p / _total).toFixed(2) * 1)
	let rs = list
	if returnMap
		rs = {ratio}
		prices.forEach((p, i)=> rs[p] = list[i])
	return rs
	