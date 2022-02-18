/**
 * css单位转换
 * @params css 传入的样式(字符串)
 * @params targetUnit 目标单位
 * @params currentUnit 当前css的单位
 * @params base rem与px相互转换的倍数(除则用小数，乘则用整数)
 */
function convertUnit({ css, currentUnit, targetUnit, base }) {
  var arr = css.split('\n'); // 对换行进行拆分
	var neStr = [];

  // var currentUnit = targetUnit === 'px' ? 'px' : 'px';

  arr.forEach((item) => {
		var sp = item.split(':'); // 拆分css键值对
    var value = sp[1]; // css的值
    if (value) {
      var _valueArray = [];
      if (value.indexOf(currentUnit) !== -1) {
        value.split(' ').forEach((i) => {
          // 这里考虑到比如 padding:10px 10px 这种情况
          if (i.indexOf(currentUnit) !== -1) {
            // 如果含有px单位
						var _arr = i.split(currentUnit);
            var newi,
              _arr0 = _arr[0],
							_numArr;
            // 考虑到有些值为0的时候不加单位
            if (_arr0) {
              // 这里针对calc(100px - 10px)这种情况
              if (!parseInt(_arr0) > 0) {
                // 先判断是否为纯数字以及小数点
                let _num = _arr0.replace(/[^0-9]/gi, '') * 1;
                _numArr = _arr0.split(_num);
                _arr0 = _num * 1;
							}
							// 用数学库控制精度，懒得自己写了
              newi = math.format((_arr0 * base), {precision: 14});
              // 去除小数点后无用的 0
              if (newi.toString().indexOf('.') > -1) {
                newi = newi.toString().replace(/0+?$/gi, '') * 1;
              }
              // if (targetUnit === 'px') {
              //   newi = newi.toFixed();
              // }

              if (_numArr && _numArr.length > 0) {
                newi = _numArr[0] + newi;
                if (_numArr[1]) {
                  newi += _numArr[1];
                }
              }
              if (!parseInt(_arr0) >= 0) {
                i = newi + '' + targetUnit + _arr[1];
              } else {
                i = newi + targetUnit;
							}
            }
          }
          _valueArray.push(i);
        });
        sp[1] = _valueArray.join(' ');
        // if (sp[1].indexOf(';') === -1 && sp[1].indexOf(':') != -1) {
        // 	// 拼接原本的分号结尾，防止丢失
        //   console.log('sp[1:',sp[1])
        // 	sp[1] += ';'
        // }
      }
    }
    item = sp.join(':'); // 还原为键值对
    neStr.push(item);
  });
  neStr = neStr.join('\n');
  return neStr;
}
