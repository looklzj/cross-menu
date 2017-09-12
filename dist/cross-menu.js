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

module.exports = function crossMenu(options) {
  var menu = options.menu,
      menuItemTag = options.menuItemTag,
      submenu = options.submenu,
      submenuItemTag = options.submenuItemTag,
      _options$delay = options.delay,
      delay = _options$delay === undefined ? 300 : _options$delay,
      _options$activeClassN = options.activeClassName,
      activeClassName = _options$activeClassN === undefined ? 'active' : _options$activeClassN,
      _options$position = options.position,
      position = _options$position === undefined ? { top: 0, left: 0 } : _options$position;
  var activeIndex = options.activeIndex,
      _options$keepSubmenuV = options.keepSubmenuVisible,
      keepSubmenuVisible = _options$keepSubmenuV === undefined ? false : _options$keepSubmenuV;


  var menuItems = [].concat(_toConsumableArray(menu.querySelectorAll(menuItemTag)));
  var submenuItems = [].concat(_toConsumableArray(submenu.querySelectorAll(submenuItemTag)));
  initMenu([menuItems, submenuItems], activeIndex, activeClassName);

  if (activeIndex !== undefined) {
    activeIndex -= 1;
    submenu.classList.add(activeClassName);
  }

  var isMouseInSubmenu = false;

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
    document.removeEventListener('mousemove', handleMousemMoveMenu);

    setTimeout(function () {
      if (!keepSubmenuVisible && !isMouseInSubmenu) {
        removeActiveClass();
        submenu.classList.remove(activeClassName);
      }
    }, 0);
  }, false);

  var timer = 0;

  menu.addEventListener('mouseover', function (event) {
    if (event.target && event.target.nodeName.toLowerCase() === menuItemTag) {
      if (activeIndex === undefined || mouseTrackList.length < 2) return toggleActiveMenu(event);

      if (timer) clearTimeout(timer);

      if (isNeedDelay(submenu, mouseTrackList[1], mouseTrackList[0], position)) {
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
    if (activeIndex !== undefined) removeActiveClass();

    activeIndex = +event.target.dataset.index - 1;

    menuItems[activeIndex].classList.add(activeClassName);
    submenuItems[activeIndex].classList.add(activeClassName);

    submenu.classList.add(activeClassName);
  }

  function removeActiveClass() {
    menuItems[activeIndex].classList.remove(activeClassName);
    submenuItems[activeIndex].classList.remove(activeClassName);
  }
};

function isNeedDelay(_ref, prePos, curPos, _ref2) {
  var offsetTop = _ref.offsetTop,
      offsetLeft = _ref.offsetLeft,
      offsetHeight = _ref.offsetHeight;
  var top = _ref2.top,
      left = _ref2.left;

  var x = offsetLeft + left;
  var y = offsetTop + top;

  var topLeft = { x: x, y: y };
  var bottomLeft = { x: x, y: y + offsetHeight };

  return isMouseInTrangle(curPos, prePos, topLeft, bottomLeft);
}

function isMouseInTrangle(p, a, b, c) {
  var pa = vector(p, a);
  var pb = vector(p, b);
  var pc = vector(p, c);

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

function isSameSign(a, b) {
  return (a ^ b) >= 0;
}

function handleMousemMoveMenu(event) {
  mouseTrackList.unshift({ x: event.pageX, y: event.pageY });
  if (mouseTrackList.length > 2) mouseTrackList.length = 2;
}

function initMenu(menus, activeIndex, activeClassName) {
  menus.forEach(function (menu) {
    menu.forEach(function (item, index) {
      index += 1;
      item.dataset.index = index;
      if (index === activeIndex) {
        item.classList.add(activeClassName);
      }
    });
  });
}

/***/ })
/******/ ]);
});