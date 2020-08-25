/**
 * rem，px互转
 * @params css 传入的样式(字符串)
 * @params unit 要转的单位(目前只支持 px和rem的互转)
 * @params base  rem与px相互转换的倍数（rem到px为乘，px到rem为除）建议最好为整数，不然js精度问题你懂得hhhh
 */
function exchangeUnit(css, unit, base) {
	var arr = css.split('\n') // 对换行进行拆分
	var neStr = []
	var currentUnit = unit === 'px' ? 'rem' : 'px'
	arr.forEach((item) => {
		var sp = item.split(':') // 拆分css键值对

		var value = sp[1] // css的值
		if (value) {
			var _valueArray = []
			if (value.indexOf(currentUnit) !== -1) {
				value.split(' ').forEach((i) => {
					// 这里考虑到比如 padding:10px 10px 这种情况
					if (i.indexOf(currentUnit) !== -1) {
						// 如果含有px单位
						var _arr = i.split(currentUnit)
						var newi,
							_arr0 = _arr[0],
							_numArr
						// 考虑到有些值为0的时候不加单位
						if (_arr0) {
							// 这里针对calc(100px - 10px)这种情况
							if (!parseInt(_arr0 * 100000000000) > 0) {
								// 先判断是否为纯数字以及小数点
								let _num = _arr0.replace(/[^0-9]/gi, '') * 1
								_numArr = _arr0.split(_num)
								_arr0 = _num * 1
							}
							if (unit === 'px') {
								newi = _arr0 * base
							} else {
								newi = _arr0 / base
							}
							// 去除小数点后无用的 0
							if (newi.toString().indexOf('.') > -1) {
								newi = newi.toString().replace(/0+?$/gi, '') * 1
							}
							if (unit === 'px') {
								newi = newi.toFixed()
							}

							if (_numArr && _numArr.length > 0) {
								newi = _numArr[0] + newi
								if (_numArr[1]) {
									newi += _numArr[1]
								}
							}
							if (!parseInt(_arr0 * 100000000000) >= 0) {
								i = newi + unit + _arr[1]
							} else {
								i = newi + unit
							}

						}
					}
					_valueArray.push(i)
				})
				sp[1] = _valueArray.join(' ')
				// if (sp[1].indexOf(';') === -1 && sp[1].indexOf(':') != -1) {
				// 	// 拼接原本的分号结尾，防止丢失
				//   console.log('sp[1:',sp[1])
				// 	sp[1] += ';'
				// }
			}
		}
		item = sp.join(':') // 还原为键值对
		neStr.push(item)
	})
	neStr = neStr.join('\n')
	console.log(neStr)
}
		// console.log('arr:',arr)
