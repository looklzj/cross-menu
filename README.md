# cross-menu

[![GitHub stars](https://img.shields.io/github/stars/fe-monine/cross-menu.svg)](https://github.com/fe-monine/cross-menu/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/fe-monine/cross-menu.svg)](https://github.com/fe-monine/cross-menu/network)
[![GitHub issues](https://img.shields.io/github/issues/fe-monine/cross-menu.svg)](https://github.com/fe-monine/cross-menu/issues)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm version](https://badge.fury.io/js/cross-menu.svg)](https://badge.fury.io/js/cross-menu)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/fe-monine/cross-menu/master/LICENSE)

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

## Options

- **`menu`** - *{HTMLElement} @require*

  一级菜单元素

- **`menuItemTag`** - *{String} @require*

  一级菜单元素下的菜单项标签：`[...menu.querySelectorAll(menuItemTag)]`

- **`submenu`** - *{HTMLElement} @require*

  二级菜单元素

- **`submenuItemTag`** - *{String} @require*

  二级菜单元素下的菜单项标签：`[...submenu.querySelectorAll(submenuItemTag)]`

- **`delay`** - *{Number} @default = 300*

  菜单切换延迟时间，即鼠标移动过程中在三角形区域内停顿 `delay` 毫秒表示切换一级菜单。

- **`position`** - *{Object} @value = { top: Number, left: Number }*

  菜单距离浏览器最上边和最左边的距离

  **一般情况下不需要设置此属性，菜单的偏移值会被计算出来。只有当页面加载完成后菜单处于隐藏状态 `display: none` 时你需要使用此属性帮助确定位置，因为[隐藏元素的 `offsetParent` 为 `null`！](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetParent)**

- **`activeClassName`** - *{String} @default = 'active'*

  当前活动菜单类名

- **`activeIndex`** - *{Number}*

  活动菜单的索引值，可用来设置默认活动菜单。

- **`keepSubmenuVisible`** - *{Boolean} @default = false*

  是否保持二级菜单显示状态（不隐藏二级菜单）

### example

```
crossMenu({
  menu: document.querySelector('.menu'),
  menuItemTag: 'li',
  submenu: document.querySelector('.submenu'),
  submenuItemTag: 'li',
  delay: 100,
  activeClassName: 'active-menu',
  activeIndex: 3,
  keepSubmenuVisible: true
})
```

## LICENSE

MIT
