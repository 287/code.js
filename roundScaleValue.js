/**
 * @include toNumber
 */
function roundScaleValue(value){
	var absValue = Math.abs(value);
	var intValue = Math.floor(value);
	var decimals = absValue - intValue;
	var symbol = value === 0 ? value : value / absValue;
	var powRatio = 1;
	
	if(absValue === 0){
		// value = 0;
	}else if(intValue === 0){ //小数
		value = alignDecimals(decimals);
	
	}else if(decimals === 0){ //整数
		value = alignInteger(intValue);
		
	}else{ //整数+小数
		value = alignInteger(intValue);
		if(value === intValue){
			value += alignDecimals(decimals, 1);
			value = toNumber(value);
		}
	}
	
	value *= symbol;
	
	return value;
	
	function alignDecimals(value, hasInt){
		var len = decimals.toString().length - 2;
		if(hasInt && len > 2){
			return 1;
		}
		powRatio = Math.pow(10, len);
		intValue = decimals * powRatio;
		value = alignInteger(intValue);
		value /= powRatio;
		return toNumber(value);
	}
	
	function alignInteger(value){
		var factor = 5;
		if(value <= 100){
			factor = 1;
		}else if(value <= 1000){
			if(value % 3 === 0 || value % 5 === 0){
				factor = 1;
			}else{
				// factor = 5
			}
		}else{
			if(value % 10 === 0){
				factor = 1;
			}else{
				// factor = 5
			}
			// factor = 5
		}		
		value = factor === 1 ? value : Math.ceil(value / factor) * factor;
		return value;
	}
}