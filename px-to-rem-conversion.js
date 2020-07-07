/**
   * rem，px互转
   * @params css 传入的样式(字符串)
   * @params unit 要转的单位(目前只支持 px和rem的互转)
   * @params base  rem与px相互转换的倍数（rem到px为乘，px到rem为除）建议最好为整数，不然js精度问题你懂得hhhh
   */
export function exchangeUnit(css, unit, base) {
  var arr = css.split('\n')
  var neStr = []
  var currentUnit = unit === 'px' ? 'rem' : 'px';
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
            var newi;
            if (_arr[0]) {
              // 考虑到有些值为0的时候不加单位
              if (unit === 'px') {
                newi = _arr[0] * base
              } else {
                newi = _arr[0] / base
              }
              newi = Math.floor(newi)
              i = newi + unit
            }
          }
          _valueArray.push(i)
        })
        sp[1] = _valueArray.join(' ')
        if (sp[1].indexOf(';') === -1) {
          // 拼接原本的分号结尾，防止丢失
          sp[1] += ';'
        }
      }
    }
    item = sp.join(':') // 还原为键值对
    neStr.push(item)
  })
  neStr = neStr.join('\n')
}
