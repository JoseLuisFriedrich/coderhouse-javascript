'use strict'

/////////////////
// Aux methods //
/////////////////

// Selector
const get = selector => document.querySelector(selector)

// Selector Array
const getAll = selector => document.querySelectorAll(selector)

// Guid
const guid = () => 'x' + ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, c => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16))

// String to Element
const element = element => {
  dummy = document.createElement('template')
  dummy.innerHTML = element.trim()
  return dummy.content.childNodes[0]
}

// DOM helper
const dom = (data, parent) => {
  const element = document.createElement(data.tag)

  if (data.id) {
    element.setAttribute('id', data.id)
  }

  if (data.type) {
    element.setAttribute('type', data.type)
  }

  if (data.className) {
    element.className = data.className
  }

  if (data.style) {
    element.style.cssText = data.style
  }

  if (data.attributes) {
    for (const attr in data.attributes) {
      element.setAttribute(attr, data.attributes[attr])
    }
  }

  if (data.text) {
    element.appendChild(document.createTextNode(data.text))
  }

  if (data.html !== undefined) {
    element.innerHTML = data.html
  }

  if (data.childs && data.childs.length) {
    data.childs.forEach(c => dom(c, element))
  }

  (typeof parent === 'string' ? get(parent) : parent).appendChild(element)

  return element
}
