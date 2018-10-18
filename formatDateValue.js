/**
 * | key | length | desc
 * ======|========|===============================================
 * | Y   | 4      | year
 * | y   | 2      | year
 * | M   | 2      | month with leading zeros
 * | m   | 1, 2   | month without leading zeros
 * | D   | 2      | day of the month with leading zeros
 * | d   | 1, 2   | day of the month without leading zeros
 * | H   | 2      | 24-hour format of an hour with leading zeros
 * | h   | 1, 2   | 24-hour format of an hour without leading zeros
 * | I   | 2      | minutes with leading zeros
 * | i   | 1, 2   | minutes without leading zeros
 * | S   | 2      | seconds with leading zeros
 * | s   | 1, 2   | seconds without leading zeros
 * | T   | 13     | timestamp with milliseconds
 * | t   | 10     | timestamp without milliseconds
 * | e   | 1      | day of the week from 1 to 7
 * ================================================================
 * @include padString
 * @param {date} date
 * @param {string} key - format command key in [YyMmDdHhIiSswTt]
 * @return {string}
 */
function formatDateValue(date, key){
	var keyMap = {
		y: 'FullYear',
		m: 'Month',
		d: 'Date',
		h: 'Hours',
		i: 'Minutes',
		s: 'Seconds',
		e: 'Day',
		t: 'Time',
		l: 'Milliseconds',
	};
	
	var k = key.toLowerCase();
	var method = 'get' + keyMap[k];
	if(!date[method]){
		return '';
	}
	var value = date[method]();
	
	//* parse true value
	switch(k){
		case 'm':
			value++;
		break; case 'e':
			value = value === 0 ? 7 : value;
	}
	
	switch(key){
		case 'y':
			value = value.toString().substr(2);
		break; case 't':
			value = Math.floor(value / 1000);
		break; case 'L':
			value = padString(value.toString(), 3, 0, 'l');
		break; case 'T':
		
		break; default:
			if(k !== key){
				value = padString(value.toString(), 2, 0, 'l');
			}else{
				value = value.toString();
			}
			
	}
	
	return value;
}