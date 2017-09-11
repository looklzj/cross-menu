# cross-menu

仿亚马逊智能导航菜单功能，无依赖，支持现代浏览器。

![](https://picabstract-preview-ftn.weiyun.com:8443/ftn_pic_abs_v2/ba0b85410dda986ee2c165c490a0ab13d0f2c16d8dd3ae0a647a51c001506276514d30d6a7015b377166d24315c4c0e5?pictype=scale&from=30013&version=2.0.0.2&uin=287531381&fname=cross-menu.png&size=1024*1024)

## Example

[Demo](https://fe-monine.github.io/cross-menu/example/)

## Usage

`npm install --save cross-menu`

```
// ES6
import crossMenu from 'cross-menu'
crossMenu(options)

// or

<script src="node_modules/cross-menu/dist/cross-menu.js"></script>
<script>
  crossMenu(options)
</script>
```

## options

- **menu**

### v1.0.0

- [x] 支持自定义定位
- [x] 支持初始化显示指定二级菜单
- [x] 支持自定义类名
- [x] 鼠标移出一级菜单并且不在二级菜单内是否隐藏二级菜单
