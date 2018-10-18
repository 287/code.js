/**
 * 只能测试同步方法
 *
 **@define {array} testParam
 **@param {string} testParam[0] - 测试说明
 **@param {array} testParam[1] - testMethod的参数数组
 **@param {*} testParam[2] - 期望的返回结果
 **@param {function} testParam[3] - 处理返回结果
 *
 * @include isArray, isFunction, isEqual
 * @param {array<testParam>|testParam} testParams
 * @param {function} testMethod
 * @return {*}
 */
function testMethod(testParams, testMethod, op){
	testParams = isArray(testParams[0]) ? testParams : [testParams];
	let falseCount = 0;
	let timeCount = 0;
	let rss = [];
	console.log(`=== test start ==============================================`);
	
	op = Object.assign({
		verbose: false,
	}, op);
	
	testParams.forEach((testParam, i)=>{
		let receive, rs;
		let time = Date.now();
		receive = testMethod(...testParam[1]);
		if(isFunction(testParam[2])){
			testParam[2] = testParam[2](...testParam[1]);
		}
		if(isFunction(testParam[3])){
			receive = testParam[3](receive);
		}
		time = Date.now() - time;
		timeCount += time;
		rs = {
			// index: i + 1,
			test: testParam[0],
			params: testParam[1],
			expect: testParam[2],
			receive: receive,
			is: isEqual(receive, testParam[2]),
			duration: time,
			mark: '',
		};
		if(!rs.is){
			falseCount++;
			rs.mark = '!!!!!!'
		}
		rss.push(rs);
		op.verbose && console[rs.is ? 'log' : 'warn'](rs);
	});
	
	let tip = '';
	if(falseCount === 0){
		tip = `all success`;
	}else if(falseCount === testParams.length){
		tip = `all fail`;
	}else{
		tip = `success: ${testParams.length - falseCount}, fail: ${falseCount}`;
	}
	
	console.table && console.table(rss.map((rs)=> { rs = Object.assign({}, rs); rs.params = JSON.stringify(rs.params); return rs; }));
	let colors = {
		error: '#f00',
		warn: '#f00',
		info: '#ff0',
		log: '#333',
	};
	console.log(`=== test end @ ${timeCount}ms # all: ${testParams.length}, ${tip} ==========`);
}