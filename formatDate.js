/**
 * | key | length | desc
 * ======|========|==================================== define ===
 * | F   | 17     | eq "Y-M-D H:I:S"
 * | f   | 17     | eq "M-D H:I"
 * | N   | 4, 9   | month from January to December
 * | n   | 3, 4   | month from Jan. to Dec.
 * | W   | 6, 9   | day of the week from Monday to Sunday
 * | w   | 3, 4   | day of the week from Mon to Sun
 * | O   | 2      | 12-hour format of an hour with leading zeros
 * | o   | 1, 2   | 12-hour format of an hour without leading zeros
 * | E   | 1      | day of the week by chinese, 一至日
 * | C   | 1, 2   | month by chinese, 一至十二
 * | A   | 2      | 下午 or 上午
 * | a   | 2      | am or pm
 * ======|========|==================================== extend ===
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
 * @include formatDateValue
 * @param {string} key - eg: y: year, Y: fullYear
 * @param {date} [date = new Date]
 * @return {string}
 */
function formatDate(key, date){
	var regx = key.indexOf('%') > -1 ? /%([ymdhiswtfaocnel])/gi : /([ymdhiswtfaocnel])/gi;
	var abbrMark = '';
	var enMonthKeys = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	// var enMonthAbbrs = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
	var enWeekKeys = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	// var enWeekAbbrs = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
	var zhNumKeys = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'];
	var formatKeyAlias = {
		F: 'Y-M-D H:I:S',
		f: 'M-D H:I',
		A: 'h',
		a: 'h',
		O: 'h',
		o: 'h',
		C: 'm',
		c: 'e',
		W: 'e',
		w: 'e',
		E: 'e',
		n: 'm',
		N: 'm',
	};
	
	//* parse date object
	date = date == null ? new Date : Object.prototype.toString.call(date) === '[object Date]' ? date : new Date(date);
	
	//* format
	return key.replace(regx, function(t, key){
		return format(key);
	});
	
	function format(key){
		var k = formatKeyAlias[key] || key;
		if(k.length === 1){
			value = formatDateValue(date, k); 
			switch(key){
				case 'a': case 'A':
					value *= 1;
					value = value >= 12 ? 'pm' : 'am';
					if(key == 'A'){
						value = value === 'am' ? '上午' : '下午';
					}
				break; case 'o': case 'O':
					value *= 1;
					if(value < 1 || (value < 13 && value >= 12)){
						value = 12;
					}else if(value >= 13){
						value -= 12;
					}
					if(key === 'O'){
						value = pad(value);
					}
				break; case 'n': case 'N':
					value = enMonthKeys[value - 1];
					if(key === 'n'){
						if(value.length > 4){
							value = value.slice(0, value.charAt(0) === 'S' ? 4 : 3) + abbrMark;
						}
					}
				break; case 'W': case 'w':
					value = enWeekKeys[value - 1];
					if(key !== 'W'){
						value = value.slice(0, value.charAt(0) === 'T' ? 4 : 3) + abbrMark;
					}
				break; case 'C':
					value = zhNumKeys[value - 1];
				break; case 'E':
					value = value == 7 ? '日' : zhNumKeys[value - 1];
					
			}
		}else{
			value = formatDate(k, date);
		}
		return value;
	}
	
	function pad(num){
		return num > 9 ? num.toString() : '0' + num;
	}
}