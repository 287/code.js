/**
 * @include random
 * @param {object} op
 * @param {number} [op.count = 10]
 * @param {number} [op.item = 100]
 * @param {boolean} [op.rotate = false]
 * @param {array<number>} [op.range = [100, 500]]
 */
function randomLinePath(op){
	op = Object.assign({
		count: 10,
		item: 100,
		rotate: false,
		range: [100, 500],
	}, op);
	const list = [];
	for(let i = 0; i < op.count; i++){
		let p = [i * op.item, random(...op.range)];
		p = op.rotate ? p.reverse() : p;
		list.push(p);
	}
	return list;
}