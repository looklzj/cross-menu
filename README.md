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

- `menu {Object Element} @require`

  一级菜单元素

- `menuItemTag {String} @require`

  一级菜单元素下的菜单项标签

- `submenu {Object Element} @require`

  二级菜单元素

- `submenuItemTag {String} @require`

  二级菜单元素下的菜单项标签

- `delay {Number} @default = 300`

  菜单切换延迟时间

- `position {Object} @default = { x: 0, y: 0 }`

  菜单距离浏览器最上边和最左边的距离

- `activeClassName {String} @default = 'active'`

  当前活动菜单类名

- `activeIndex {Number}`

  当前活动菜单的索引值（初始化默认显示第几个菜单项）

- `keepSubmenuVisible {Boolean} @default = false`

  是否保持二级菜单显示状态（不隐藏二级菜单）

### v1.0.0

- [x] 支持自定义定位
- [x] 支持初始化显示指定二级菜单
- [x] 支持自定义类名
- [x] 鼠标移出一级菜单并且不在二级菜单内是否隐藏二级菜单
