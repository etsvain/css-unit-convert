# px-calculate

# css 样式单位互转

通过该工具可以实现 px，rem，em，vw，vh 目前所有单位的互相转换以及比例调整；

## 用法

clone;
import;

```
  var scss = `
  .icon-box {
      height: 46px;
      margin-left: 49px;
      display: flex;
      flex-flow: wrap row;
      align-items: center;
      overflow: hidden;
      .icon-item {
        width: 106px;
        padding: 1px 0;
        margin-right: 10px;
      }
  }
  `
  exchangeUnit({
      css: scss, // css字符串
      currentUnit: 'px', // 当前单位
      targetUnit: 'rem', // 目标单位
      base: 0.1, // 转换倍数
  });
```
