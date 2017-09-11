(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["crossMenu"] = factory();
	else
		root["crossMenu"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var mouseTrackList = [];
var ACTIVE_CLASSNAME = 'active';

module.exports = function crossMenu(options) {
  var menu = options.menu,
      menuItemTag = options.menuItemTag,
      submenu = options.submenu,
      submenuItemTag = options.submenuItemTag,
      _options$delay = options.delay,
      delay = _options$delay === undefined ? 300 : _options$delay;

  var menuItems = [].concat(_toConsumableArray(menu.querySelectorAll(menuItemTag)));
  var submenuItems = [].concat(_toConsumableArray(submenu.querySelectorAll(submenuItemTag)));

  menuItems.forEach(function (item, index) {
    return item.dataset.index = index + 1;
  });
  submenuItems.forEach(function (item, index) {
    return item.dataset.index = index + 1;
  });

  var isMouseInSubmenu = false;

  // 记录当前鼠标位置是否处在耳机菜单
  submenu.addEventListener('mouseenter', function () {
    return isMouseInSubmenu = true;
  }, false);
  submenu.addEventListener('mouseleave', function () {
    return isMouseInSubmenu = false;
  }, false);

  menu.addEventListener('mouseenter', function () {
    return document.addEventListener('mousemove', handleMousemMoveMenu, false);
  }, false);
  menu.addEventListener('mouseleave', function () {
    return document.removeEventListener('mousemove', handleMousemMoveMenu);
  }, false);

  var activeMenuItem = null;
  var timer = 0;

  menu.addEventListener('mouseover', function (event) {
    if (event.target && event.target.nodeName.toLowerCase() === menuItemTag) {
      if (!activeMenuItem) {
        activeMenuItem = event.target;
        return toggleActiveMenu(event);
      }

      if (timer) clearTimeout(timer);

      if (isNeedDelay(submenu, mouseTrackList[1], mouseTrackList[0])) {
        timer = setTimeout(function () {
          if (!isMouseInSubmenu) {
            toggleActiveMenu(event);
            timer = 0;
          }
        }, delay);
      } else {
        toggleActiveMenu(event);
      }
    }
  }, false);

  var currentIndex = 0;

  function toggleActiveMenu(event) {
    menuItems[currentIndex].classList.remove(ACTIVE_CLASSNAME);
    submenuItems[currentIndex].classList.remove(ACTIVE_CLASSNAME);
    currentIndex = +event.target.dataset.index - 1;
    menuItems[currentIndex].classList.add(ACTIVE_CLASSNAME);
    submenuItems[currentIndex].classList.add(ACTIVE_CLASSNAME);
  }
};

// module.exports = crossMenu

function isNeedDelay(submenu, prePos, curPos) {
  var offsetTop = submenu.offsetTop,
      offsetLeft = submenu.offsetLeft,
      clientHeight = submenu.clientHeight;

  var topLeft = {
    x: offsetLeft,
    y: offsetTop
  };
  var bottomLeft = {
    x: offsetLeft,
    y: offsetTop + clientHeight
  };

  return isMouseInTrangle(curPos, prePos, topLeft, bottomLeft);
}

function isMouseInTrangle(p, a, b, c) {
  var pa = vector(p, a);
  var pb = vector(p, b);
  var pc = vector(p, c);

  // 参数顺序不能变
  var t1 = vectorProduct(pa, pb);
  var t2 = vectorProduct(pb, pc);
  var t3 = vectorProduct(pc, pa);

  return isSameSign(t1, t2) && isSameSign(t2, t3);
}

function vector(a, b) {
  return {
    x: b.x - a.x,
    y: b.y - a.y
  };
}

function vectorProduct(a, b) {
  return a.x * b.y - b.x * a.y;
}

// 参数同为正数或负数
function isSameSign(a, b) {
  return (a ^ b) >= 0;
}

function handleMousemMoveMenu(event) {
  mouseTrackList.unshift({ x: event.pageX, y: event.pageY });
  if (mouseTrackList.length > 2) mouseTrackList.length = 2;
}

/***/ })
/******/ ]);
});
