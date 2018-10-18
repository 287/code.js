/**
 * @include toNumber, roundScaleValue
 * @param {array<number>} range
 * @param {object} [op]
 * @param {number} [op.section] - 每段的差值
 * @param {array<number>} [op.range] - 范围修正
 * @deprecated {number} [op.count = 4] - 分段数（只在没有指定op.section时生效）
 * @return {array<number>}
 */
function getScaleList(range, op){
	op = op || {};
	if(op.range){
		op.range.forEach(function(value, i){
			if(value != null){
				range[i] = value;
			}
		});
	}
	var max = Math.max(range[0], range[1]);
	var min = Math.min(range[0], range[1]);
	var dValue = max - min;
	
	if(dValue === 0){
		return [min, max];
	}
	// get sectionValue
	var sectionValue = op.section;
	if(!sectionValue){
		var nums = [4, 5, 6];
		for(var i = 0; i < nums.length; i++){
			if(dValue % nums[i] === 0){
				sectionValue = dValue / nums[i];
				break;
			}
		}
		if(!sectionValue){
			sectionValue = roundScaleValue(dValue / nums[0]);
		}
	}else{
		var maxNum = 100;
		var count = Math.ceil(dValue / sectionValue);
		if(count > maxNum){
			sectionValue = Math.ceil(count / maxNum) * sectionValue
		}
	}
	
	// get list
	var value = Math.floor(min / sectionValue) * sectionValue;
	var scaleList = [];
	
	push(value);
	
	while(value < max){
		value += sectionValue;
		push(value);
	}
	
	if(scaleList.length === 1){
		push(value);
	}
	
	return scaleList;
	
	function push(val){
		return scaleList.push(toNumber(value));;
	}
}