const mouseTrackList = []

module.exports = function crossMenu (options) {
  const { menu, menuItemTag, submenu, submenuItemTag, delay = 300, activeClassName = 'active', position = { top: 0, left: 0 } } = options
  let { activeIndex, keepSubmenuVisible = false } = options

  const menuItems = [...menu.querySelectorAll(menuItemTag)]
  const submenuItems = [...submenu.querySelectorAll(submenuItemTag)]
  initMenu([menuItems, submenuItems], activeIndex, activeClassName)

  if (activeIndex !== undefined) {
    activeIndex -= 1
    submenu.classList.add(activeClassName)
  }

  let isMouseInSubmenu = false

  submenu.addEventListener('mouseenter', () => (isMouseInSubmenu = true), false)
  submenu.addEventListener('mouseleave', () => (isMouseInSubmenu = false), false)

  menu.addEventListener('mouseenter', () => document.addEventListener('mousemove', handleMousemMoveMenu, false), false)

  menu.addEventListener('mouseleave', () => {
    document.removeEventListener('mousemove', handleMousemMoveMenu)

    setTimeout(() => {
      if (!keepSubmenuVisible && !isMouseInSubmenu) {
        removeActiveClass()
        submenu.classList.remove(activeClassName)
      }
    }, 0)
  }, false)

  let timer = 0

  menu.addEventListener('mouseover', (event) => {
    if (event.target && event.target.nodeName.toLowerCase() === menuItemTag) {
      if (activeIndex === undefined || mouseTrackList.length < 2) return toggleActiveMenu(event)

      if (timer) clearTimeout(timer)

      if (isNeedDelay(submenu, mouseTrackList[1], mouseTrackList[0], position)) {
        timer = setTimeout(() => {
          if (!isMouseInSubmenu) {
            toggleActiveMenu(event)
            timer = 0
          }
        }, delay)
      } else {
        toggleActiveMenu(event)
      }
    }
  }, false)

  let currentIndex = 0

  function toggleActiveMenu (event) {
    if (activeIndex !== undefined) removeActiveClass()

    activeIndex = +event.target.dataset.index - 1

    menuItems[activeIndex].classList.add(activeClassName)
    submenuItems[activeIndex].classList.add(activeClassName)

    submenu.classList.add(activeClassName)
  }

  function removeActiveClass () {
    menuItems[activeIndex].classList.remove(activeClassName)
    submenuItems[activeIndex].classList.remove(activeClassName)
  }
}

function isNeedDelay ({ offsetTop, offsetLeft, offsetHeight }, prePos, curPos, { top, left }) {
  const x = offsetLeft + left
  const y = offsetTop + top

  const topLeft = { x, y }
  const bottomLeft = { x, y: y + offsetHeight }

  return isMouseInTrangle(curPos, prePos, topLeft, bottomLeft)
}

function isMouseInTrangle (p, a, b, c) {
  const pa = vector(p, a)
  const pb = vector(p, b)
  const pc = vector(p, c)

  const t1 = vectorProduct(pa, pb)
  const t2 = vectorProduct(pb, pc)
  const t3 = vectorProduct(pc, pa)

  return isSameSign(t1, t2) && isSameSign(t2, t3)
}

function vector (a, b) {
  return {
    x: b.x - a.x,
    y: b.y - a.y
  }
}

function vectorProduct (a, b) {
  return a.x * b.y - b.x * a.y
}

function isSameSign (a, b) {
  return (a ^ b) >= 0
}

function handleMousemMoveMenu (event) {
  mouseTrackList.unshift({ x: event.pageX, y: event.pageY })
  if (mouseTrackList.length > 2) mouseTrackList.length = 2
}

function initMenu (menus, activeIndex, activeClassName) {
  menus.forEach(menu => {
    menu.forEach((item, index) => {
      index += 1
      item.dataset.index = index
      if (index === activeIndex) {
        item.classList.add(activeClassName)
      }
    })
  })
}
